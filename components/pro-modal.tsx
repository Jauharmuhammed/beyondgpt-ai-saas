"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { planFeatures } from "@/data/plans";
import { CheckSquare } from "lucide-react";
import { MONTHLY_SUBSCRIPTION_FEE } from "@/constants";

const ProModal = () => {
    const proModal = useProModal();
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.close}>
            <DialogContent className="md:p-3 max-w-xl w-11/12 md:w-full">
                <DialogHeader>
                    <DialogTitle className="flex flex-col justify-center items-center gap-y-4 py-4">
                        <div className="flex items-center gap-x-2 font-semibold">
                            Upgrade to BeyondGPT
                            <Badge className="uppercase bg-violet text-white text-sm font-bold">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="box-border flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
                        <div className=" border-b md:border-r md:border-b-0 md:w-1/2 md:p-2 md:pe-4 flex flex-col space-y-4 pb-6 md:pb-4">
                            <h4 className="text-lg font-bold">Free plan</h4>
                            <Button
                                onClick={proModal.close}
                                variant="secondary"
                                className="text-sm w-full text-slate-300 font-semibold py-[1.3rem]">
                                Stick with free plan
                            </Button>
                            <div className="space-y-2">
                                {planFeatures.free.features.map((feature) => (
                                    <div className="flex space-x-3 items-start">
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
                                variant="primary"
                                className="text-sm w-full text-slate-300 font-semibold">
                                Upgrade to Pro
                            </Button>
                            <div className="space-y-2">
                                {planFeatures.pro.features.map((feature) => (
                                    <div className="flex space-x-3 items-start">
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
