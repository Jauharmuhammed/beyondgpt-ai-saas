import React from "react";
import SidebarHeader from "./sidebar-header";
import { MessageSquare } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type chatsType = {
    id: string;
    userId: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
}[];

const RecentConversations = ({ chats }: { chats: chatsType }) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className="h-full flex flex-col mb-2">
            <SidebarHeader title="Recent Conversations" />
            <div className="space-y-2 mt-2 h-full overflow-auto pr-3">
                {chats.map((chat) => (
                    <div
                        onClick={() => router.push(`/chat/${chat.id}`)}
                        key={chat.id}
                        className={cn(
                            "p-2.5 flex space-x-2 items-center rounded-sm hover:bg-slate-900 cursor-pointer",
                            {
                                "bg-slate-900": pathname.includes(chat.id),
                            }
                        )}>
                        <MessageSquare className="text-indigo-300/80" size={16} />
                        <span className="text-sm text-slate-300">{chat.title}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentConversations;
