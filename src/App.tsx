import { Route, Routes } from 'react-router-dom';
import { Fragment } from 'react'
import './App.scss'
import Layout from './components/Layout/Layout';
import HomePage from './components/HomePage/HomePage';

const App:React.FC  = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}/>
        </Route>
      </Routes>
    </Fragment>
  )
}

export default App
