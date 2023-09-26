"use client";

import { ChatProvider } from "./chat-context";

export function Providers({ children }: { children: React.ReactNode }) {
    return <ChatProvider>{children}</ChatProvider>;
}
