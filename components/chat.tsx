"use client";

import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { MessageSquare, MoreHorizontal, Star, Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

const Chat = ({ chat }: { chat: Chat }) => {
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const handleMenu = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();

        setIsOpen((current) => !current);
    };

    const handleStar = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();

        console.log("ADDED TO FAVOURITES");
    };

    const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();

        console.log("DELETED");
    };

    return (
        <div
            onClick={() => router.push(`/chat/${chat.id}`)}
            className={cn(
                " flex p-2.5 space-x-2 items-center rounded-sm hover:bg-slate-900 cursor-pointer",
                {
                    "bg-slate-900": pathname.includes(chat.id),
                }
            )}>
            <MessageSquare className="text-indigo-300/80" size={16} />
            <p className="text-sm text-slate-300 truncate w-1 flex-grow">{chat.title}</p>
            <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="flex space-x-2 items-center">
                {isOpen && (
                    <>
                        <Trash
                            onClick={(e) => handleDelete(e)}
                            className="text-indigo-300/70 hover:text-indigo-300/90"
                            size={15}
                        />
                        <Star
                            onClick={(e) => handleStar(e)}
                            className="text-indigo-300/70 hover:text-indigo-300/90"
                            size={16}
                        />
                    </>
                )}
                <MoreHorizontal className="text-indigo-300/70 hover:text-indigo-300/90" size={16} />
            </div>
        </div>
    );
};

export default Chat;
