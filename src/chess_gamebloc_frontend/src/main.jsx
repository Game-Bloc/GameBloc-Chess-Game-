import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AgentProvider } from "@ic-reactor/react"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"
// import { ProfileProvider } from './UserInputWrap';
import { profileContext } from './functions/context';
import { AuthProvider } from "./auth/use_auth_client.tsx"

// import { BrowserRouter as Router } from "react-router-dom";


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
