import React, { useMemo, useState } from "react";
import st from "./Dictionary.module.scss";
import { useAppSelector } from "../../hooks/reduxToolkit";
import DictionaryCard from "../DictionaryCard/DictionaryCard";
import SelectDblClick from "../../hooks/selectDblClickText";

const Dictionary: React.FC = () => {
    const [searchWordQueryDict, setSearchWordQueryDict] = useState<string>('');
    const dictionaryList = useAppSelector(state => state.dictionary.dictionaryList);
    const [numberPage, setNumberPage] = useState<number>(0);
    const quantityWordsOnPage = 5;

        console.log('render')
    const reverseDictArray = useMemo(() => {
        let array = [...dictionaryList];
        return array.reverse();
    }, [dictionaryList])
    
    const queryWord = searchWordQueryDict != '' && reverseDictArray.filter(el => el.word.includes(searchWordQueryDict));
    
    const searchShangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWordQueryDict(e.target.value.toLowerCase());
        console.log(searchWordQueryDict)
    }

    const lengthArrayWords = new Array((Math.ceil(reverseDictArray.length / quantityWordsOnPage))).fill(0).map((el, id: number) => el = String(id));
    
    const setPagePagination = (e: React.MouseEvent<HTMLUListElement>) => {
        const targetLI = e.target as HTMLLIElement;
        if (targetLI.tagName == "LI" && targetLI.textContent) {
            setNumberPage(Number(targetLI.textContent));
        }
    }
    
    
   


    return(
        <div className={st.wrapperDictionary}>
            <SelectDblClick />
            <input className={st.inputSearcWord} placeholder="Search" onInput={searchShangeInput} type="text" />
            <div className={st.dictionaryCards}>
                {
                (queryWord ? queryWord : reverseDictArray.slice((numberPage * quantityWordsOnPage), (numberPage * quantityWordsOnPage) + quantityWordsOnPage)).map(el => <DictionaryCard key={el.word} word={el.word} 
                                                            phonetic={el.phonetic} 
                                                            audio={el.phonetics} 
                                                            definition={el.meanings[0].definitions[0].definition}
                                                            allInfoAboutWord={el}                                                                                                        
                                                            />)
                }
            </div>
            {
                (reverseDictArray.length > 5 && !queryWord)  &&
            <div className={st.nav}>
                <ul onClick={setPagePagination} className={st.navElems}>
                    {lengthArrayWords.map(el => <li className={numberPage == +el ? st.activePage : ''} key={el}>{el}</li>)}
                </ul>
            </div>
            }
        </div>
    );
}


export default Dictionary;