import React from "react";
import st from "./Header.module.scss";
import { Link } from "react-router-dom"

const Header:React.FC = () => {
    return(
        <header className={st.header}>
            <div className={st.wrapper_header}>
                <div className={st.header_home}>home</div>
                <div className={st.header_buttons}>
                    <ul className={st.links}>
                        <li><Link to="/">Your statistic</Link></li>
                        <li><Link to="/">Your statistic</Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
}


export default Header;