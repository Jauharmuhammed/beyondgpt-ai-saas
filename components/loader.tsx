import { Zap } from "lucide-react";

const Loader = () => {
    return (
        <div className="bg-slate-900 max-w-2xl w-full py-4 px-3 md:px-0 transition duration-500">
            <div className="w-10 h-10 flex justify-center items-center bg-violet rounded-md">
                <Zap fill="white" size={18} className="animate-spin"/>
            </div>
        </div>
    );
};

export default Loader;
