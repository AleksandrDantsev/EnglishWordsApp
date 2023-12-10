import React from "react";
import st from "./MenuCard.module.scss";

interface CardInfo {
    name: string;
    desc: string;
    logo: any;
}

const MenuCard:React.FC<CardInfo> = (props) => {
    return(
        <div className={st.menuCard}>
            <div className={st.menuCard_wrapper}>
                <div className={st.logo}>{props.logo}</div>
                <div className={st.name}>{props.name}</div>
                <div className={st.description}>{props.desc}</div>
            </div>
        </div>
    );
}


export default MenuCard;