import { AuthClient } from "@dfinity/auth-client"
import React, { createContext, useContext, useEffect, useState } from "react"
import {
  canisterId as canisterId2,
  createActor as createActor2,
  chess_gamebloc_backend,
} from "../../../declarations/chess_gamebloc_backend"
import { ActorSubclass, SignIdentity } from "@dfinity/agent"

import { _SERVICE as _SERVICE2 } from "../../../declarations/chess_gamebloc_backend/chess_gamebloc_backend.did"

import { updateAuth } from "../redux/slice/authClient"

import { useNavigate } from "react-router-dom"

const AuthContext = React.createContext<{
  isAuthenticated: boolean
  login: any
  loginNFID: any
  logout: any
  authClient: any
  identity: any
  principal: any
  whoamiActor: ActorSubclass<_SERVICE> | null
}>({
  isAuthenticated: false,
  login: null,
  loginNFID: null,
  logout: null,
  authClient: null,
  identity: null,
  principal: null,
  whoamiActor: null,

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
  const [authClient, setAuthClient] = useState(null)
  const [identity, setIdentity] = useState(null)
  const [principal, setPrincipal] = useState(null)
  const navigate = useNavigate()

  const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<_SERVICE>>()
  // const [whoamiActor2, setWhoamiActor2] = useState<ActorSubclass<_SERVICE2>>()
  // const [ledgerActor, setLedgerAcor] = useState<ActorSubclass<_SERVICE3>>()
  // const [indexActor, setIndexAcor] = useState<ActorSubclass<_SERVICE4>>()

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client)
    })
  }, [])

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient)
        navigate("/dashboard")
      },
    })
  }

  function loginNFID  () {
    authClient.login({
      ...options.loginNFID,
      onSuccess: () => {
        updateClient(authClient)
      },
    })
  }

  async function updateClient(client) {
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
      console.log("indexId", indexId )

      const actor = createActor(canisterId, {
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

      const actor4 = createIndexActor(indexId, {
        agentOptions: {
          identity,
        },
      })
      console.log("Actor", actor2)
      setWhoamiActor(actor)


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
  }
}

// @ts-ignore
// @ts-ignore
/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

