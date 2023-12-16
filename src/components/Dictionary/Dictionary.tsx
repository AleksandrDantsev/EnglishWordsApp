import React, { useMemo } from "react";
import st from "./Dictionary.module.scss";
import { useAppSelector } from "../../hooks/reduxToolkit";
import DictionaryCard from "../DictionaryCard/DictionaryCard";


const Dictionary: React.FC = () => {
    const dictionaryList = useAppSelector(state => state.dictionary.dictionaryList);
    console.log(dictionaryList)
    const reverseDictArray = useMemo(() => {
        let array = [...dictionaryList];
        return array.reverse();
    }, [dictionaryList])

    return(
        <div className={st.wrapperDictionary}>
            <div className={st.dictionaryCards}>
                {
                    reverseDictArray.map(el => <DictionaryCard word={el.word} 
                                                             phonetic={el.phonetic} 
                                                             audio={el.phonetics} 
                                                             definition={el.meanings[0].definitions[0].definition}                                                                                                        
                                                             />)
                }
            </div>
        </div>
    );
}


export default Dictionary;