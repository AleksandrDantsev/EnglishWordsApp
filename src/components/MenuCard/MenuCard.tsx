import React from "react";
import st from "./MenuCard.module.scss";
import { Link } from "react-router-dom";

interface CardInfo {
    name: string;
    desc: string;
    link: string;
    logo: any;
}

const MenuCard:React.FC<CardInfo> = (props) => {
    return(
        <div className={st.menuCard}>
                <Link to={"/" + props.link}>
                <div className={st.menuCard_wrapper}>
                    <div className={st.logo}>{props.logo}</div>
                    <div className={st.name}>{props.name}</div>
                    <div className={st.description}>{props.desc}</div>
                </div>
                </Link>
            </div>
    );
}


export default MenuCard;