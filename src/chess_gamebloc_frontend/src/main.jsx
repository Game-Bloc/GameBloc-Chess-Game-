import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { AgentProvider } from "@ic-reactor/react"

import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AgentProvider>
        <App /> 
      </AgentProvider>
  </React.StrictMode>,
);
