import React from "react";
import st from "./Dictionary.module.scss";
import { useAppSelector } from "../../hooks/reduxToolkit";
import DictionaryCard from "../DictionaryCard/DictionaryCard";

const Dictionary: React.FC = () => {
    const dictionaryList = useAppSelector(state => state.dictionary.dictionaryList);
    console.log(dictionaryList)
    return(
        <div className={st.wrapperDictionary}>
            <div className={st.dictionaryCards}>
                {
                    dictionaryList.map(el => <DictionaryCard word={el.word} 
                                                             phonetic={el.phonetic} 
                                                             audio={el.phonetics}                                                                                                         
                                                             />)
                }
            </div>
        </div>
    );
}


export default Dictionary;