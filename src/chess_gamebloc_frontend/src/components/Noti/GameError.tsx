import React from 'react'
import warningerror from "../../../public/error.png"

export const GameError = () => {
  return (
    <>
        <div className="errorImg">
            <img className='opacity-35 w-fit place-content-center' src={warningerror} alt="No Game Available" />
        </div>
        <div>
            <div className='flex item-center  justify-center space-x-3'>
                <button className='bg-blue-500  text-white px-2 py-2 rounded-lg '>Create a Room</button>
                <button className='px-2 py-2 border-2 rounded-lg'>Join a Room</button>
            </div>
        </div>
    </>
  )
}
