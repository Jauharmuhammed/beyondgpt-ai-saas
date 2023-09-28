"use client";

import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "./ui/badge";

const ProModal = () => {
    const proModal = useProModal();
    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex flex-col justify-center items-center gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-semibold text-sm">
                            Upgrade to BeyondGPT{" "}
                            <Badge className="uppercase bg-violet text-white text-sm font-bold">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className=" flex flex-col md:flex-row justify-between">
                        <div className="border-r flex-grow">Free plan</div>
                        <div className="flex-grow">Plus</div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProModal;
