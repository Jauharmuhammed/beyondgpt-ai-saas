"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import axios from "axios";
import ProBadge from "./pro-badge";
import PlanDetails from "./plan-details";

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
                    <DialogDescription asChild className="box-border flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
                        <PlanDetails actionButtons onSubscribe={onSubscribe} loading={loading} />
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProModal;
