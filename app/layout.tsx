import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ChatProvider } from "@/contexts/chat-context";
import ModalProvider from "@/components/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BeyondGPT",
    description: "AI Chatbot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <ChatProvider>
                <html lang="en">
                    <body className={inter.className}>
                        <ModalProvider />
                        {children}
                    </body>
                </html>
            </ChatProvider>
        </ClerkProvider>
    );
}
