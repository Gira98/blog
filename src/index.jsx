import "@ant-design/v5-patch-for-react-19";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./components/App";

import { Provider } from "react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </StrictMode>,
);
