import React from "react";
import st from "./SideBarDescription.module.scss";
import Definiton from "../Definiton/Definiton";

interface IDefinitionWord {
    information: [];
    setIsShowDefinitionBar: (arg: boolean) => void;
}

const SideBarDescription: React.FC<IDefinitionWord> = ({information, setIsShowDefinitionBar}) => {

    const closeDefinition = () => {
        setIsShowDefinitionBar(false);
    }
    
    return(
        <div className={st.sideBardDesc}>
            <span className={st.hideDescBar} onClick={closeDefinition}>
            <svg
                    fill="#787878"
                    height="15px"
                    width="15px"
                    viewBox="0 0 490 490"
                    stroke="#787878"
                >
                    <g strokeWidth="0"></g>
                    <g
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    ></g>
                    <g>
                        {" "}
                        <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490 489.292,457.678 277.331,245.004 489.292,32.337 "></polygon>{" "}
                    </g>
                </svg>
            </span>
            <div className={st.sidebarWrapper}>
                <Definiton typeDef={'adjactive'} data={information} typeSearch={"definition"} />
                <Definiton typeDef={'noun'} data={information} typeSearch={"definition"} />
                <Definiton typeDef={'verb'} data={information} typeSearch={"definition"} />
                <Definiton typeDef={'adverb'} data={information} typeSearch={"definition"} />
            </div>
        </div>
    );
}


export default SideBarDescription;