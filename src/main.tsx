import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./css/main.css";
import App from "./App.tsx";
import store from "../src/state/store.ts";

createRoot(document.getElementById("root")!).render(
 <Provider store={store}>
  <StrictMode>
   <App />
  </StrictMode>
 </Provider>,
);

