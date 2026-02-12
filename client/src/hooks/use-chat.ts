import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api as apiRoutes, buildUrl } from "@shared/routes";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

// Type definitions based on schema
interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

interface Conversation {
  id: number;
  title: string;
  createdAt: string;
  messages?: Message[];
}

export function useConversations() {
  return useQuery({
    queryKey: [apiRoutes.conversations.list.path],
    queryFn: async () => {
      const res = await fetch(apiRoutes.conversations.list.path);
      if (!res.ok) throw new Error("Failed to fetch conversations");
      return await res.json() as Conversation[];
    },
  });
}

export function useConversation(id: number | null) {
  return useQuery({
    queryKey: [apiRoutes.conversations.get.path, id],
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error("No ID");
      const url = buildUrl(apiRoutes.conversations.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch conversation");
      return await res.json() as Conversation;
    },
  });
}

export function useCreateConversation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (title: string = "New Demo Chat") => {
      const res = await fetch(apiRoutes.conversations.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error("Failed to create conversation");
      return await res.json() as Conversation;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiRoutes.conversations.list.path] });
    },
  });
}

// Custom hook for streaming messages
export function useChatStream(conversationId: number | null) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamContent, setStreamContent] = useState(""); // Current chunked content being received

  // We need to optimistically update the UI, so we expose a manual state
  // that combines DB messages with the current streaming message
  
  const sendMessage = async (content: string) => {
    if (!conversationId) return;

    setIsStreaming(true);
    setStreamContent("");

    try {
      const url = buildUrl(apiRoutes.messages.create.path, { id: conversationId });
      
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error("Failed to send message");
      if (!response.body) throw new Error("No response body");

      // Handle SSE stream from a POST request manually
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        // Process complete lines
        const lines = buffer.split("\n\n");
        buffer = lines.pop() || ""; // Keep the incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const jsonStr = line.replace("data: ", "");
              const data = JSON.parse(jsonStr);

              if (data.content) {
                setStreamContent((prev) => prev + data.content);
              }
              if (data.done) {
                // Stream finished
                setIsStreaming(false);
                setStreamContent("");
                // Refresh full conversation history to get the persisted message
                queryClient.invalidateQueries({ queryKey: [apiRoutes.conversations.get.path, conversationId] });
              }
              if (data.error) {
                throw new Error(data.error);
              }
            } catch (e) {
              console.error("Error parsing SSE data", e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Stream error:", error);
      setIsStreaming(false);
      toast({
        title: "Error",
        description: "Failed to receive AI response",
        variant: "destructive",
      });
    }
  };

  return {
    sendMessage,
    isStreaming,
    streamContent,
  };
}
