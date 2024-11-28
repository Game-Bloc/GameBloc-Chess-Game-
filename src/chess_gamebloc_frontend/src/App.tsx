import React from 'react'
import { Routes, Route } from "react-router-dom"
import ChessPage from './ChessPage'
import LandingPage from './LandingPage'
import UserInputForm from './UserInputForm'
import UserInputWrap from './UserInputWrap'
import Game from './Game'
import CurvedTextApp from './CurvedText'
import AppWrap from './AppWrap'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/landingPage' element={<UserInputWrap />} />
        <Route path='/game' element={<AppWrap />} />
      </Routes>
    </div>
  )
}


export default App
