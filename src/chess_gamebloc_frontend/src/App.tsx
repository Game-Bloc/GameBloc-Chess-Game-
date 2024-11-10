import React from 'react'
import { Routes, Route } from "react-router-dom"
import ChessPage from './ChessPage'
import LandingPage from './LandingPage'
import UserInputForm from './UserInputForm'
import Game from './Game'
import CurvedTextApp from './CurvedText'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<CurvedTextApp />} />
        <Route path='/landingPage' element={<UserInputForm />} />
        <Route path='/game' element={<ChessPage />} />
      </Routes>
    </div>
  )
}


export default App
