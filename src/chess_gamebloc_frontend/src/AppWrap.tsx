import { useState } from 'react'
import React from 'react'
import ChessPage from './ChessPage'
import { ContextProfile, profileContext } from './functions/context'
import { useAuth } from './auth/use_auth_client'

interface AppWrapProp {}
const AppWrap = ({} : AppWrapProp) => {

  const { whoamiActor } = useAuth()
  const [actorsAct, setActor] = useState("")

  // const playersUsers = async () => {
  //   try {
  //     const userPlayer = await whoamiActor?.update_player_profile(
        
  //     )
  //   } catch (error) {
      
  //   }
  // }
  
  const [profile] = useState<ContextProfile>({
      age: 20,
      principal: "ifuh5-cjwm6-kngda-3cczv-pafa4-sedqe-qqej7-d4zzm-udp2v-7r4bc-bae",
      name: "Sukuna",
      count: 0,
      description: "Still checking"
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