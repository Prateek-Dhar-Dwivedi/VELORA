import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider
    clientId="151765883692-n1tr19l14nh9vq5sg7bugsokamcprrq2.apps.googleusercontent.com"
  >
    <App />
  </GoogleOAuthProvider>
);