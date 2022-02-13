import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/common.css";
import AppRoutes from "./routes";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  return (
    <Router>
      <Auth0Provider
        domain="dev-9l0gujem.us.auth0.com"
        clientId="DpJ0lO987zvh4tQ0sGmJ4T9TqfQF8RSa"
        redirectUri={window.location.origin}
      >
        <AppRoutes />
      </Auth0Provider>
    </Router>
  );
}

export default App;
