import React, { useEffect, StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { loadInitialData } from "./redux/actions/extra-actions";
import { Provider } from "react-redux";
import { MainRouter } from "./router";
import { store } from "./redux/store";
// import { TokenModal } from "./components/dialogs/TokenModal";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
// import { SETheme } from "./themes";
import CssBaseline from "@mui/material/CssBaseline";

import "./index.css";
import "@fontsource/open-sans";
import "@fontsource/roboto-mono";

// TODO: Do we want google analytics?
// import ReactGA from 'react-ga';
// import { gaID } from './__analytics__/ga.js';
// if (gaID) {
//     ReactGA.initialize(gaID);
// }

const App: React.FC = () => {
  useEffect(() => {
    // store.dispatch(loadInitialData());
  }, []);

  return (
    <>
      <MainRouter />
      {/* <TokenModal /> */}
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider theme={createTheme(/*SETheme*/ {})}>
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
