import { createSlice } from "@reduxjs/toolkit/react";

interface IWordInfo {
    word: string;
    phonetic: string;
    phonetics: [];
    meanings: [];
}

type TInitialState = {
    dictionaryList: IWordInfo[]
};


const initialState: TInitialState = {
    dictionaryList: [],
}



const dictionary = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        addWordToDictionary(state, action) {
            if (!state.dictionaryList.find(el => el.word == action.payload)) {
                state.dictionaryList.push(action.payload);
            }
        },

    }
});


export const { addWordToDictionary } = dictionary.actions;
export default dictionary.reducer;