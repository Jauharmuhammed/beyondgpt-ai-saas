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
                        <div className="flex items-center gap-x-2 font-semibold">
                            Upgrade to BeyondGPT{" "}
                            <Badge className="uppercase bg-violet text-white text-sm font-bold">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default ProModal;
