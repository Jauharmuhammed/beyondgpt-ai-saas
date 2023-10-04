import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import PlanDetails from "../plan-details";

const Plans = () => {
    return (
        <div className="h-full w-full pb-32 flex flex-col space-y-10 justify-center items-center">
            <Card className="p-6 md:p-8 mx-4 md:mx-0 max-w-2xl box-border flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
                <PlanDetails />
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
