import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

// Seeing 2 API calls because of StrictMode
// https://medium.com/@yaseen-kc/why-is-my-api-call-happening-twice-in-react-d9dc06dec962
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
