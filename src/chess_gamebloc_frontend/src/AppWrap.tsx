import { useState } from 'react'
import React from 'react'
import ChessPage from './ChessPage'
import { ContextProfile, profileContext } from './functions/context'
import { useAuth } from './auth/use_auth_client'

interface AppWrapProp {}
const AppWrap = ({} : AppWrapProp) => {

  const { whoamiActor } = useAuth()
  const [actorsAct, setActor] = useState("")
  
  const [profile] = useState<ContextProfile>({
      age: 0,
      principal: "aaaaa-aa",
      name: "Sukuna",
      count: 0,
      description: ""
  })

  // const get_Player_Profile = () => {

  // }

  return (
    
    <profileContext.Provider value={profile}>
        <ChessPage />
    </profileContext.Provider>
  
  )
}

export default AppWrap