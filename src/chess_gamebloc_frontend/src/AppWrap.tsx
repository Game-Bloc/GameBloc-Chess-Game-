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
      principal: "ifuh5-cjwm6-kngda-3cczv-pafa4-sedqe-qqej7-d4zzm-udp2v-7r4bc-bae",
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