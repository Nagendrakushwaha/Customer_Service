import { z } from 'zod';
import { insertLeadSchema, leads, insertConversationSchema, insertMessageSchema, conversations, messages } from './schema';

// Shared error schemas
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  leads: {
    create: {
      method: 'POST' as const,
      path: '/api/leads' as const,
      input: insertLeadSchema,
      responses: {
        201: z.custom<typeof leads.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  // Mapping the integration routes here for type safety and frontend awareness
  conversations: {
    list: {
      method: 'GET' as const,
      path: '/api/conversations' as const,
      responses: {
        200: z.array(z.custom<typeof conversations.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/conversations' as const,
      input: z.object({ title: z.string().optional() }),
      responses: {
        201: z.custom<typeof conversations.$inferSelect>(),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/conversations/:id' as const,
      responses: {
        200: z.custom<typeof conversations.$inferSelect & { messages: typeof messages.$inferSelect[] }>(),
        404: errorSchemas.notFound,
      },
    },
  },
  messages: {
    create: {
      method: 'POST' as const,
      path: '/api/conversations/:id/messages' as const,
      input: z.object({ content: z.string() }),
      responses: {
        // The endpoint returns a stream, but for typing purposes we can just say void or success
        200: z.void(), 
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
