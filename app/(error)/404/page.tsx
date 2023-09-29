import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Custom404() {
    return (
        <div className="flex flex-col h-full w-full items-start">
            <Link href="/" className=" text-sm p-4">
                Back to Home
            </Link>
            <div className="w-full h-full flex justify-center items-center">
                <div className="flex items-center text-slate-300">
                    <span className="p-4 border-r text-xl">404</span>
                    <span className="p-4 font-light text-sm text-slate-500">Page Not Found</span>
                </div>
            </div>
        </div>
    );
}
