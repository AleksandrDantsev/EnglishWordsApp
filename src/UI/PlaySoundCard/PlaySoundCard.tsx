import React, { useState, useMemo, Fragment } from "react";
import st from "./PlaySoundCard.module.scss";

interface IAudioData {
    audioString : TArrayAudio[];
}

type TArrayAudio = {
    text?: string;
    audio: string;
}

const PlaySoundCard: React.FC<IAudioData> = ({audioString}) => {
    const [isSoundPlay, setIsSoundPlay] = useState<boolean>(false);

    const wordPronunciation = useMemo((): string | undefined => {
            if (audioString.length) {
                for (let i = 0; i < audioString.length; i++) {
                    if (audioString[i].audio.endsWith("us.mp3")) return audioString[i].audio;
                }
                const result = audioString.find((el: {audio: string}) => el.audio != '')?.audio;
                return result;
            }
    }, [audioString]);
    
    const playSoundPronunciation = () => {
        setIsSoundPlay(true);
        const audio = new Audio(wordPronunciation);
        audio.play();
        audio.onended = () => setIsSoundPlay(false);
    }

    return(
        <Fragment>
        {   Boolean(wordPronunciation) &&
            <div onClick={playSoundPronunciation} className={st.audioWord}>
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
                            strokeWidth="1.5"
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
            </div>
        }
        </Fragment>
    );
}


export default PlaySoundCard;