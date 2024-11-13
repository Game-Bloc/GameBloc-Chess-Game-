import { useState } from 'react'
import React from 'react'
import ChessPage from './ChessPage'
import { ContextProfile, profileContext } from './functions/context'


interface AppWrapProp {}
const AppWrap = ({} : AppWrapProp) => {

    const [profile] = useState<ContextProfile>({
        age: 0,
        principal: "Softwork",
        name: "Sukuna",
        count: 0,
        description: ""
      })
  return (
    <>
    <profileContext.Provider value={profile}>
        <ChessPage />
    </profileContext.Provider>
    </>
  )
}

export default AppWrap