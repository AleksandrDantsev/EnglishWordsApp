import { Route, Routes } from 'react-router-dom';
import { lazy } from "react";
import { Fragment } from 'react'
import './App.scss'
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';
const Menu = lazy(() => import("./components/Menu/Menu"));

const App:React.FC  = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}/>
          <Route path="menuApp" element={<Menu />}/>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
