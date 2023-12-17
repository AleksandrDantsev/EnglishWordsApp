import React, { memo, useState , useEffect} from "react";
import st from "./AddToDictionaryButton.module.scss";
import { addWordToDictionary } from "../../store/reducers/dictionary";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxToolkit";

interface IDataFromTranslator {
    data: TInfoMeanings;
}

type TInfoMeanings = {
    word: string;
    phonetic: string;
    phonetics: [];
    meanings: [];
}

const AddToDictionaryButton:React.FC<IDataFromTranslator> = memo(({data}) => {
    const [isAddedDict, setIsAddedDict] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const collectionAddedInDictionary = useAppSelector(state => state.dictionary.dictionaryList); 

    useEffect(() => {
        setIsAddedDict(Boolean(collectionAddedInDictionary.find(el => el.word == data.word)));
    }, [data])

    const addToDictionary = () => {
        dispatch(addWordToDictionary(data));
        setIsAddedDict(true);
    } 

    return(
        <div onClick={addToDictionary} className={st.addToDict}>
            <div className={st.addToDictWrapper} title="Add to dictionary">
            {
            isAddedDict ? 
            <svg width="30px" 
            height="30px" 
            viewBox="0 0 23 22" 
            version="1.1" 
            fill="#000000"><g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round">
            </g><g><g id="🔍-System-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g fill="#4d4c4c" fillRule="nonzero"> <path d="M18.7559,3 C19.9985,3 21.0059,4.00736 21.0059,5.25 L21.0059,18.75 C21.0059,19.9926 19.9985,21 18.7559,21 L5.25586,21 C4.01322,21 3.00586,19.9926 3.00586,18.75 L3.00586,5.25 C3.00586,4.00736 4.01322,3 5.25586,3 L18.7559,3 Z M18.7559,4.5 L5.25586,4.5 C4.84165,4.5 4.50586,4.83579 4.50586,5.25 L4.50586,18.75 C4.50586,19.1642 4.84165,19.5 5.25586,19.5 L18.7559,19.5 C19.1701,19.5 19.5059,19.1642 19.5059,18.75 L19.5059,5.25 C19.5059,4.83579 19.1701,4.5 18.7559,4.5 Z M16.2803,8.71968 C16.5732,9.01258 16.5732,9.48746 16.2803,9.78034 L11.2803,14.7801 C10.9874,15.073 10.5125,15.073 10.2197,14.7801 L8.21586,12.7763 C7.92297,12.4834 7.92297,12.0085 8.21586,11.7157 C8.50875,11.4228 8.98363,11.4228 9.27652,11.7157 L10.75,13.1891 L15.2197,8.71966 C15.5126,8.42677 15.9874,8.42678 16.2803,8.71968 Z" > </path> </g> </g> </g></svg>
             :
            <svg width="30px" height="30px" 
                viewBox="0 0 24 24" 
                version="1.1"
                fill="#343232" 
                stroke="#343232">
                <g strokeWidth="0"></g><g strokeLinecap="round" strokeLinejoin="round">
                </g><g><g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="ic_fluent_dictionary_24_regular" fill="#454545" fillRule="nonzero">
                <path d="M18,2 C19.3807,2 20.5,3.11929 20.5,4.5 L20.5,18.75 C20.5,19.1642 20.1642,19.5 19.75,19.5 L5.5,19.5 C5.5,20.0523 5.94772,20.5 6.5,20.5 L19.75,20.5 C20.1642,20.5 20.5,20.8358 20.5,21.25 C20.5,21.6642 20.1642,22 19.75,22 L6.5,22 C5.11929,22 4,20.8807 4,19.5 L4,4.5 C4,3.11929 5.11929,2 6.5,2 L18,2 Z M18,3.5 L6.5,3.5 C5.94772,3.5 5.5,3.94772 5.5,4.5 L5.5,18 L19,18 L19,4.5 C19,3.94772 18.5523,3.5 18,3.5 Z M16,5 C16.5523,5 17,5.44772 17,6 L17,8 C17,8.55228 16.5523,9 16,9 L8,9 C7.44772,9 7,8.55228 7,8 L7,6 C7,5.44772 7.44772,5 8,5 L16,5 Z M15.5,6.5 L8.5,6.5 L8.5,7.5 L15.5,7.5 L15.5,6.5 Z"> </path> </g> </g> </g></svg>      
            }
            </div>
        </div>
    );
})


export default AddToDictionaryButton;