"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = async () => {
    useEffect(() => {
        Crisp.configure(process.env.CRISP_WEBSITE_ID!);
    }, []);

    return null;
};
