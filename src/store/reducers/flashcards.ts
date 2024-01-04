import { createSlice } from "@reduxjs/toolkit/react";

type FlashCardList = {
    word: string;
    image: string;
    description: string;
    imageChoise: string;
    url?: string;
};

type list = {
    listCard: FlashCardList[];
}

const initialState: list = {
    listCard: JSON.parse(localStorage.getItem("flashCards") || "[]"),
}



const flashcards = createSlice({
    name: 'dictionary',
    initialState, 
    reducers: {
        addFlasCard(state, action) {
            if (!state.listCard.find((el: FlashCardList) => el.word == action.payload.word)) {
                state.listCard.push(action.payload);
                localStorage.setItem("flashCards", JSON.stringify(state.listCard));
            }
        }
    }
});

export const { addFlasCard } = flashcards.actions;
export default flashcards.reducer;