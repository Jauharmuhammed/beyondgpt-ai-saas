import React from "react";

import Hero from "@/components/landing/hero";
import Plans from "@/components/landing/plans";

const LandingPage = () => {
    return (
        <div>
            <div className="w-full h-full overflow-x-hidden">
                <Hero />
            </div>
            <Plans />
        </div>
    );
};

export default LandingPage;
