import React from "react";
import { SiNextdotjs } from "react-icons/si";

const Footer = () => {
    return (
        <div className="py-8">
            <div className="w-full py-3 flex justify-center items-center text-sm text-slate-300">
                <span>Made with</span>
                &nbsp;&nbsp;
                <SiNextdotjs />
                &nbsp; by
                <a target="_blank" href="https://jauharmuhammed.com" className="text-blue-600">
                    &nbsp;Jauhar Muhammed
                </a>
            </div>
            <footer className="text-slate-600 text-xs text-center">
                BeyondGPT @{new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Footer;
