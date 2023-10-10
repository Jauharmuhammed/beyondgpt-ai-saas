import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { getLastChat } from "@/lib/api-chat";

const Navbar = async () => {
    const { userId } = auth();
    
    let lastChat
    if (userId) {
        lastChat = await getLastChat()
    }
    return (
        <nav className="flex fixed z-50 top-0 left-0 right-0 justify-between p-4 md:p-6 backdrop-blur-md">
            <div>
                <div className="">
                    <Link className="flex space-x-3 items-center" href={"/"}>
                        <Image
                            className="w-auto"
                            width={30}
                            height={30}
                            alt="Logo"
                            src={"/logo.png"}
                            priority></Image>
                        <h1 className={cn("md:text-lg font-semibold text-slate-300")}>BeyondGPT</h1>
                    </Link>
                </div>
            </div>
            {userId ? (
                <div className="flex gap-4 items-center">
                    <Link href={`/chat/${lastChat?.id}`}>
                        <Button variant="primary" size="sm">
                            Go to Chats
                        </Button>
                    </Link>
                    <UserButton
                        appearance={{
                            elements: {
                                avatarBox: {
                                    height: "36px",
                                    width: "36px",
                                },
                            },
                        }}
                        afterSignOutUrl="/"
                    />
                </div>
            ) : (
                <div className="flex gap-3">
                    <Link href="/sign-in">
                        <Button variant="outline" size="sm">
                            Login
                        </Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button variant="primary" size="sm">
                            Start free trial
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
