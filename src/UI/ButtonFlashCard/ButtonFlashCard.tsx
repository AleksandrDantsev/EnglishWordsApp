import React, { memo } from "react";
import st from "./ButtonFlashCard.module.scss";
import { svgCollection } from "../buttonSvgCard";


interface ButtonPropsFlashCard {
    svgName: string;
    title: string;
}

const ButtonFlashCard:React.FC<ButtonPropsFlashCard> = memo(({svgName, title}) => {
    return(
        <li className={st.button}>
            <span title={title}>
                {svgCollection[svgName as keyof typeof svgCollection]}
            </span>
        </li>
    );
})


export default ButtonFlashCard;