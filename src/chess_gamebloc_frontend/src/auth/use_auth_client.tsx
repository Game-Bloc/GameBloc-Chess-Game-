import { AuthClient } from "@dfinity/auth-client"
import React, { createContext, useContext, useEffect, useState } from "react"
import { canisterId, createActor } from "../../../declarations/chess_gamebloc_backend"
import {
  canisterId as canisterId2,
  createActor as createActor2,
  chess_gamebloc_backend,
} from "../../../declarations/chess_gamebloc_backend"
import {
  canisterId as ledgerId,
  createActor as createLedgerActor,
} from "../../../declarations/chess_gamebloc_backend"
import { Actor, ActorSubclass, SignIdentity } from "@dfinity/agent"
import { _SERVICE } from "../../../declarations/chess_gamebloc_backend/chess_gamebloc_backend.did"
import { useAppDispatch } from "../redux/hooks"
import { updateAuth } from "../redux/slice/authClient"
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
  whoamiActor: ActorSubclass<_SERVICE> | null | undefined
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
  const [whoamiActor, setWhoamiActor] = useState<ActorSubclass<_SERVICE>>()

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      setAuthClient(client); // this is the issue - relating to other things too
      
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

      console.log("Actor", actor2)
      setWhoamiActor(actor);
      
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


/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }:any) => {
  const auth = useAuthClient()

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
