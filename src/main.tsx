import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CounterContextProvider from "./context/counterContext.tsx";
import AuthContextProvider from "./context/AuthContext.tsx";
import UserContextProvider from "./context/UserContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <CounterContextProvider>
          <App />
        </CounterContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
