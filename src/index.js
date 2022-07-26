import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { GitProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
// dev-qnh9xz1v.us.auth0.com
// PaBPUQAQeyDUztoeU1pjL7J5GJecnTCm

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-qnh9xz1v.us.auth0.com"
      clientId="PaBPUQAQeyDUztoeU1pjL7J5GJecnTCm"
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
      // we are using this settings for our social media logins. if we login using 
      // social media, aut0 will not save our user name and password
    >
      <GitProvider>
        <App />
      </GitProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
