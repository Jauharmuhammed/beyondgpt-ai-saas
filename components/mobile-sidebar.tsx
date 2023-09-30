"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./sidbar";
import { Chat } from "@prisma/client";
import { usePathname } from "next/navigation";

interface mobileSidebarProps {
    apiLimitCount: number;
    chats: Chat[];
    isPro: boolean;
}

const MobileSidebar = ({ apiLimitCount, chats, isPro = false }: mobileSidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    if (!isMounted) {
        return null;
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <Button asChild variant="ghost" size="icon" className="md:hidden p-2">
                    <Menu width={30} height={30} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} chats={chats} />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
