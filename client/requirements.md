## Packages
framer-motion | Complex scroll animations and page transitions
recharts | Financial and market data visualization charts
clsx | Class name utility for conditional styling
tailwind-merge | Utility to merge tailwind classes properly
date-fns | Date formatting for chat messages

## Notes
The chat demo requires handling a POST request that returns a text/event-stream response.
We will implement a custom stream reader in the use-chat hook to handle this pattern (fetch + ReadableStream), as standard EventSource only supports GET.
Images will be sourced from Unsplash.
