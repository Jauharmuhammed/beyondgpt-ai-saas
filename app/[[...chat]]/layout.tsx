import Navbar from "@/components/navbar";
import ScrollDownButton from "@/components/scroll-down-button";
import Sidebar from "@/components/sidbar";
import { Providers } from "@/contexts/providers";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full relative">
            <section className="hidden h-full md:flex md:fixed w-72">
                <Sidebar />
            </section>
            <section className="md:ms-72 bg-slate-900 h-full flex flex-col">
                <Navbar />
                <ScrollDownButton />
                <Providers>{children}</Providers>
            </section>
        </div>
    );
};

export default DashboardLayout;
