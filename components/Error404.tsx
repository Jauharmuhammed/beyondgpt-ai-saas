import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Error404 = () => {
    return (
        <div className="flex flex-col h-full w-full items-start">
            <Link href="/" className=" text-sm p-4 flex items-center">
                <ChevronLeft size={20} />&nbsp;Back to Home
            </Link>
            <div className="w-full h-full flex justify-center items-center">
                <div className="flex items-center text-slate-300">
                    <span className="p-4 border-r text-xl">404</span>
                    <span className="p-4 font-light text-sm text-slate-500">Page Not Found</span>
                </div>
            </div>
        </div>
    );
};

export default Error404;
