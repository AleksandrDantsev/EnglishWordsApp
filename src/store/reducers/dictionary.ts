import { createSlice } from "@reduxjs/toolkit/react";

interface IWordInfo {
    word: string;
    phonetic: string;
    phonetics: [];
    date: string;
    meanings: TDefinition[];
}
type TDefinition = {
    definitions: Array<{definition: string}>
};

type TInitialState = {
    dictionaryList: IWordInfo[]
};


const initialState: TInitialState = {
    dictionaryList: JSON.parse(localStorage.getItem("dictionary") || "[]"),
}


const dictionary = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        addWordToDictionary(state, action) {
            if (!state.dictionaryList.find(el => el.word == action.payload.word)) {
                state.dictionaryList.push(action.payload);
                localStorage.setItem("dictionary", JSON.stringify(state.dictionaryList));
            }
        },

        removeWordFromDictionary(state, action) {
            let result = JSON.parse(localStorage.getItem("dictionary") || "[]")
                        .filter((el: IWordInfo) => el.word != action.payload)
            state.dictionaryList = result;
            localStorage.setItem("dictionary", JSON.stringify(result));
        }
    }
});


export const { addWordToDictionary, removeWordFromDictionary } = dictionary.actions;
export default dictionary.reducer;