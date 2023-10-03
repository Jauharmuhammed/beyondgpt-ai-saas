import React from "react";
import SidebarHeader from "./sidebar-header";
import ProBadge from "./pro-badge";
import UnderConstruction from "./under-construction";

const Plugins = () => {
    return (
        <>
            <div className="flex gap-2 items-center">
                <SidebarHeader title="Plugins" />
                <ProBadge />
            </div>
            <UnderConstruction />
        </>
    );
};
export default Plugins;
