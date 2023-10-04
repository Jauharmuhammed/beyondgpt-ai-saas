import { CrispProvider } from "@/components/crisp-provider";
import Navbar from "@/components/landing/navbar";
import React from "react";

const LandingPageLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="">
            <Navbar />
            <CrispProvider />
            {children}
        </div>
    );
};

export default LandingPageLayout;
