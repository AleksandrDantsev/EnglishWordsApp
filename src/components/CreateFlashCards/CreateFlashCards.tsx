import React, { useState, useMemo } from "react";
import st from "./CreateFlashCards.module.scss";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkit";
import { addFlasCard } from "../../store/reducers/flashcards";

const KEY = "468Q8bMOgOGEE83ah-aDyPEulZLkL2xJoCUTexnRBFs";

type FlashCardList = {
    word: string;
    url: string;
    description: string;
};


const CreateFlashCards:React.FC = () => {
    const [arrayImages, setArrayImages] = useState<string[]>([]);
    const [choiseImg, setChoiseImg] = useState<string>('');
    const [infoForm, setInfoForm] = useState<FlashCardList>({word: '', url: '', description: ''});
    const [isAddedWord, setIsAddedWord] = useState<boolean>(false);
    const [isWordNotFound, setIsWordNotFound] = useState(false);
    const dispatch = useAppDispatch();
    const lstFLC = useAppSelector(state => state.flashcards.listCard);

    const getQueryInput = async (e: React.FocusEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        try {
            const word = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${target.value.toLowerCase().trim()}`)
            .then(data => data.data[0]);
            if (word) {
                setIsWordNotFound(false);
                await axios.get(`https://api.unsplash.com/search/collections/?client_id=${KEY}&query=${target.value.toLowerCase()}`)
                .then(data => {
                    setArrayImages(data.data.results.filter((el: any) => el.preview_photos).map((el) => el?.preview_photos).flat().map((el) => el?.urls?.regular));
                })
                .catch(() => console.log("error search"))
                setIsAddedWord(false);
            }
        }
        catch(err) {
            setIsWordNotFound(true);
        }

    }

    const choisePhotoName = (e: React.MouseEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        if (target.tagName == "IMG") setChoiseImg(target.src);
    }

    
    const wordInputWriteDown = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setInfoForm({...infoForm, word: target.value})
    }

    const descriptionInputWriteDown = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setInfoForm({...infoForm, description: target.value})
    }
    
    const urlInputWriteDown = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        setInfoForm({...infoForm, url: target.value})
    }
    
    const addToFlashCards = () => {
        dispatch(addFlasCard({...infoForm, imageChoise: choiseImg}));
        setInfoForm({word: '', url: '', description: ''});
        setIsAddedWord(true);
        setChoiseImg('');
        console.log(lstFLC)
    }

    const deployPhotos = useMemo(() => {
        return (
            arrayImages.map((el, i) => 
            <div key={el+i} className={st.imgPazzleUnit}>
                <img className={choiseImg == el ? st.activeImage : (Boolean(choiseImg) ? st.blurImage : '')} src={el} alt="Image" />
            </div>)
            );
    }, [arrayImages, choiseImg]);

    
    return(
        <div className={arrayImages.length == 0 ? st.createFlashcardWrapper + " " + st.widthMainConteiner :  st.createFlashcardWrapper}>
            <div className={arrayImages.length ? st.imgPuzzle : st.imgPuzzle + ' ' + st.widthAutoPazzle} onClick={choisePhotoName}>
                {
                    isAddedWord ? <div className={st.succesAddedCard}>
                    <div className={st.conteiner}>
                        <span>Card succesfully added</span>
                    </div>
                    </div> : 
                    (arrayImages.length > 0 && deployPhotos) 
                }
                
            </div>
            <div className={st.form}>
                <form>
                    <input onBlur={getQueryInput} onInput={wordInputWriteDown} className={st.inputFlashCard} value={infoForm.word} type="text" placeholder="Word"/>
                    {isWordNotFound && <div className={st.wordNotFound}>Word not found</div>}
                    <div className={st.optionInputUrl}>
                        <label htmlFor="descriptonIn">Description<span>*</span></label>
                        <input onInput={descriptionInputWriteDown} className={st.inputFlashCardOption} value={infoForm.description} type="text" placeholder="Text" id="descriptonIn"/>
                        <label htmlFor="optionIN">url image <span>*</span></label>
                        <input onInput={urlInputWriteDown} className={st.inputFlashCardOption} value={infoForm.url} type="text" placeholder="URL" id="optionIN"/>
                    </div>
                    <button className={infoForm.word && (choiseImg || infoForm.url) ? st.addCard : st.addCard + ' ' + st.diactiveBt} onClick={addToFlashCards} type="button">Add to flashcards</button>
                </form>
            </div>
        </div>
    );
}


export default CreateFlashCards;