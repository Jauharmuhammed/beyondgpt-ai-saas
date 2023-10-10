import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import ModalProvider from "@/components/modal-provider";
import { ToasterProvider } from "@/components/toaser-provider";
import TopLoadingBar from "@/components/loading-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "BeyondGPT",
    description: "AI Chatbot",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
                <html lang="en">
                    <body className={inter.className}>
                        <TopLoadingBar />
                        <ModalProvider />
                        <ToasterProvider />
                        {children}
                    </body>
                </html>
        </ClerkProvider>
    );
}
