import React from 'react'
import { Routes, Route } from "react-router-dom"
import ChessPage from './ChessPage'
import LandingPage from './LandingPage'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/landingPage' element={<ChessPage />} />
      </Routes>
    </div>
  )
}


export default App
