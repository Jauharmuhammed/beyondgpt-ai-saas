"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import React from "react";
import { Button } from "./ui/button";
import { planFeatures } from "@/data/plans";
import { CheckSquare, Crown, Loader2 } from "lucide-react";
import { MONTHLY_SUBSCRIPTION_FEE } from "@/constants";

interface PlanDetailsProps {
    actionButtons?: boolean;
    onSubscribe?: () => void;
    loading?: boolean;
}

const PlanDetails = ({ actionButtons = false, onSubscribe, loading = false }: PlanDetailsProps) => {
    const proModal = useProModal();

    return (
        <div className="box-border w-full flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
            <div className="border-b md:border-r md:border-b-0 md:w-1/2 md:p-2 md:pe-4 flex flex-col space-y-4 pb-6 md:pb-4">
                <h4 className="text-lg font-bold text-left">Free plan</h4>
                {actionButtons && (
                    <Button
                        onClick={proModal.close}
                        variant="secondary"
                        className="text-sm w-full text-slate-300 font-semibold py-[1.3rem]">
                        Stick with free plan
                    </Button>
                )}
                <div className="space-y-2">
                    {planFeatures.free.features.map((feature, index) => (
                        <div key={index} className="flex space-x-3 items-start">
                            <CheckSquare size={16} className="text-secondary" />
                            <p className="text-sm text-slate-300 text-left">{feature}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:w-1/2 md:p-2 md:ps-4  flex flex-col space-y-4 pb-6 md:pb-4">
                <div className="flex justify-between text-lg font-bold">
                    <h4>BeyondGPT Pro</h4>{" "}
                    <span className="text-white">${MONTHLY_SUBSCRIPTION_FEE}/mo</span>
                </div>
                {actionButtons && (
                    <Button
                        onClick={onSubscribe}
                        disabled={loading}
                        variant="primary"
                        className="text-sm w-full text-slate-300 font-semibold">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Upgrade to
                        Pro &nbsp; <Crown fill="white" size={16} />
                    </Button>
                )}
                <div className="space-y-2">
                    {planFeatures.pro.features.map((feature, index) => (
                        <div key={index} className="flex space-x-3 items-start">
                            <CheckSquare size={16} className="text-green-800" />
                            <p className="text-sm flex-grow w-64 text-slate-300 text-left">
                                {feature}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PlanDetails;
