import { createSlice } from "@reduxjs/toolkit/react";

type FlashCardList = {
    word: string;
    image: string;
    description: string;
    imageChoise: string;
};

type list = {
    listCard: FlashCardList[];
}

const initialState: list = {
    listCard: [],
}

const flashcards = createSlice({
    name: 'dictionary',
    initialState, 
    reducers: {
        addFlasCard(state, action) {
            if (!state.listCard.find((el: FlashCardList) => el.word == action.payload.word)) {
                state.listCard.push(action.payload)
            }
        }
    }
});

export const { addFlasCard } = flashcards.actions;
export default flashcards.reducer;