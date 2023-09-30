import PlanDetails from "@/components/plan-details";
import SubscriptionButton from "@/components/subscription-button";
import { Card } from "@/components/ui/card";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";
import React from "react";

const SettingsPage = async () => {
    const isPro = await checkSubscription();
    return (
        <div className="p-4 md:p-8 pb-2 md:pb-2 h-full mt-24 md:mt-8 flex flex-col justify-between bg-slate-900">
            <div className="space-y-4">
                <div className="flex space-x-4 items-center">
                    <Settings
                        size={36}
                        strokeWidth={1}
                        className="text-indigo-300 bg-slate-800 p-2 w-14 h-14 rounded-sm"
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
                <div className="lg:w-fit">
                    <Card className="p-4 box-border flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 mt-16">
                        <PlanDetails />
                    </Card>
                </div>
            </div>
            <footer className="text-slate-600 text-xs text-center pt-16">
                BeyondGPT @{new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default SettingsPage;
