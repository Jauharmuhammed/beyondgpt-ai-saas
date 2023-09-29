import { MONTHLY_SUBSCRIPTION_FEE } from "@/constants";
import { planFeatures } from "@/data/plans";
import { CheckSquare } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const Plans = () => {
    return (
        <div className="snap-y snap-start h-screen w-full pt-[5.25rem] flex flex-col space-y-10 justify-center items-center">
            <Card className="p-6 md:p-8 mx-4 md:mx-0 max-w-2xl box-border flex flex-col md:flex-row justify-between space-y-3 md:space-y-0 mt-16">
                <div className=" border-b md:border-r md:border-b-0 md:w-1/2 md:p-2 md:pe-4 flex flex-col space-y-4 pb-6 md:pb-4">
                    <h4 className="text-xl text-slate-200 font-bold text-left">Free plan</h4>

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
                    <div className="flex justify-between text-xl text-slate-200 font-bold">
                        <h4>BeyondGPT Pro</h4>{" "}
                        <span className="text-white">${MONTHLY_SUBSCRIPTION_FEE}/mo</span>
                    </div>
                    <div className="space-y-2">
                        {planFeatures.pro.features.map((feature, index) => (
                            <div key={index} className="flex space-x-3 items-start">
                                <CheckSquare size={16} className="text-green-800 min-w-fit" />
                                <p className="text-sm text-slate-300 text-left">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
            <Link href="/sign-up">
                <Button variant="primary" className="">
                    Start your free trial today
                </Button>
            </Link>
        </div>
    );
};

export default Plans;
