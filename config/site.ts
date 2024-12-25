import { env } from "../env";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  title: "BeyondGPT",
  description: "AI Chatbot",
  url:
    env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_URL,
  keywords: [
    "AI",
    "Chatbot",
    "BeyondGPT",
    "AI Chatbot",
    "OpenAI",
    "GPT",
    "ai",
    "ai sdk",
    "ai chat",
  ],
} as const;
