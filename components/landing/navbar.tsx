import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Navbar = () => {
    return (
        <section className="flex fixed z-50 top-0 left-0 right-0 justify-between p-4 md:p-6 backdrop-blur-md">
            <div>
                <div className="">
                    <Link className="flex space-x-3 items-center" href={"/dashboard"}>
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
        </section>
    );
};

export default Navbar;
