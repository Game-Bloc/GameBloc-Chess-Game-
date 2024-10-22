import { useAuth } from "@ic-reactor/react"
import {
    canisterId as canisterId2,
    createActor as createActor2,
    chess_gamebloc_backend,
} from "./../../declarations/chess_gamebloc_backend"

const Login = () => {
    const {
        login,
        logout,
        loginLoading,
        loginError,
        identity,
        authenticating,
        authenticated,
    } = useAuth({
        onAuthentication(authPromise) {
            console.log("🚀 ~ onAuthentication ~ Authenticating...")
            authPromise()
                .then((identity) => {
                    console.log(
                        "🚀 ~ onAuthentication ~ Authenticated as:",
                        identity.getPrincipal().toText()
                    )
                })
                .catch((error) => {
                    console.log("🚀 ~ onAuthentication ~ error:", error)
                })
        },
        onLogin(loginPromise) {
            console.log("🚀 ~ onLogin ~ Logging in...")
            loginPromise()
                .then((principal) => {
                    console.log("🚀 ~ onLogin ~ Logged in as:", principal.toText())
                })
                .catch((error) => {
                    console.log("🚀 ~ onLogin ~ error:", error)
                })
        },
        onLoggedOut() {
            console.log("🚀 ~ onLoggedOut ~ Logged out!")
        },
        onAuthenticationSuccess(identity) {
            console.log(
                "🚀 ~ onAuthenticationSuccess ~ identity:",
                identity.getPrincipal().toText()
            )
        },
        onAuthenticationFailure(error) {
            console.log("🚀 ~ onAuthenticationFailure ~ error:", error)
        },
        onLoginError(error) {
            console.log("🚀 ~ onLoginError ~ error:", error)
        },
        onLoginSuccess(principal) {
            console.log("🚀 ~ onLoginSuccess ~ Logged in as:", principal.toText())
        },
    })

    // from Gamebloc auth function

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


            console.log("Actor", actor2)
            setWhoamiActor(actor)
            setWhoamiActor2(actor2)
            setLedgerAcor(actor3)
            setIndexAcor(actor4)


            console.log("web socket status", _ws)

            setWs(_ws)
        } catch (err) {
            console.log("Error on auth:", err)
        }
    }

    // from Gamebloc auth function

    return (
        <div>
            <h2></h2>
            <div>
                {loginLoading && <div>Loading...</div>}
                {loginError ? <div>{loginError}</div> : null}

            </div>
            {authenticated ? (
                <div className="flex flex-col align-center">
                    <button onClick={() => logout()}>Logout</button>
                    {identity && <div>{identity.getPrincipal().toText()}</div>}
                </div>
            ) : (
                <div>
                    <button
                        onClick={() =>
                            login({
                                identityProvider: "https://identity.ic0.app",
                            })
                        }
                        disabled={authenticating}
                    >
                        Login
                    </button>
                </div>
            )}
        </div>
    )
}

export default Login