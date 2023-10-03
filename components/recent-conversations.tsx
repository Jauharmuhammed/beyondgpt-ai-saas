import React from "react";
import SidebarHeader from "./sidebar-header";
import { MessageSquare } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

const RecentConversations = ({ chats }: { chats: Chat[] }) => {
    const router = useRouter();
    const pathname = usePathname();

    const groupedChats: { [key: string]: Chat[] } = {};

    function getDate(dayAgo: number) {
        const date = new Date();
        date.setDate(date.getDate() - dayAgo);

        return date.toLocaleDateString();
    }

    function setGroup(key: string, chat: Chat) {
        if (!groupedChats[key]) {
            groupedChats[key] = [];
        }

        groupedChats[key].push(chat);
    }

    const today = getDate(0);
    const yesterday = getDate(1);
    const seventhday = getDate(7);
    const thirteethday = getDate(30);

    chats.forEach((chat) => {
        const date = new Date(chat.updatedAt).toLocaleDateString();

        if (date === today) {
            setGroup("Today", chat);
        } else if (date === yesterday) {
            setGroup("Yesterday", chat);
        } else if (date > seventhday) {
            setGroup("Previous 7 days", chat);
        } else if (date > thirteethday) {
            setGroup("Previous 30 days", chat);
        } else {
            const date = new Date(chat.updatedAt);
            const monthYear = `${date.toLocaleString("en-us", {
                month: "long",
            })} ${date.getFullYear()}`;

            setGroup(monthYear, chat);
        }
    });

    console.log(groupedChats);

    function renderFilteredChats(chats: Chat[], title: string) {
        return (
            <div className="flex flex-col mb-2">
                <AccordionTrigger className="text-xs text-indigo-300/80">{title}</AccordionTrigger>
                <AccordionContent className="space-y-2 mt-2 h-full overflow-auto pr-3">
                    {chats.map((chat) => (
                        <div
                            onClick={() => router.push(`/chat/${chat.id}`)}
                            key={chat.id}
                            className={cn(
                                " flex p-2.5 space-x-2 items-center rounded-sm hover:bg-slate-900 cursor-pointer",
                                {
                                    "bg-slate-900": pathname.includes(chat.id),
                                }
                            )}>
                            <MessageSquare className="text-indigo-300/80" size={16} />
                            <p className="text-sm text-slate-300 truncate w-1 flex-grow">
                                {chat.title}
                            </p>
                        </div>
                    ))}
                </AccordionContent>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col mb-2">
            <SidebarHeader title="Recent Conversations" />

            <Accordion type="multiple" defaultValue={[...Object.keys(groupedChats)]} className="h-full">
                {Object.keys(groupedChats).map((month) => (
                    <AccordionItem value={month} key={month}>
                        {renderFilteredChats(groupedChats[month], month)}
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};

export default RecentConversations;
