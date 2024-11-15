import { useState } from 'react'
import React from 'react'
import ChessPage from './ChessPage'
import { ContextProfile, profileContext } from './functions/context'
import { useAuth } from './auth/use_auth_client'

interface AppWrapProp {}
const AppWrap = ({} : AppWrapProp) => {

  const { whoamiActor } = useAuth()
  const actorsAct = whoamiActor?.get_player
  
  const [profile] = useState<ContextProfile>({
      age: 0,
      principal: "Softwork",
      name: "Sukuna",
      count: 0,
      description: ""
  })

  const get_Player_Profile = async () => {
    
  }

  return (
    
    <profileContext.Provider value={profile}>
        <ChessPage />
    </profileContext.Provider>
  
  )
}

export default AppWrap