import { Zap } from "lucide-react";

const Loader = () => {
    return (
        <div className="bg-slate-900 w-full py-4 px-3 md:px-4 flex justify-center">
            <div className="max-w-2xl w-full">
                <div className="w-10 h-10 flex justify-center items-center bg-violet rounded-md">
                    <Zap fill="white" size={18} className="animate-spin" />
                </div>
            </div>
        </div>
    );
};

export default Loader;
