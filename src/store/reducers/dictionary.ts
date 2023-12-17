import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface IWordInfo {
    word: string;
    phonetic: string;
    phonetics: [];
    meanings: TDefinition[];
}
type TDefinition = {
    definitions: Array<{definition: string}>
};

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
            if (!state.dictionaryList.find(el => el.word == action.payload.word)) {
                state.dictionaryList.push(action.payload);
            }
        },
    }
});


export const { addWordToDictionary } = dictionary.actions;
export default dictionary.reducer;