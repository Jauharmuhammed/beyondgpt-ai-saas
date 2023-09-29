"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Crown, Loader2 } from "lucide-react";
type subscriptionButtonType = {
    isPro: boolean;
};

const SubscriptionButton = ({ isPro }: subscriptionButtonType) => {
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            console.log("[BILLING_ERROR]", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Button onClick={onClick} disabled={loading} variant={"primary"}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPro ? "Manage your subscription" : "Upgrade to Pro "}
                {!isPro && (
                    <>
                        &nbsp;
                        <Crown fill="white" size={16} />
                    </>
                )}
            </Button>
        </div>
    );
};

export default SubscriptionButton;
