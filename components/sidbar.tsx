"use client";

import { cn } from "@/lib/utils";
import {
    Code,
    ImageIcon,
    LayoutDashboard,
    MessageSquare,
    Music,
    Settings,
    VideoIcon,
} from "lucide-react";
import { Comfortaa } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const comfortaa = Comfortaa({ weight: ["700"], subsets: ["greek"] });

const routes = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-violet-400"
    },
    {
        title: "Conversation",
        icon: MessageSquare,
        href: "/chat",
        color: "text-pink-700"
    },
    {
        title: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-sky-400"
    },
    {
        title: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-teal-400"
    },
    {
        title: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-lime-400"
    },
    {
        title: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-orange-400"
    },
    {
        title: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

const Sidebar = () => {
    const pathname = usePathname();
    return (
        <div className="p-4 flex flex-col h-full w-full bg-slate-900">
            <div className="mb-20">
                <Link className="flex space-x-3 items-center" href={"/dashboard"}>
                    <Image
                        className="ms-2 w-auto"
                        width={30}
                        height={30}
                        alt="Logo"
                        src={"/logo.png"}
                        priority></Image>
                    <h1 className={cn(" text-white text-4xl mt-2", comfortaa.className)}>Ginie</h1>
                </Link>
            </div>
            <div className="space-y-1 text-sm text-slate-200 w-full">
                {routes.map((route) => (
                    <Link
                        href={route.href}
                        className={cn(
                            "flex items-center cursor-pointer w-full p-3 rounded hover:bg-white/10",
                            pathname === route.href ? "bg-white/10 text-white" : "text-zinc-300"
                        )}
                        key={route.href}>
                        <span className="w-5 h-5 mr-3">
                            <route.icon size={"icon"} className={cn(route.color)} />
                        </span>
                        <h3>{route.title}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
