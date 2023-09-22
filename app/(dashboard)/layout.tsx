import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full relative">
            <section className="hidden h-full md:flex md:fixed w-72">
                <Sidebar />
            </section>
            <section className="md:ms-72 bg-slate-900 h-full">
                <Navbar></Navbar>
                {children}
            </section>
        </div>
    );
};

export default DashboardLayout;
