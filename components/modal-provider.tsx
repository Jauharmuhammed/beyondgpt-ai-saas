"use client";

import React, { useEffect, useState } from "react";
import ProModal from "./pro-modal";

const ModalProvider = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;
    return <ProModal />;
};

export default ModalProvider;
