import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ginie AI",
    description: "AI Platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <html lang="en">
                <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    );
}
