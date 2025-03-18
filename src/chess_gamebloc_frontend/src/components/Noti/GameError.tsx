import React from 'react'
import { useNavigate } from 'react-router'
import warningerror from "../../../public/error.png"

const GameError = () => {

  const navigate = useNavigate()
  const navigateWS = () => {
    navigate("/ws")
  }
  return (
    <>
      <div className="errorImg">
        <img className='opacity-35 w-fit place-content-center' src={warningerror} alt="No Game Available" />
      </div>
      <div>
          <div className='flex item-center  justify-center space-x-3'>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer">Visit Example</a>
              <button onClick={navigateWS} className='bg-blue-500  text-white px-2 py-2 rounded-lg '>Create a Room</button>
              <button onClick={navigateWS} className='px-2 py-2 border-2 rounded-lg'>Join a Room</button>
          </div>
      </div>
    </>
  )
}

export default GameError
