import React, { useState, useMemo, memo } from "react";
import st from "./DictionaryCard.module.scss";
import { Link } from "react-router-dom";

interface IDictCard {
    word: string;
    audio: Array<{ audio: string }>;
    phonetic: string;
    definition: string;
}

const DictionaryCard: React.FC<IDictCard> = memo(({ word, audio, phonetic, definition }) => {
        const [isSoundPlay, setIsSoundPlay] = useState<boolean>(false);

        const wordPronunciation = useMemo(() => {
            for (let i = 0; i < audio.length; i++) {
                if (audio[i].audio.endsWith("us.mp3")) return audio[i];
            }
            return audio[0] || { audio: "" };
        }, []);

        const playSoundPronunciation = () => {
            setIsSoundPlay(true);
            const audio =  new Audio(wordPronunciation.audio);
            audio.play();
            audio.onended = () => setIsSoundPlay(false);
        }

        return (
            <div className={st.dictioanryCard}>
                <div className={st.wordTitle}>
                    <div className={st.word}><Link to="">{word}</Link></div>
                    {phonetic && <div className={st.transcription}>{phonetic}</div>}
                </div>
                <div className={st.phonetics}>
                    <div className={st.def}>{definition}</div>
                    <div onClick={playSoundPronunciation} className={st.audioWord}>
                    {
                        wordPronunciation.audio &&
                        <svg className={isSoundPlay ? st.animationSoundPlayClass : ''} 
                            width="30px"
                            height="30px"
                            viewBox="-0.5 0 25 25"
                            fill="none"
                            stroke="#6e6e6e"
                        >
                            <g strokeWidth="0"></g>
                            <g
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g>
                                {" "}
                                <path
                                    d="M12.5493 4.50005C11.3193 4.04005 8.70926 5.49996 6.54926 7.40996H4.94922C3.88835 7.40996 2.87093 7.83145 2.12079 8.58159C1.37064 9.33174 0.949219 10.3491 0.949219 11.41V13.41C0.949219 14.4708 1.37064 15.4883 2.12079 16.2385C2.87093 16.9886 3.88835 17.41 4.94922 17.41H6.54926C8.65926 19.35 11.2693 20.78 12.5493 20.33C14.6493 19.55 14.9992 15.33 14.9992 12.41C14.9992 9.48996 14.6493 5.28005 12.5493 4.50005Z"
                                    stroke="#6e6e6e"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{" "}
                                <path
                                    d="M20.6602 6.71997C22.1593 8.22011 23.0015 10.2542 23.0015 12.375C23.0015 14.4958 22.1593 16.5299 20.6602 18.03"
                                    stroke="#6e6e6e"
                                    stroke-width="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{" "}
                                <path
                                    d="M18.5391 15.95C19.4764 15.0123 20.003 13.7407 20.003 12.4149C20.003 11.0891 19.4764 9.81764 18.5391 8.88"
                                    stroke="#2b2b2b"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{" "}
                            </g>
                        </svg>
                    }
                    </div>
                   
                </div>
            </div>
        );
    }
);

export default DictionaryCard;
