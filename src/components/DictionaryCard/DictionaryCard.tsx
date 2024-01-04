import React, { useState, memo, Fragment } from "react";
import st from "./DictionaryCard.module.scss";
import SideBarDescription from "../SideBarDescription/SideBarDescription";
import PlaySoundCard from "../../UI/PlaySoundCard/PlaySoundCard";
import { useAppDispatch } from "../../hooks/reduxToolkit";
import { removeWordFromDictionary } from "../../store/reducers/dictionary";

interface IDictCard {
    word: string;
    audio: Array<{ audio: string }>;
    phonetic: string;
    definition: string;
    date: string;
    allInfoAboutWord: any;
}

const DictionaryCard: React.FC<IDictCard> = memo(({ word, audio, phonetic, definition, allInfoAboutWord, date }) => {
        const dispatch = useAppDispatch();
        const [isShowDefinitionBar, setIsShowDefinitionBar] = useState<boolean>(false);

        const showDefinitionWordHover = () => {
            setIsShowDefinitionBar(true);
        }

        const removeWord = () => {
            console.log(word)
            dispatch(removeWordFromDictionary(word))
        }

        return (
            <Fragment>
                {isShowDefinitionBar && <SideBarDescription setIsShowDefinitionBar={setIsShowDefinitionBar} 
                                                            information={allInfoAboutWord} />}
                <div className={st.dictioanryCard}>
                    <div className={st.wordTitle}>
                        <div className={st.word} onClick={showDefinitionWordHover}>{word}</div>
                        <div className={st.dictionaryDate}>{date}</div>
                        {phonetic && <div className={st.transcription}>{phonetic}</div>}
                    </div>
                    <div className={st.phonetics}>
                        <div className={st.def}>{definition}</div>
                        <PlaySoundCard audioString={audio} />
                        <div onClick={removeWord} className={st.deleteWord}>x</div>
                    </div>
                </div>
            </Fragment>
        );
    }
);

export default DictionaryCard;
