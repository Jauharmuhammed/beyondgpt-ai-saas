import SubscriptionButton from "@/components/subscription-button";
import { Card } from "@/components/ui/card";
import { MONTHLY_SUBSCRIPTION_FEE } from "@/constants";
import { planFeatures } from "@/data/plans";
import { checkSubscription } from "@/lib/subscription";
import { CheckSquare, Settings } from "lucide-react";
import React from "react";

const SettingsPage = async () => {
    const isPro = await checkSubscription();
    return (
        <div className="p-4 md:p-8 pb-2 md:pb-2 mt-24 md:mt-8 h-full flex flex-col justify-between">
            <div className="space-y-4">
                <div className="flex space-x-4 items-center">
                    <Settings
                        size={36}
                        strokeWidth={1}
                        className="text-indigo-300 bg-slate-800 p-2 w-fit h-fit rounded-sm"
                    />
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-bold">Settings</h2>
                        <p className="text-slate-400 text-sm">
                            Manage your subscription and billing info.
                        </p>
                    </div>
                </div>
                <p className="text-sm text-slate-300">
                    {isPro
                        ? "Currently you are on the Pro plan."
                        : "Currently you are on the free plan."}
                </p>
                <SubscriptionButton isPro={isPro} />
                <div className="">
                    <Card className="p-4 box-border flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 mt-16">
                        <div className=" border-b md:border-r md:border-b-0 md:w-1/2 md:p-2 md:pe-4 flex flex-col space-y-4 pb-6 md:pb-4">
                            <h4 className="text-lg font-bold text-left">Free plan</h4>

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
                    </Card>
                </div>
            </div>
            <footer className="text-slate-600 text-xs text-center">
                BeyondGPT @{new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default SettingsPage;
