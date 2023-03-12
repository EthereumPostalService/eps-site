import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const widgetDivs = document.querySelectorAll(
  ".eth-mail-widget"
) as NodeListOf<HTMLElement>;

widgetDivs.forEach((div) => {
  const root = ReactDOM.createRoot(div);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});