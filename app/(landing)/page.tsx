import React from "react";

import Hero from "@/components/landing/hero";
import Plans from "@/components/landing/plans";
import Footer from "@/components/landing/footer";

const LandingPage = () => {
    return (
        <div>
            <div className="w-full h-full overflow-x-hidden">
                <Hero />
            </div>
            <Plans />
            <Footer/>
        </div>
    );
};

export default LandingPage;
