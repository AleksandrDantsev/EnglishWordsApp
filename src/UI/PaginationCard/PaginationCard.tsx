import React from "react";
import st from "./PaginationCard.module.scss";


interface IInfoPagination {
    setNumberPage: (arg: number) => void;
    numberPage: number;
    quantityElems: number;
    quantityWordsOnPage: number;
    type?: string;
}

const PaginationCard: React.FC<IInfoPagination> = ({numberPage, quantityElems, setNumberPage, quantityWordsOnPage, type}) => {

    const lengthArrayWords = new Array((Math.ceil(quantityElems / quantityWordsOnPage))).fill(0)
                            .map((el, id: number) => type ? el = String(id +1) : el = String(id));
    
    const setPagePagination = (e: React.MouseEvent<HTMLUListElement>) => {
        const targetLI = e.target as HTMLLIElement;
        if (targetLI.tagName == "LI" && targetLI.textContent) {
            setNumberPage(Number(targetLI.textContent));
        }
    }
    

    return(
        <div className={st.nav}>
            <ul onClick={setPagePagination} className={st.navElems}>
                {lengthArrayWords.map(el => <li className={numberPage == +el ? st.activePage : ''} key={el}>{el}</li>)}
            </ul>
         </div>
    );
}


export default PaginationCard;