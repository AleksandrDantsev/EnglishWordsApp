import React, { Fragment } from "react";
import st from "./Layout.module.scss";
import { Outlet } from "react-router-dom"
import Header from "../Header/Header";


const Layout:React.FC  = () => {
    return(
        <Fragment>
            <Header />
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
}


export default Layout;