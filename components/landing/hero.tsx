import React from "react";

const Hero = () => {
    return (
        <div className="h-screen w-full pt-[5.25rem]">
            <div className="relative w-full h-full overflow-hidden text-center flex justify-center">
                <video
                    className="w-full object-contain scale-[3] md:scale-150"
                    playsInline
                    autoPlay
                    muted
                    loop>
                    <source src="hero.mp4" type="video/mp4" />
                    <source src="hero.ogv" type="video/ogv" />
                    <source src="hero.webm" type="video/webm" />
                </video>

                {/* content */}
                <section className="w-full h-full space-y-4 z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-300 mt-40 md:mt-24">
                        BeyondGPT Pro
                    </h1>
                    <p className="text-slate-100">Chat Smarter, Not Harder, with BeyondGPT.</p>
                </section>
            </div>
        </div>
    );
};

export default Hero;
