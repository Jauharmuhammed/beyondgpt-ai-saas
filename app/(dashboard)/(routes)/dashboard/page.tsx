"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Image, MessageSquare, Music, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const tools = [
    {
        title: "Conversation",
        href: "/chat",
        icon: MessageSquare,
        bgColor: "bg-pink-600/5",
        color: "text-pink-600",
    },
    {
        title: "Image Generation",
        href: "/image",
        icon: Image,
        bgColor: "bg-emerald-400/5",
        color: "text-emerald-400",
    },
    {
        title: "Video Generation",
        href: "/video",
        icon: VideoIcon,
        bgColor: "bg-sky-400/5",
        color: "text-sky-400",
    },
    {
        title: "Music Generation",
        href: "/music",
        icon: Music,
        bgColor: "bg-lime-400/5",
        color: "text-lime-400",
    },
    {
        title: "Code Generation",
        href: "/code",
        icon: MessageSquare,
        bgColor: "bg-orange-400/5",
        color: "text-orange-400",
    },
];

const DashboardPage = () => {
    const router = useRouter();
    return (
        <section className="flex flex-col justify-between p-4">
            <div className="mb-16 space-y-4 w-full">
                <h1 className="text-2xl md:text-4xl font-bold text-center">
                    Explore the Power of AI
                </h1>
                <p className="text-center text-muted-foreground text-sm md:text-lg font-light">
                    Chat with the smartest AI - Experience the power of AI
                </p>
            </div>
            <div className="px-8 md:px-20 lg:px-36 xl:px-48 space-y-4">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        className={cn(
                            "group/tool hover:shadow-sm p-5 border-black/10 flex items-center justify-between transition cursor-pointer",
                            tool.bgColor
                        )}>
                        <div className=" peer flex items-center gap-x-4">
                            <tool.icon className={tool.color} />
                            <div className="font-semibold">{tool.title}</div>
                        </div>
                        <ArrowRight className="text-zinc-800 justify-end w-5 h-5 mr-2 group-hover/tool:mr-0 transition-all duration-150" />
                    </Card>
                ))}
            </div>
        </section>
    );
};

export default DashboardPage;
