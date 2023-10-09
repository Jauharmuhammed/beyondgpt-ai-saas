"use client";

import React, { useState } from "react";
import { sidebarElements } from "@/data/sidebar";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import RecentConversations from "./recent-conversations";
import FavouriteConversations from "./favourite-conversations";
import Plugins from "./plugins";
import FreeCounter from "./free-counter";
import { Card } from "./ui/card";
import { Chat } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
    apiLimitCount: number;
    chats: Chat[];
    isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, chats, isPro = false }: SidebarProps) => {
    const [active, setActive] = useState<string>("chat");
    const router = useRouter();

    return (
        <div className="flex w-full h-full flex-col">
            <div className="flex w-full flex-grow h-1">
                <div className="flex flex-col w-12 mt-8">
                    {sidebarElements.map((obj) => (
                        <div
                            onClick={() => setActive(obj.id)}
                            key={obj.id}
                            className={cn(
                                "p-3 cursor-pointer text-indigo-300 hover:bg-slate-900 transtion duration-200",
                                {
                                    "bg-slate-900 border-l-2 border-l-slate-400": active === obj.id,
                                }
                            )}>
                            <obj.icon strokeWidth={1} className="h-[1.4rem] w-[1.4rem]" />
                        </div>
                    ))}
                </div>
                <div className="flex w-full flex-col p-4 pt-11 pr-0">
                    {active === "chat" && <RecentConversations chats={chats} />}
                    {active === "favourite" && <FavouriteConversations />}
                    {active === "plugins" && <Plugins />}
                </div>
            </div>
            <Card className="flex flex-col m-3 justify-end border-0">
                <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
                <div className="flex justify-between items-center">
                    <div className={cn("cursor-pointer w-full")}>
                        <UserButton appearance={{}} showName afterSignOutUrl="/" />
                    </div>
                    <div className="flex items-center">
                        <Link href={"/settings"} className={cn("cursor-pointer text-indigo-300")}>
                            <Settings strokeWidth={1} className="h-[1.4rem] w-[1.4rem]" />
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Sidebar;
