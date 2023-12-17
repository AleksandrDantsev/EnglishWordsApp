import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";
import st from "./selectDblClickText.module.scss";
import PlaySoundCard from "../UI/PlaySoundCard/PlaySoundCard";


type IAudioData = {
    text?: string;
    audio: string;
}

const SelectDblClick: React.FC = () => {
    const [word, setWord] = useState<string>('');
    const [position, setPosition] = useState<{x: string, y: string}>({x: '', y: ''});
    const [data, setData] = useState<any>();
    const [audioString, setAudioString] = useState<IAudioData[]>([]);

    useEffect(() => {
        function getSelectionWord(e) {
            setPosition({x: e.clientX, y: e.clientY});
            if (window.getSelection()) {
                let select = window.getSelection();
                setWord(select!.toString().toLowerCase().trim());
            }
        }

        function removePanelHint(e: React.MouseEvent<HTMLElement | HTMLAnchorElement>) {
            if (!((e.target as HTMLElement).closest(st.panelPronWord))) {
                setWord('');
            }
        }

        document.addEventListener('click', () => removePanelHint());
        document.addEventListener('dblclick', getSelectionWord);
        return () => {
            document.removeEventListener('dblclick', getSelectionWord);
            document.removeEventListener('click', () => removePanelHint())
        }
    }, [word])

    useEffect(() => {
        (async () => {
            try {
                await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                    .then(data => {
                        setData(data.data[0]);
                        setAudioString(data.data[0].phonetics);
                    })
                    .catch(() => {
                        console.log("error1")
                    });
            }
            catch(err) {
                console.log("error");
            }
        })();
    }, [word])

    
    console.log(word)
    return (
     <Fragment>
         {word && 
         <div className={st.panelPronWord} style={{left: position.x + "px", top: position.y + "px"}}>
            <div className={st.wrapper}>
                <div className={st.transcription}>
                    {data?.phonetic}
                </div>
                <PlaySoundCard audioString={audioString} />
            </div>
         </div>
         }
     </Fragment>
        
    );
}

export default SelectDblClick;