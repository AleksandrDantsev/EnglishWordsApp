import React, { useMemo, useState } from "react";
import st from "./Dictionary.module.scss";
import { useAppSelector } from "../../hooks/reduxToolkit";
import DictionaryCard from "../DictionaryCard/DictionaryCard";


const Dictionary: React.FC = () => {
    const [searchWordQueryDict, setSearchWordQueryDict] = useState<string>('');
    const dictionaryList = useAppSelector(state => state.dictionary.dictionaryList);

    const reverseDictArray = useMemo(() => {
        let array = [...dictionaryList];
        return array.reverse();
    }, [dictionaryList])
    
    const queryWord = searchWordQueryDict != '' && reverseDictArray.filter(el => el.word.includes(searchWordQueryDict));

    const searchShangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchWordQueryDict(e.target.value.toLowerCase());
        console.log(searchWordQueryDict)
    }

    return(
        <div className={st.wrapperDictionary}>
            <input className={st.inputSearcWord} placeholder="Search" onInput={searchShangeInput} type="text" />
            <div className={st.dictionaryCards}>
                {
                (queryWord ? queryWord : reverseDictArray).map(el => <DictionaryCard key={el.word} word={el.word} 
                                                            phonetic={el.phonetic} 
                                                            audio={el.phonetics} 
                                                            definition={el.meanings[0].definitions[0].definition}
                                                            allInfoAboutWord={el}                                                                                                        
                                                            />)
                }
            </div>
        </div>
    );
}


export default Dictionary;