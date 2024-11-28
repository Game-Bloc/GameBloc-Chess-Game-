import { useState } from 'react'
import React from 'react'
import ChessPage from './ChessPage'
import { ContextProfile, profileContext } from './functions/context'
import { useAuth } from './auth/use_auth_client'


interface AppWrapProp {}
const AppWrap = ({} : AppWrapProp) => {

  // const playersUsers = async () => {
  //   try {
  //     const userPlayer = await whoamiActor?.update_player_profile(
        
  //     )
  //   } catch (error) {
      
  //   }
  // }
  
  const [profile] = useState<ContextProfile>({
    age: 20,
    principal: "pgxil-f2rpy-neu2v-jb4m7-lvlee-vjvqy-ocpe7-rfohg-tujw3-lhz2l-tae",
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