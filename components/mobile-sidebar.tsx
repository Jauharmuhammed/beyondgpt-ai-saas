"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import Sidebar from "./sidbar";

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Button asChild variant="ghost" size="icon" className="md:hidden p-2" >
                    <Menu width={30} height={30}/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;
