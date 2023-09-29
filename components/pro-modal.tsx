"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Button } from "./ui/button";
import { planFeatures } from "@/data/plans";
import { CheckSquare, Crown, Loader2 } from "lucide-react";
import { MONTHLY_SUBSCRIPTION_FEE } from "@/constants";
import axios from "axios";
import ProBadge from "./pro-badge";

const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            console.log("[STRIPE_CLIENT_ERROR]", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.close}>
            <DialogContent className="md:p-3 max-w-xl w-11/12 md:w-full">
                <DialogHeader>
                    <DialogTitle className="flex flex-col justify-center items-center gap-y-4 py-4">
                        <div className="flex items-center gap-x-2 font-semibold">
                            Upgrade to BeyondGPT
                            <ProBadge />
                        </div>
                    </DialogTitle>
                    <DialogDescription className="box-border flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
                        <div className=" border-b md:border-r md:border-b-0 md:w-1/2 md:p-2 md:pe-4 flex flex-col space-y-4 pb-6 md:pb-4">
                            <h4 className="text-lg font-bold text-left">Free plan</h4>
                            <Button
                                onClick={proModal.close}
                                variant="secondary"
                                className="text-sm w-full text-slate-300 font-semibold py-[1.3rem]">
                                Stick with free plan
                            </Button>
                            <div className="space-y-2">
                                {planFeatures.free.features.map((feature, index) => (
                                    <div key={index} className="flex space-x-3 items-start">
                                        <CheckSquare size={16} className="text-secondary" />
                                        <p className="text-sm text-slate-300 text-left">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="md:w-1/2 md:p-2 md:ps-4  flex flex-col space-y-4 pb-6 md:pb-4">
                            <div className="flex justify-between text-lg font-bold">
                                <h4>BeyondGPT Pro</h4>{" "}
                                <span className="text-white">${MONTHLY_SUBSCRIPTION_FEE}/mo</span>
                            </div>
                            <Button
                                onClick={onSubscribe}
                                disabled={loading}
                                variant="primary"
                                className="text-sm w-full text-slate-300 font-semibold">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Upgrade to Pro &nbsp; <Crown fill="white" size={16} />
                            </Button>
                            <div className="space-y-2">
                                {planFeatures.pro.features.map((feature, index) => (
                                    <div key={index} className="flex space-x-3 items-start">
                                        <CheckSquare
                                            size={16}
                                            className="text-green-800 min-w-fit"
                                        />
                                        <p className="text-sm text-slate-300 text-left">
                                            {feature}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProModal;
