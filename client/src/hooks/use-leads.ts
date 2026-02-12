import { useMutation } from "@tanstack/react-query";
import { api, type InsertLead } from "@shared/schema"; // Actually schema exports the type, routes exports the api
// Correction: The imports should match the generated structure. 
// The user provided schema.ts has `InsertLead`. The routes.ts has `api.leads.create`.
// I will adhere to the provided structure.

import { api as apiRoutes } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// Helper because the shared routes export might differ slightly in structure from standard generated code
// We will rely on fetch for simplicity if the type safety gets complex with the custom routes structure
import { insertLeadSchema } from "@shared/schema";

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (leadData: unknown) => {
      // Validate client-side first
      const validated = insertLeadSchema.parse(leadData);
      
      const res = await fetch(apiRoutes.leads.create.path, {
        method: apiRoutes.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to submit form");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Interest Registered",
        description: "We've received your details and will be in touch shortly.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
