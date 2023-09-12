import { UserButton } from "@clerk/nextjs";
import React from "react";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
    return (
        <div className="flex items-center p-4 ">
            <MobileSidebar />

            <nav className="flex w-full justify-end">
                <UserButton afterSignOutUrl="/" />
            </nav>
        </div>
    );
};

export default Navbar;
