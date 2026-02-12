import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, MessageSquarePlus, RefreshCw } from "lucide-react";
import { useChatStream, useConversations, useCreateConversation, useConversation } from "@/hooks/use-chat";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export function ChatInterface() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  
  const { data: conversations, refetch: refetchConvos } = useConversations();
  const { mutate: createConversation, isPending: isCreating } = useCreateConversation();
  const { data: activeConversation } = useConversation(activeId);
  
  const { sendMessage, isStreaming, streamContent } = useChatStream(activeId);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeConversation, streamContent]);

  // Create initial conversation if none exist
  useEffect(() => {
    if (conversations && conversations.length === 0 && !isCreating && !activeId) {
      handleNewChat();
    } else if (conversations && conversations.length > 0 && !activeId) {
      setActiveId(conversations[0].id);
    }
  }, [conversations]);

  const handleNewChat = () => {
    createConversation("New Demo Chat", {
      onSuccess: (data) => setActiveId(data.id),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeId) return;

    const content = inputValue;
    setInputValue("");
    await sendMessage(content);
  };

  return (
    <div className="flex h-[600px] w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex-col md:flex-row">
      {/* Sidebar - History */}
      <div className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-4 flex flex-col">
        <Button 
          onClick={handleNewChat} 
          className="w-full justify-start gap-2 mb-4 bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 shadow-sm"
          variant="outline"
        >
          <MessageSquarePlus className="w-4 h-4" />
          New Chat
        </Button>

        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Recent Chats</div>
        
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 pr-3">
            {conversations?.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={cn(
                  "text-left px-3 py-2 rounded-lg text-sm truncate transition-colors",
                  activeId === conv.id 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {conv.title}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white relative">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h3 className="font-semibold text-slate-800">AI Support Agent (Live Demo)</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => refetchConvos()} title="Refresh">
            <RefreshCw className="w-4 h-4 text-slate-400" />
          </Button>
        </div>

        {/* Messages */}
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin" 
          ref={scrollRef}
        >
          {activeConversation?.messages?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60">
              <Bot className="w-16 h-16 mb-4" />
              <p>Type a message to start the demo...</p>
            </div>
          )}

          {activeConversation?.messages?.map((msg) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id}
              className={cn(
                "flex gap-3 max-w-[85%]",
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.role === "user" ? "bg-slate-200 text-slate-600" : "bg-primary text-white"
              )}>
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              
              <div className={cn(
                "p-3 rounded-2xl shadow-sm text-sm leading-relaxed",
                msg.role === "user" 
                  ? "bg-slate-100 text-slate-800 rounded-tr-none" 
                  : "bg-white border border-slate-100 text-slate-800 rounded-tl-none"
              )}>
                {msg.content}
                <div className="text-[10px] text-slate-400 mt-1 text-right">
                  {format(new Date(msg.createdAt), "h:mm a")}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Streaming Message Optimistic Update */}
          <AnimatePresence>
            {isStreaming && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 max-w-[85%] mr-auto"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="bg-white border border-slate-100 text-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
                  {streamContent || <span className="animate-pulse">Thinking...</span>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <form onSubmit={handleSubmit} className="flex gap-2 relative">
            <Input 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about your order status, refund policy, etc..."
              className="pr-12 py-6 rounded-xl border-slate-200 focus-visible:ring-primary shadow-sm"
              disabled={isStreaming || !activeId}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg"
              disabled={isStreaming || !activeId || !inputValue.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
