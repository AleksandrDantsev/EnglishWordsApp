import { Route, Routes } from 'react-router-dom';
import { lazy } from "react";
import { Fragment } from 'react'
import './App.scss'
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
// const Menu = lazy(() => import("./components/Menu/Menu"));
// const Translator = lazy(() => import("./components/Translator/Translator"));
import Menu from './components/Menu/Menu';
import Translator from './components/Translator/Translator';
import FlashCards from './components/FlashCards/FlashCards';
import CreateFlashCards from './components/CreateFlashCards/CreateFlashCards';
import Dictionary from './components/Dictionary/Dictionary';

const App:React.FC  = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="menuApp" element={<Menu />}/>
          <Route path="translator" element={<Translator />}/>
          <Route path="flashcards" element={<FlashCards />}/>
          <Route path="createflashcards" element={<CreateFlashCards />}/>
          <Route path="dictionary" element={<Dictionary />}/>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
