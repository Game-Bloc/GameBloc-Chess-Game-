import { useState } from 'react'
import React from 'react'
import App from './App'
import { ContextProfile, profileContext } from './functions/context'

const AppWrap = () => {

    const [profile] = useState<ContextProfile>({
        age: 0,
        principal: "",
        name: "Sukuna",
        count: 0,
        description: ""
      })
  return (
    <>
    <profileContext.Provider value={profile}>
        <App />
    </profileContext.Provider>
    </>
  )
}

export default AppWrap