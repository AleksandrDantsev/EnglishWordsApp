import { configureStore } from '@reduxjs/toolkit'
import dictionary from './reducers/dictionary'; 
import flashcards from './reducers/flashcards';

const store = configureStore({
    reducer: {
      dictionary,
      flashcards
    },
  })

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

export default store;