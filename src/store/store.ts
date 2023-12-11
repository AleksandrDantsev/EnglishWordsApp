import { configureStore } from '@reduxjs/toolkit'
import dictionary from './reducers/dictionary'; 

const store = configureStore({
    reducer: {
      dictionary
    },
  })

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;

export default store;