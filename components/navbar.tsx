"use client";

import React from "react";
import MobileSidebar from "./mobile-sidebar";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    return (
        <div className="fixed top-0 md:static md:min-h-[4rem] w-full flex justify-between items-center px-2.5 py-1 bg-slate-900 z-10">
            <MobileSidebar />

            {pathname !== "/" && (
                <>
                    <Link href={"/"} className="md:hidden">
                        <Button variant="ghost" className="p-2">
                            <PlusIcon />
                        </Button>
                    </Link>
                    <Link href={"/"} className="hidden md:block fixed right-3 top-3">
                        <Button variant="outline" className="opacity-90">
                            <PlusIcon className="text-violet" size={16} /> &nbsp; New Chat
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Navbar;