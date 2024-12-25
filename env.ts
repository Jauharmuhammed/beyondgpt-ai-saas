export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
} as const;
