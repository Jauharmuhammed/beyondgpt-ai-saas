import { CrispProvider } from "@/components/crisp-provider";
import Navbar from "@/components/landing/navbar";
import React from "react";

const LandingPageLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full">
            <Navbar />
            <CrispProvider />
            <div className="">{children}</div>
        </div>
    );
};

export default LandingPageLayout;
