import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AgentProvider } from "@ic-reactor/react"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
import { canisterId } from "../../declarations/chess_gamebloc_backend"
import IcWebsocket ,{ generateRandomIdentity, createWsConfig } from "ic-websocket-js"

import { chess } from "../../declarations/chess"
import { profileContext } from './functions/context';
import { AuthProvider } from "./auth/use_auth_client.tsx"

// import { BrowserRouter as Router } from "react-router-dom";
const gatewayUrl = "ws://127.0.0.1:8080"
const icUrl = "http://127.0.0.1:3000";

const wsConfig = createWsConfig({
    canisterId: canisterId,
    canisterActor: chess,
    identity: generateRandomIdentity(),
    networkUrl: icUrl,
});

const ws = new IcWebSocket(gatewayUrl, undefined, wsConfig);

ws.onopen = () => {
    console.log("connected to the canister")
}

ws.onmessage = async (event) => {
    console.log("Received message:", event.data);

    const messageToSend = {
        text: event.data.text + "-pong",
    };
    ws.send(messageToSend);
};

ws.onclose = () => {
    console.log("Disconnected from the canister");
};

ws.onerror = (error) => {
    console.log("Error:", error);
};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
      <AgentProvider>
          <AuthProvider>
              <App />
          </AuthProvider>
      </AgentProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
);
