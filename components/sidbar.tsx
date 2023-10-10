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
import moment from "moment";
import { Chat as ChatType } from "@prisma/client";

interface SidebarProps {
    apiLimitCount: number;
    chats: Chat[];
    isPro: boolean;
}

const Sidebar = ({ apiLimitCount = 0, chats, isPro = false }: SidebarProps) => {
    const [active, setActive] = useState<string>("chat");
    const router = useRouter();

    const groupedChats: { [key: string]: ChatType[] } = {};

    function setGroup(key: string, chat: ChatType) {
        if (!groupedChats[key]) {
            groupedChats[key] = [];
        }

        groupedChats[key].push(chat);
    }

    const today = moment().format("YYYY-MM-DD");
    const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");
    const seventhday = moment().subtract(7, "days").format("YYYY-MM-DD");
    const thirteethday = moment().subtract(30, "days").format("YYYY-MM-DD");

    chats.forEach((chat) => {
        const date = moment(chat.messageUpdatedAt).format("YYYY-MM-DD");

        if (date === today) {
            setGroup("Today", chat);
        } else if (date === yesterday) {
            setGroup("Yesterday", chat);
        } else if (moment(date).isAfter(seventhday)) {
            setGroup("Previous 7 days", chat);
        } else if (moment(date).isAfter(thirteethday)) {
            setGroup("Previous 30 days", chat);
        } else {
            const date = moment(chat.messageUpdatedAt);
            const monthYear = date.format("MMMM YYYY");

            setGroup(monthYear, chat);
        }
    });

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
                    {active === "chat" && <RecentConversations groupedChats={groupedChats} />}
                    {active === "favourite" && <FavouriteConversations />}
                    {active === "plugins" && <Plugins />}
                </div>
            </div>
            <Card className="flex flex-col m-3 justify-end border-0">
                <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
                <div className="flex justify-between items-center">
                    <div className={cn("cursor-pointer w-full")}>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonPopoverActionButton: {
                                        zIndex: 99999,
                                    },
                                },
                            }}
                            showName
                            afterSignOutUrl="/"
                        />
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
