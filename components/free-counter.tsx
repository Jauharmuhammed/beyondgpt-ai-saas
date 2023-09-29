import { useEffect, useState } from "react";
import { CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Crown } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
}
const FreeCounter = ({ apiLimitCount, isPro = false }: FreeCounterProps) => {
    const proModal = useProModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;

    if (isPro) return null;

    return (
        <div>
            <CardContent className="p-0 pb-3 flex flex-col justify-center items-center space-y-4 border-0 border-t rounded-none min-h-[7.4rem]">
                <div className="w-full">
                    <p className="text-center text-slate-300/80 text-sm mb-2">
                        {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
                    </p>
                    <Progress className="h-1.5" value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
                </div>
                <Button onClick={proModal.open} variant="outline" className="w-full">
                    Upgrade &nbsp; <Crown fill="white" size={16} />
                </Button>
            </CardContent>
        </div>
    );
};

export default FreeCounter;
