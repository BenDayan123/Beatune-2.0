import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import WindowBar from "./windowBar";
import App from "./App";
import { ThemeProvider } from "./hooks/useTheme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider>
      {window?.__TAURI_METADATA__ && <WindowBar />}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
