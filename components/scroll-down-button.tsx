"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

const ScrollDownButton = () => {
    const [showButton, setShowButton] = useState<boolean>(false);

    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        // Check scroll position
        const handleScroll = () => {
            setShowButton(window.scrollY < document.body.scrollHeight - window.innerHeight); // Show the button if user scrolled down 100 pixels
        };

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll);

        // Remove the scroll event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        showButton && (
            <Button
                onClick={scrollToBottom}
                variant="outline"
                className="w-10 h-10 fixed bottom-[7.5rem] md:bottom-36 p-2 right-2.5 md:right-3 z-30 opacity-70">
                <ArrowDown size={20} />
            </Button>
        )
    );
};

export default ScrollDownButton;
