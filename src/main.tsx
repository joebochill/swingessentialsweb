import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
// import { loadInitialData } from "./redux/actions/extra-actions";
import { Provider } from "react-redux";
import { MainRouter } from "./router/MainRouter";
import { store } from "./redux/store";
// import { TokenModal } from "./components/dialogs/TokenModal";

import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
// import { SETheme } from "./themes";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/600.css";
import { SwingEssentialsTheme } from "./theme/SwingEssentialsTheme";
import { initializeData } from "./redux/thunks";
import { TokenModal } from "./components/dialogs/TokenModal";

// TODO: Do we want google analytics?
// import ReactGA from 'react-ga';
// import { gaID } from './__analytics__/ga.js';
// if (gaID) {
//     ReactGA.initialize(gaID);
// }

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(initializeData());
  }, []);

  return (
    <>
      <MainRouter />
      {/* TODO */}
      <TokenModal />
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  // TODO Add a theme toggle
  <ThemeProvider defaultMode="light" theme={SwingEssentialsTheme}>
    <CssBaseline />
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <App />
      </Provider>
    </LocalizationProvider>
  </ThemeProvider>
  // </StrictMode>
);

// TODO Do we want to add a service worker?
