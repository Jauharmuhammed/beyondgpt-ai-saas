"use client";

import { cn } from "@/lib/utils";
import { Chat } from "@prisma/client";
import { MessageSquare, MoreHorizontal, Star, Trash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Chat = ({ chat }: { chat: Chat }) => {
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);

    const handleMenu = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();

        setIsOpen((current) => !current);
    };

    const handleStar = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();
        e.preventDefault();

        console.log("ADDED TO FAVOURITES");
    };

    const handleDelete = (e: React.MouseEvent<SVGSVGElement>) => {
        e.stopPropagation();

        console.log("DELETED");
    };

    return (
        <div
            className={cn(
                " flex space-x-2 items-center rounded-sm hover:bg-slate-925",
                {
                    "bg-slate-900 hover:bg-slate-900": pathname.includes(chat.id),
                }
            )}>
            <Link href={`/chat/${chat.id}`} className="flex p-2.5 w-full space-x-2 items-center  cursor-pointer">
                <MessageSquare className="text-indigo-300/80" size={16} />
                <p className="text-sm text-slate-300 truncate w-1 flex-grow">{chat.title}</p>
            </Link>
            <div
                onClick={(e) => e.preventDefault()}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className="flex pe-2.5 space-x-2 items-center  cursor-pointer">
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
