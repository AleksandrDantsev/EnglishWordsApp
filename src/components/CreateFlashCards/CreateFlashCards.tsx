import React, { useState, useMemo, useEffect } from "react";
import st from "./CreateFlashCards.module.scss";
import axios from "axios";
import { useAppDispatch } from "../../hooks/reduxToolkit";
import { addFlasCard } from "../../store/reducers/flashcards";
import PaginationCard from "../../UI/PaginationCard/PaginationCard";

const KEY = "468Q8bMOgOGEE83ah-aDyPEulZLkL2xJoCUTexnRBFs";

type FlashCardList = {
    word: string;
    url: string;
    description: string;
};

type TSearchCatPhoto = {
    urls: {
        regular: string;
    };
}


const CreateFlashCards:React.FC = () => {
    const [arrayImages, setArrayImages] = useState<string[]>([]);
    const [choiseImg, setChoiseImg] = useState<string>('');
    const [infoForm, setInfoForm] = useState<FlashCardList>({word: '', url: '', description: ''});
    const [isAddedWord, setIsAddedWord] = useState<boolean>(false);
    const [isWordNotFound, setIsWordNotFound] = useState(false);
    const [numberPage, setNumberPage] = useState<number>(1);
    const dispatch = useAppDispatch();
    


    const getQueryInput = async () => {
        setIsWordNotFound(false);
        try {
            const word = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${infoForm.word.toLowerCase().trim()}`)
            .then(data => data.data[0]);
            if (word) {
                getPictures();
                setNumberPage(1);
                console.log("rer")
            }
            setIsAddedWord(false);
        }
        catch(err) {
            setIsWordNotFound(true);
        }

    }

    const getPictures = async () => {
        try {
            console.log(infoForm.word)
            await axios.get(`https://api.unsplash.com/search/photos?per_page=12&page=${numberPage}&query=${infoForm.word.toLowerCase().trim()}&client_id=${KEY}`)
            .then(data => {
                setArrayImages(data.data.results.map((el: TSearchCatPhoto) => el.urls.regular))
                console.log(arrayImages)
            })
            .catch(() => console.log("error search"))
        }
        catch(err) {
            console.log("err")
        }
        }
    
    useEffect(() => {
        if (arrayImages.length) getPictures();
    }, [numberPage])

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
    }

    const deployPhotos = useMemo(() => {
        return (
            arrayImages.map((el, i) => 
            <div key={el+i} className={st.imgPazzleUnit}>
                <img className={choiseImg == el ? st.activeImage : (Boolean(choiseImg) ? st.blurImage : '')} src={el} alt="Image" />
            </div>)
            );
    }, [arrayImages, choiseImg, numberPage]);

    const qunatityElemsInSearch = () => {
        if (arrayImages.length < 12 && numberPage == 0) return 12;
        return +numberPage * 12 + 12 < 61 ? +numberPage * 12 + 12 : 60;
    }

    
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
                {
                arrayImages.length > 0 && 
                <div className={st.navBarPhotos}>
                    <PaginationCard quantityWordsOnPage={12} 
                                    quantityElems={qunatityElemsInSearch()} 
                                    numberPage={numberPage} 
                                    setNumberPage={setNumberPage} 
                                    type={"photo"}/>
                </div>
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