import React, { memo } from "react";
import st from "./ButtonFlashCard.module.scss";
import { svgCollection } from "../buttonSvgCard";


interface ButtonPropsFlashCard {
    svgName: string;
    title: string;
    onclick(): void; 
}

const ButtonFlashCard:React.FC<ButtonPropsFlashCard> = memo(({svgName, title, onclick}) => {
    return(
        <li onClick={onclick} className={st.button}>
            <span title={title}>
                {svgCollection[svgName as keyof typeof svgCollection]}
            </span>
        </li>
    );
})


export default ButtonFlashCard;