import { AuthClient } from "@dfinity/auth-client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { canisterId, chess, createActor } from "../../../declarations/chess"
import { canisterId as KitchenCanisterId, createActor as kitchenActor, Chess_Kitchen } from "../../../declarations/Chess_Kitchen"
import IcWebSocket from "ic-websocket-js"
import { Actor, ActorSubclass, SignIdentity } from "@dfinity/agent"
import { _SERVICE, _SERVICE as ActorService, AppMessage } from "../../../declarations/chess/chess.did"
import { _SERVICE as KitchenService, AppMessage as kitc } from "../../../declarations/Chess_Kitchen/Chess_Kitchen.did"
import { useAppDispatch } from "../redux/hooks"
import { updateAuth } from "../redux/slice/authClient"
import { useNavigate } from "react-router-dom"
import {isAnyOf} from "@reduxjs/toolkit";
import { gatewayUrl, icUrl, localGatewayUrl, localICUrl } from "../utils/ws"

const AuthContext = React.createContext<{
  isAuthenticated: boolean
  login: any
  loginNFID: any
  logout: any
  authClient: any
  identity: any
  principal: any
  whoamiActor: ActorSubclass<ActorService> | null
  whoamiActor1: ActorSubclass<KitchenService> | null
  ws: IcWebSocket<ActorService, AppMessage> | null
}>({
  isAuthenticated: false,
  login: null,
  loginNFID: null,
  logout: null,
  authClient: null,
  identity: null,
  principal: null,
  whoamiActor: null,
  ws: null,
  whoamiActor1: null
})
const network = process.env.DFX_NETWORK || "local"
const APPLICATION_NAME = "chess_gamebloc"
const APPLICATION_LOGO_URL = "https://i.postimg.cc/zBMQpTJn/Asset-51.png"

const AUTH_PATH =
  "/authenticate/?applicationName=" +
  APPLICATION_NAME +
  "&applicationLogo=" +
  APPLICATION_LOGO_URL +
  "#authorize"


const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider:
        process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : process.env.LOCAL_II_CANISTER,
  },
  loginNFID: {
    identityProvider:
        process.env.DFX_NETWORK === "ic"
            ? "https://nfid.one" + AUTH_PATH
            : "https://nfid.one" + AUTH_PATH,
  },
}

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
*/
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authClient, setAuthClient] = useState<AuthClient | null>(null)
  const [identity, setIdentity] = useState(null)
  const [principal, setPrincipal] = useState(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [ ws, setWs ] = useState<IcWebSocket<_SERVICE, AppMessage> | null>(null)   // i applied any here instead of '_SERVICE'
  const [whoamiActor, setWhoamiActor] = useState<any>()
  const [whoamiActor1, setWhoamiActor1] = useState<any>()

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client); // this is the issue - relating to other things too
      
    })
  }, [])

  const login = () => {
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient)
        navigate("/landingPage")
      },
    })
  }



  const loginNFID = () => {

    authClient?.login({
      ...options.loginNFID,
      onSuccess: () => {
        updateClient(authClient)
        navigate("/landingPage")
      },
    })
  }

  async function updateClient(client:any) {
    try {
      const isAuthenticated = await client.isAuthenticated()
      // console.log("isAuthenticated", isAuthenticated);
      
      setIsAuthenticated(isAuthenticated)

      const identity = client.getIdentity()
      setIdentity(identity)
      console.log("identity", identity)
      const principal = identity.getPrincipal()

      setPrincipal(principal)
      console.log("Principal", principal)
      setAuthClient(client)

      console.log("canisterId", canisterId )
      

      const actor  = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      })

      const actor2 = kitchenActor(KitchenCanisterId, {
        agentOptions: {
          identity,
        },
      })

      console.log("KitchenActor", actor2);
      setWhoamiActor1(actor2)
      
    
      console.log("Actor", actor)
      setWhoamiActor(actor);

      const _ws = new IcWebSocket(
        network === "local" ? localGatewayUrl : gatewayUrl,
        undefined,
        {
          canisterId: canisterId,
          canisterActor: Chess_Kitchen,
          identity: identity as SignIdentity,
          networkUrl: network === "local" ? localICUrl : icUrl,
        },
      );

      // _ws.onopen = () => {
      //   console.log(
      //     "WebSocket state:",
      //     _ws.readyState,
      //     "is open:",
      //     _ws.readyState === _ws.OPEN,
      //   )
      // }

      // console.log("web socket status", _ws)

      // setWs(_ws)
      
    } catch (err) {
      console.log("Error on auth:", err)
    }
  }

  async function logout() {
    await authClient?.logout()
    await updateClient(authClient)
    sessionStorage.setItem("userState", "false")
  }

  return {
    isAuthenticated,
    login,
    loginNFID,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
    whoamiActor1,
    ws,
  }
}


/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }:any) => {
  const auth = useAuthClient()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
