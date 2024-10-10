import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AgentProvider } from "@ic-reactor/react"
import { Provider } from "react-redux"
import store from "./redux/store"
import { AuthProvider } from "./auth/use_auth_client.tsx"

import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
      <AgentProvider>
          <AuthProvider>
              <App />
          </AuthProvider>
      </AgentProvider>
      </Provider>
  </React.StrictMode>,
);
