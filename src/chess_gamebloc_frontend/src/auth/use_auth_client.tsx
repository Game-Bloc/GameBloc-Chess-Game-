import { AuthClient } from "@dfinity/auth-client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { canisterId, createActor } from "../../../declarations/chess"
import {
  canisterId as canisterId2,
  createActor as createActor2,
  chess,
} from "../../../declarations/chess"
import {
  canisterId as ledgerId,
  createActor as createLedgerActor,
} from "../../../declarations/chess"
import { Actor, ActorSubclass, SignIdentity } from "@dfinity/agent"
import { _SERVICE } from "../../../declarations/chess/chess.did"
// import { _SERVICE as _SERVICE2 } from "../../../declarations/game_bloc_backend/game_bloc_backend.did"
// import { _SERVICE as _SERVICE3 } from "../../../declarations/icp_ledger/icp_ledger.did"
// import { _SERVICE as _SERVICE4 } from "../../../declarations/icp_index/icp_index.did"
// import {
//   gatewayUrl,
//   icUrl,
//   localGatewayUrl,
//   localICUrl,
// } from "../components/utils/ws"
import { useAppDispatch } from "../redux/hooks"
import { updateAuth } from "../redux/slice/authClient"
// import IcWebSocket from "ic-websocket-js"
// import {
//   canisterId as indexId,
//   createActor as createIndexActor,
// } from "../../../declarations/icp_index"
import { useNavigate } from "react-router-dom"
import {isAnyOf} from "@reduxjs/toolkit";

const AuthContext = React.createContext<{
  isAuthenticated: boolean
  login: any
  loginNFID: any
  logout: any
  authClient: any
  identity: any
  principal: any
  // ws: IcWebSocket<_SERVICE, AppMessage> | null
  whoamiActor: ActorSubclass<_SERVICE> | null | undefined
  // whoamiActor2: ActorSubclass<_SERVICE2> | null
  // ledgerActor: ActorSubclass<_SERVICE3> | null
  // indexActor: ActorSubclass<_SERVICE4> | null
}>({
  isAuthenticated: false,
  login: null,
  loginNFID: null,
  logout: null,
  authClient: null,
  identity: null,
  principal: null,
  // ws: null,
  whoamiActor: null,
  // whoamiActor2: null,
  // ledgerActor: null,
  // indexActor: null,
})
const network = process.env.DFX_NETWORK || "local"
const APPLICATION_NAME = "GameBloc"
const APPLICATION_LOGO_URL = "https://i.postimg.cc/zBMQpTJn/Asset-51.png"

//127.0.0.1:4943/?canisterId=bkyz2-fmaaa-aaaaa-qaaaq-cai

const AUTH_PATH =
    "/authenticate/?applicationName=" +
    APPLICATION_NAME +
    "&applicationLogo=" +
    APPLICATION_LOGO_URL +
    "#authorize"

// @ts-ignore
// @ts-ignore
// @ts-ignore
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
  // const navigate = useNavigate()
  const dispatch = useAppDispatch()
  // const [ws, setWs] = useState<IcWebSocket<_SERVICE, AppMessage> | null>(null)
  const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<_SERVICE>>()
  // const [whoamiActor2, setWhoamiActor2] = useState<ActorSubclass<_SERVICE2>>()
  // const [ledgerActor, setLedgerAcor] = useState<ActorSubclass<_SERVICE3>>()
  // const [indexActor, setIndexAcor] = useState<ActorSubclass<_SERVICE4>>()

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      setAuthClient(client); // this is the issue - relating to other things too
      updateClient(client)
    })
  }, [])

  const login = () => {
    authClient?.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient)
        // navigate("/dashboard")
      },
    })
  }



  const loginNFID = () => {

    authClient?.login({
      ...options.loginNFID,
      onSuccess: () => {
        updateClient(authClient)
        // navigate("/dashboard")
      },
    })
  }

  async function updateClient({client}:any) {
    try {
      const isAuthenticated = await client.isAuthenticated()
      setIsAuthenticated(isAuthenticated)

      const identity = client.getIdentity()
      setIdentity(identity)
      // console.log("identity", identity)
      const principal = identity.getPrincipal()

      setPrincipal(principal)
      console.log("Principal", principal)
      setAuthClient(client)

      console.log("canisterId", canisterId )
      console.log("canisterId2", canisterId2 )
      console.log("ledgerId", ledgerId )
      // console.log("indexId", indexId )

      const actor  = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      })


      const actor2 = createActor2(canisterId2, {
        agentOptions: {
          identity,
        },
      })

      const actor3 = createLedgerActor(ledgerId, {
        agentOptions: {
          identity,
        },
      })

      // actor.update()
      // const actor4 = createIndexActor(indexId, {
      //   agentOptions: {
      //     identity,
      //   },
      // })
      console.log("Actor", actor2)
      setWhoamiActor(actor);
      // actor3.update({
      //   "",
      //   "",
      //   2,
      //   4,
      //   6,
      //   "",
      //   ""
      // })
      // setWhoamiActor2(actor2)
      // setLedgerAcor(actor3)
      // setIndexAcor(actor4)

      // const _ws = new IcWebSocket(
      //     network === "local" ? localGatewayUrl : gatewayUrl,
      //     undefined,
      //     {
      //       canisterId: canisterId,
      //       canisterActor: kitchen,
      //       identity: identity as SignIdentity,
      //       networkUrl: network === "local" ? localICUrl : icUrl,
      //     },
      // )

      // _ws.onopen = () => {
      //   console.log(
      //       "WebSocket state:",
      //       ws.readyState,
      //       "is open:",
      //       ws.readyState === ws.OPEN,
      //   )
      // }
      //
      // console.log("web socket status", _ws)
      //
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
    // ws,
    whoamiActor,
    // whoamiActor2,
    // ledgerActor,
    // indexActor,
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
