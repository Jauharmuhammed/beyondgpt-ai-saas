"use client";

import { AppProgressBar } from "next-nprogress-bar";


export default function TopLoadingBar() {

    return (
        <>
            <AppProgressBar
                color="#7F47DD"
                height="2px"
                options={{ showSpinner: false }}
            />
        </>
    );
}
