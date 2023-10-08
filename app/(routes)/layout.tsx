import Navbar from "@/components/navbar";
import ScrollDownButton from "@/components/scroll-down-button";
import Sidebar from "@/components/sidbar";
import { Toaster } from "@/components/ui/toaster";
import { getChats } from "@/lib/api-chat";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const apiLimitCount = await getApiLimitCount();
    const chats = await getChats();
    const isPro = await checkSubscription();

    return (
        <div className="h-full relative">
            <section className="hidden h-full md:flex md:fixed w-80">
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} chats={chats} />
            </section>
            <section className="md:ms-80 bg-slate-900 h-full flex flex-col">
                <Navbar isPro={isPro} apiLimitCount={apiLimitCount} chats={chats} />
                <ScrollDownButton />{children}
            </section>
            <Toaster />
        </div>
    );
};

export default DashboardLayout;
