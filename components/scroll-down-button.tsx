"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { usePathname } from "next/navigation";

const ScrollDownButton = () => {
    const [showButton, setShowButton] = useState<boolean>(false);
    const pathname = usePathname();


    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    useEffect(() => {
        // Check scroll position
        const handleScroll = () => {
            setShowButton(Math.ceil(window.scrollY) < document.body.scrollHeight - window.innerHeight); // Show the button if user scrolled down 100 pixels
        };

        // console.log("[SCROLL_Y]", window.scrollY)
        // console.log("[SCROLL_HEIGHT]", document.body.scrollHeight)
        // console.log("[INNER_HEIGHT]", window.innerHeight)

        // Listen for scroll events
        window.addEventListener("scroll", handleScroll);

        // Remove the scroll event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    if (!(pathname.includes("code") || pathname.includes("chat"))) return null;

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
