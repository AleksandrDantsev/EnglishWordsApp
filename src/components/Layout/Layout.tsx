import React from "react";
import st from "./Layout.module.scss";
import { Outlet } from "react-router-dom"

const Layout:React.FC  = () => {
    return(
        <main>
            <Outlet />
        </main>
    );
}


export default Layout;