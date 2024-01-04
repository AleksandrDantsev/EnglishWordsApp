import React, { Fragment, useMemo, useState } from "react";
import st from "./Dictionary.module.scss";
import DictionaryCard from "../DictionaryCard/DictionaryCard";
import SelectDblClick from "../../hooks/selectDblClickText";
import PaginationCard from "../../UI/PaginationCard/PaginationCard";
import { useAppSelector } from "../../hooks/reduxToolkit";


const Dictionary: React.FC = () => {
    const [searchWordQueryDict, setSearchWordQueryDict] = useState<string>('');
    const [numberPage, setNumberPage] = useState<number>(0);
    const quantityWordsOnPage = 5;
    const dictionaryList = useAppSelector(state => state.dictionary.dictionaryList);
    // const dictionaryList = JSON.parse(localStorage.getItem("dictionary")  || "[]");



    const reverseDictArray = useMemo(() => {
        let array = [...dictionaryList];
        console.log(array)
        return array.reverse();
    }, [dictionaryList])
    
    const queryWord = searchWordQueryDict != '' && reverseDictArray.filter(el => el.word.includes(searchWordQueryDict));
    
    const searchShangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWordQueryDict(e.target.value.toLowerCase());
    }


    return(
        <div className={st.wrapperDictionary}>
            {
                dictionaryList.length > 0 ? 
                <Fragment>
                <SelectDblClick />
                <div className={st.topLineDictionary}>
                    <input className={st.inputSearcWord} placeholder="Search" 
                                                         onInput={searchShangeInput} 
                                                         type="text" />
                    <div className={st.quantityWords}><span>Words: {dictionaryList.length}</span></div>
                </div>
                <div className={st.dictionaryCards}>
                    {
                    (queryWord ? queryWord : reverseDictArray.slice((numberPage * quantityWordsOnPage), (numberPage * quantityWordsOnPage) + quantityWordsOnPage))
                                                                .map(el => <DictionaryCard key={el.word} word={el.word} 
                                                                date={el.date}
                                                                phonetic={el.phonetic} 
                                                                audio={el.phonetics} 
                                                                definition={el.meanings[0].definitions[0].definition}
                                                                allInfoAboutWord={el}                                                                                                        
                                                                />)
                    }
                </div>
                {
                (reverseDictArray.length > 5 && !queryWord)  && <PaginationCard quantityWordsOnPage={quantityWordsOnPage} 
                                                                                setNumberPage={setNumberPage} 
                                                                                numberPage={numberPage} 
                                                                                quantityElems={reverseDictArray.length} />
                }
                </Fragment> :
                <div className={st.emptyDict}>Empty</div>
            }
        </div>
    );
}


export default Dictionary;