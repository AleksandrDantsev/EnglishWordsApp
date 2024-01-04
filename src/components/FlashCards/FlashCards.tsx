import React, {useState, Fragment, useEffect, useMemo} from "react";
import st from "./FlashCards.module.scss";
import ButtonFlashCard from "../../UI/ButtonFlashCard/ButtonFlashCard";
import axios from "axios";
import Definiton from "../Definiton/Definiton";
import { Phonetik } from "../Translator/types";
import { useAppDispatch } from "../../hooks/reduxToolkit";
import { addWordToDictionary } from "../../store/reducers/dictionary";

const FlashCards: React.FC = () => {
    const [countCard, setCountCard] = useState<number>(0);
    const [stateCard, setStateCard] = useState<string>('');
    const [inputWord, setInputWord] = useState<string>('');
    const [serverWordInfo, setServerWordInfo] = useState<any>();
    const queueCard = useMemo(() => JSON.parse(localStorage.getItem("flashCards") || "[]").sort(() => Math.random() - 0.5), [localStorage.getItem("flashCards")]);
    const dispatch = useAppDispatch();

    const playPronounceWord = () => {
        if (serverWordInfo!.phonetics.find((el: Phonetik) => el.audio != '')) {
            new Audio(serverWordInfo!.phonetics.filter((el: Phonetik) => el.audio != '')[0].audio).play();
        }
    }

    useEffect(() => {
        (async() => {
            await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${queueCard[countCard].word.toLowerCase().trim()}`)
            .then(data => setServerWordInfo(data.data[0]))
            .catch(() => console.log("error"));
        })();
        console.log(serverWordInfo)
    }, [countCard])


    const nextCard = () => {
        if (countCard < queueCard.length - 1) {
            passCard();
            setTimeout(() => {
                setInputWord('');
                setStateCard('');
                setCountCard((prev: number) => prev + 1);
            }, 700)
        }
    }

    const passCard = () => {
        console.log(serverWordInfo, queueCard[countCard].word)
        if (inputWord.toLowerCase().trim() === queueCard[countCard].word.toLowerCase().trim()) {
            setStateCard("right");
            setTimeout(playPronounceWord, 400);
        } 
        else {
            setStateCard("mistake");
        }
    }

    const hintShow = () => {
        const word = queueCard[countCard].word;
        const quantityLetter = Math.floor(word.length / 2);
        const positionLetter: number[] = [];

        for (let i = 0; i < quantityLetter; i++) {
            const randomPosition = Math.floor(Math.random() * (word.length));
            if (positionLetter.includes(randomPosition)) {
                i -= 1;
                continue;
            }
            positionLetter.push(randomPosition);
        }
        const hintWord: string[] = [];

        for (let i = 0; i < word.length; i++) {
            if (positionLetter.includes(i)) hintWord.push(word[i]);
            else hintWord.push(' ')
        }

        setInputWord(hintWord.join(''));
    }

    const clearInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        if (target.value.length == queueCard[countCard].word.length) {
            setInputWord('');
        }
    }

    const showEntireWord = () => {
        setStateCard("show");
    }

    const addToDictionary = () => {
        console.log(serverWordInfo)
        dispatch(addWordToDictionary(serverWordInfo));
    }

    return (
        <div className={st.flashCardsWrapper}>
            <div className={st.flashCardsTop}>
                <div className={(stateCard == "right" && st.flashCard_picture + ' ' + st.rightAnwser) ||
                                (stateCard == "mistake" && st.flashCard_picture + ' ' + st.wrongAnwser)
                                || st.flashCard_picture}>
                    <img
                        src={queueCard[countCard].url || queueCard[countCard].imageChoise}
                        alt={queueCard[countCard].word}
                    />
                    <div className={st.falshCardActionPanel}>
                        {
                        Boolean(serverWordInfo?.phonetics.filter((el: Phonetik) => el.audio != '')[0]?.audio) &&
                        <div onClick={playPronounceWord} className={st.flasCardSoundBt}>
                        <svg
                            fill="#404040"
                            width="20px"
                            height="20px"
                            viewBox="0 0 1920 1920"
                            stroke="#404040"
                        >
                            <g strokeWidth="1" />

                            <g
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            <g>
                                {" "}
                                <path
                                    d="M1129.432 113v1694.148H936.638l-451.773-451.773h-315.45C76.01 1355.375 0 1279.365 0 1185.96V734.187c0-93.404 76.01-169.414 169.415-169.414h315.45L936.638 113h192.794Zm-112.943 112.943h-33.093l-418.68 418.68v630.901l418.68 418.68h33.093V225.944Zm655.488 135.114C1831.904 521.097 1920 733.77 1920 960.107c0 226.226-88.096 438.898-248.023 598.938l-79.851-79.85c138.694-138.695 214.93-323.018 214.93-519.087 0-196.183-76.236-380.506-214.93-519.2Zm-239.112 239.745c95.663 97.018 148.294 224.644 148.294 359.272s-52.631 262.254-148.294 359.272l-80.529-79.286c74.769-75.785 115.88-175.175 115.88-279.986 0-104.811-41.111-204.201-115.88-279.986Zm-981.092 76.914H169.415c-31.06 0-56.472 25.3-56.472 56.471v451.773c0 31.172 25.412 56.472 56.472 56.472h282.358V677.716Z"
                                    fillRule="evenodd"
                                />{" "}
                            </g>
                        </svg>
                        </div>
                        }
                        <div className={st.flasCardEdit}>
                            <svg
                                height="19px"
                                width="19px"
                                fill="#404040"
                                viewBox="0 0 32 32"
                                stroke="#404040"
                                strokeWidth="0.00032"
                            >
                                <g strokeWidth="0"></g>
                                <g
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g>
                                    {" "}
                                    <path d="M30.133 1.552c-1.090-1.044-2.291-1.573-3.574-1.573-2.006 0-3.47 1.296-3.87 1.693-0.564 0.558-19.786 19.788-19.786 19.788-0.126 0.126-0.217 0.284-0.264 0.456-0.433 1.602-2.605 8.71-2.627 8.782-0.112 0.364-0.012 0.761 0.256 1.029 0.193 0.192 0.45 0.295 0.713 0.295 0.104 0 0.208-0.016 0.31-0.049 0.073-0.024 7.41-2.395 8.618-2.756 0.159-0.048 0.305-0.134 0.423-0.251 0.763-0.754 18.691-18.483 19.881-19.712 1.231-1.268 1.843-2.59 1.819-3.925-0.025-1.319-0.664-2.589-1.901-3.776zM22.37 4.87c0.509 0.123 1.711 0.527 2.938 1.765 1.24 1.251 1.575 2.681 1.638 3.007-3.932 3.912-12.983 12.867-16.551 16.396-0.329-0.767-0.862-1.692-1.719-2.555-1.046-1.054-2.111-1.649-2.932-1.984 3.531-3.532 12.753-12.757 16.625-16.628zM4.387 23.186c0.55 0.146 1.691 0.57 2.854 1.742 0.896 0.904 1.319 1.9 1.509 2.508-1.39 0.447-4.434 1.497-6.367 2.121 0.573-1.886 1.541-4.822 2.004-6.371zM28.763 7.824c-0.041 0.042-0.109 0.11-0.19 0.192-0.316-0.814-0.87-1.86-1.831-2.828-0.981-0.989-1.976-1.572-2.773-1.917 0.068-0.067 0.12-0.12 0.141-0.14 0.114-0.113 1.153-1.106 2.447-1.106 0.745 0 1.477 0.34 2.175 1.010 0.828 0.795 1.256 1.579 1.27 2.331 0.014 0.768-0.404 1.595-1.24 2.458z"></path>{" "}
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={st.flashCard_buttonRightCard}>
                    <ul className={st.btFlashCards}>
                        <ButtonFlashCard onclick={hintShow} svgName={"hint"} title={"Hint"} />
                        <ButtonFlashCard onclick={addToDictionary} svgName={"dict"} title={"Add to dictionary"}
                        />
                        <ButtonFlashCard onclick={showEntireWord} svgName={"show"} title={"Show word"} />
                        <ButtonFlashCard onclick={nextCard} svgName={"next"} title={"Next word"} />
                        <ButtonFlashCard onclick={passCard} svgName={"pass"} title={"Check"} />
                    </ul>
                </div>
            </div>
            {
            ((stateCard != "right" && stateCard != "show") || stateCard == "show") &&  
            <div className={st.falschCard_inputWord}>
                <input  onInput={(e) => setInputWord((e.target as HTMLInputElement).value)} 
                        onClick={clearInputClick} 
                        value={inputWord} 
                        type="text" 
                        placeholder="answer" />
                <div className={st.hint}>{queueCard[countCard].description}</div>
            </div>
            }
            {
            (stateCard == "right" || stateCard == "show") &&
            <Fragment>
                <div className={st.falschCard_word}>{queueCard[countCard].word}</div>
                <div className={st.flashCard_bottomPanel}>
                    <div className={st.flashCard_describeCard}>
                        <div className={st.falschCard_definitionExamples}>
                            <div className={st.definiton}>
                                <h2 className={st.titleDefintion}>Definition</h2>
                                <Definiton typeDef={'noun'} data={serverWordInfo} typeSearch={"definition"} />
                                <Definiton typeDef={'adjective'} data={serverWordInfo} typeSearch={"definition"} />
                                <Definiton typeDef={'verb'} data={serverWordInfo} typeSearch={"definition"} />
                                <Definiton typeDef={'adverb'} data={serverWordInfo} typeSearch={"definition"} />
                            </div>
                            <div className={st.definiton}>
                                <h2 className={st.titleDefintion}>Examples</h2>
                                <Definiton typeDef={'noun'} data={serverWordInfo} typeSearch={"example"} />
                                <Definiton typeDef={'adjective'} data={serverWordInfo} typeSearch={"example"} />
                                <Definiton typeDef={'verb'} data={serverWordInfo} typeSearch={"example"} />
                            </div> 
                        </div>
                    </div>
                </div>
            </Fragment>
            }
        </div>
    );
};

export default FlashCards;
