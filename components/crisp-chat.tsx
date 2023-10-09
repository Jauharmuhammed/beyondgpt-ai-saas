"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("7184b9a5-d0f6-453a-8feb-6c976ad9df00");
    }, []);

    return null;
};
