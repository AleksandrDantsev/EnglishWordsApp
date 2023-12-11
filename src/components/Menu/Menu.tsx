import React, { useMemo } from "react";
import st from "./Menu.module.scss";
import MenuCard from "../MenuCard/MenuCard";
import { infoMenuCardArray } from "../../UI/infoMenuCardArray";

interface infoCard {
    translate: {
        name: string;
        description: string;
        link: string,
        logo: any;
    }
}

const Menu:React.FC = () => {
    const lstCardMenu = useMemo(() => {
        return Object.keys(infoMenuCardArray).map(el => <MenuCard key={el} name={infoMenuCardArray[el as keyof infoCard].name}
                                                                  desc={infoMenuCardArray[el as keyof infoCard].description}        
                                                                  logo={infoMenuCardArray[el as keyof infoCard].logo}
                                                                  link={infoMenuCardArray[el as keyof infoCard].link}
                                                                   />)
    }, [])

    return(
        <div className={st.menuWrapper}>
            {lstCardMenu}
        </div>
    );
}


export default Menu;