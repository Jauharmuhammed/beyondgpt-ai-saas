"use client";

import React, { useEffect, useState } from "react";
import { sidebarElements } from "@/data/sidebar";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import { UserButton, useAuth } from "@clerk/nextjs";
import RecentConversations from "./recent-conversations";
import FavouriteConversations from "./favourite-conversations";
import Plugins from "./plugins";
import axios from "axios";

const Sidebar = () => {
    const { userId } = useAuth();
    const [active, setActive] = useState<string>("chat");

    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        try {
            if (userId) {
                const response = await axios.get(`../api/chat/user/${userId}`);
                console.log(response.data);
                setChats(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchChats();
    }, []);

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
            <div className="flex p-4 justify-between items-center">
                <div className={cn("cursor-pointer w-full")}>
                    <UserButton showName afterSignOutUrl="/landing" />
                </div>
                <div className="flex items-center">
                    <div className={cn("cursor-pointer text-indigo-300")}>
                        <Settings strokeWidth={1} className="h-[1.4rem] w-[1.4rem]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
