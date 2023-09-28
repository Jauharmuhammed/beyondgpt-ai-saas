"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./sidbar";
import { Chat } from "@prisma/client";

interface mobileSidebarProps {
    apiLimitCount: number;
    chats: Chat[];
}

const MobileSidebar = ({ apiLimitCount, chats }: mobileSidebarProps) => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger>
                <Button asChild variant="ghost" size="icon" className="md:hidden p-2">
                    <Menu width={30} height={30} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar apiLimitCount={apiLimitCount} chats={chats} />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
