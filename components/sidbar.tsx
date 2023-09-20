"use client";

import React, { useEffect, useState } from "react";
import { ModeToggle } from "./theme-toggle";
import { sidebarElements } from "@/data/sidebar";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import RecentConversations from "./recent-conversations";
import FavouriteConversations from "./favourite-conversations";
import Plugins from "./plugins";

const Sidebar = () => {
    const [active, setActive] = useState<string>("chat");
    const sidebarOptions: Record<string, any> = {
        chat: RecentConversations,
        favourite: FavouriteConversations,
        plugin: Plugins,
    };

    const [content, setContent] = useState<any>(sidebarOptions["chat"]);

    useEffect(() => {
        setContent(sidebarOptions[active]);
    }, [active]);

    return (
        <div className="flex w-full h-full flex-col justify-between">
            <div className="flex w-full h-full">
                <div className="flex flex-col w-12 mt-8">
                    {sidebarElements.map((obj) => (
                        <div
                            onClick={() => setActive(obj.id)}
                            key={obj.id}
                            className={cn(
                                "p-3 cursor-pointer hover:bg-slate-900 transtion duration-200",
                                {
                                    "bg-slate-900 border-l-2 border-l-slate-400": active === obj.id,
                                }
                            )}>
                            <obj.icon strokeWidth={1} className="h-[1.4rem] w-[1.4rem]" />
                        </div>
                    ))}
                </div>
                <div className="flex w-full flex-col p-4">{content}</div>
            </div>
            <div className="flex px-4 py-2 justify-between items-center">
                <div className={cn("cursor-pointer w-full")}>
                    <UserButton showName afterSignOutUrl="/landing" />
                </div>
                <div className="flex items-center">
                    <div className={cn("p-3 cursor-pointer")}>
                        <Settings strokeWidth={1} className="h-[1.4rem] w-[1.4rem]" />
                    </div>
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
