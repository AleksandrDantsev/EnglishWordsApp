import React, { useEffect, useState, Fragment, lazy } from "react";
import axios from "axios";
import st from "./selectDblClickText.module.scss";
const PlaySoundCard = lazy(() => import("../UI/PlaySoundCard/PlaySoundCard"));


type IAudioData = {
    text?: string;
    audio: string;
}

interface IInputDataWord {
    word: string;
    phonetic?: string;
    phonetics: Array<{
        text?: string;
        audio?: string;
    }>
}

const SelectDblClick: React.FC = () => {
    const [word, setWord] = useState<string>('');
    const [position, setPosition] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [data, setData] = useState<IInputDataWord>();
    const [isActivePanel, setIsActivePanel] = useState<boolean>(false);
    const [audioString, setAudioString] = useState<IAudioData[]>([]);

    useEffect(() => {
        (async () => {
            try {
                await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                .then(data => {
                        setData(data.data[0]);
                        setAudioString(data.data[0].phonetics);
                    })
                    .catch(() => {
                        setData(undefined);
                        setAudioString([]);
                    });
            }
            catch(err) {
                console.log("error");
            }
        })();
    }, [word])

    useEffect(() => {
        function getSelectionWord(e: any) {
            if (window.getSelection()!.toString().length > 2) {
                let select = window.getSelection();
                setPosition({x: e.clientX, y: e.clientY});
                setIsActivePanel(true);
                setWord(select!.toString().toLowerCase().trim());
            }
        }

        function removePanelHint(e: any) {
            e.stopPropagation();
            const target = e.target as HTMLElement;
            if (!(target.closest(st.panelPronWord))) {
                setIsActivePanel(false);
            }
        }

        document.addEventListener('click', removePanelHint);
        document.addEventListener('dblclick', getSelectionWord);

        return () => {
            document.removeEventListener('click', removePanelHint)
            document.removeEventListener('dblclick', getSelectionWord);
        }
    }, [])

    return (
     <Fragment>
         {isActivePanel && 
         <div className={st.panelPronWord} style={{left: position.x + "px", top: position.y + "px"}}>
            <div className={st.wrapper}>
                {
                    audioString.length > 0 || Boolean(data?.phonetic) ?
                    <Fragment>
                        {
                        Boolean(data?.phonetic) &&
                        <div className={st.transcription}>
                            <span>{data?.phonetic}</span> 
                        </div>
                        }
                    <PlaySoundCard audioString={audioString} />
                    </Fragment>
                    : <div className={st.notFound}>Not found</div>
                }
            </div>
        </div>
         }
     </Fragment>
        
    );
}

export default SelectDblClick;