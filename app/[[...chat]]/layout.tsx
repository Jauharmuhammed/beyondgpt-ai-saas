import Navbar from "@/components/navbar";
import ScrollDownButton from "@/components/scroll-down-button";
import Sidebar from "@/components/sidbar";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/contexts/providers";
import { getChats } from "@/lib/api-chat";
import { getApiLimitCount } from "@/lib/api-limit";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const apiLimitCount = await getApiLimitCount();
    const chats = await getChats();

    return (
        <div className="h-full relative">
            <section className="hidden h-full md:flex md:fixed w-72">
                <Sidebar apiLimitCount={apiLimitCount} chats={chats} />
            </section>
            <section className="md:ms-72 bg-slate-900 h-full flex flex-col">
                <Navbar apiLimitCount={apiLimitCount} chats={chats}/>
                <ScrollDownButton />
                <Providers>{children}</Providers>
            </section>
            <Toaster />
        </div>
    );
};

export default DashboardLayout;
