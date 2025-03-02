import React, { JSX, useEffect } from "react";
import { ROUTES } from "../constants/routes";
import { usePrevious } from "../hooks";
// import { useSelector } from "react-redux";
// import { AppState } from "../__types__";
// import { PrivateRoute } from "../components/navigation/PrivateRoute";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { NavigationDrawer } from "../components/navigation/drawer";
import { Toolbar } from "../components/toolbars/Toolbar";
import { Footer } from "../components/toolbars/Footer";
import {
  //   LessonsPage,
  LandingPage,
  //   ProsPage,
  //   TipsPage,
  //   BlogsPage,
  //   LoginPage,
  //   VerifyEmailPage,
  //   ResetPasswordPage,
  //   TermsPage,
  //   PrivacyPage,
  //   ProfilePage,
  //   PackagesPage,
  //   SubmitPage,
  //   AdminPage,
} from "../pages/LandingPage";

const ScrollToTop = (): any => {
  const { pathname } = useLocation();
  const previousPath = usePrevious(pathname);

  useEffect(() => {
    if (
      pathname.split("/")[1] !== previousPath?.split("/")[1] ||
      pathname.split("/")[1] === "legal"
    ) {
      window.scrollTo(0, 0);
    }
  }, [pathname, previousPath]);

  return null;
};

export const MainRouter = (): JSX.Element => {
  const token = ""; //useSelector((state: AppState) => state.auth.token);
  const admin = false; //useSelector((state: AppState) => state.auth.admin);
  const loggedIn = false; //token !== null;
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toolbar />
      <Routes>
        <Route path={`${ROUTES.HOME}`} element={<LandingPage />} />
        {/* <Route path={`${ROUTES.LOGIN}`} element={<LoginPage/>} />
        <Route path={`${ROUTES.PROS}`} element={<ProsPage/>} />
        <Route path={`${ROUTES.BLOG}/:id?`} element={<BlogsPage/>} />
        <Route path={`${ROUTES.TIPS}/:id?`} element={<TipsPage/>} /> */}
        {/* <PrivateRoute
          path={`${ROUTES.LESSONS}/:id?`}
          component={LessonsPage}
          canActivate={loggedIn}
        />
        <PrivateRoute
          path={`${ROUTES.PROFILE}`}
          component={ProfilePage}
          canActivate={loggedIn}
        />
        <PrivateRoute
          path={`${ROUTES.ORDER}`}
          component={PackagesPage}
          canActivate={loggedIn}
        />
        <PrivateRoute
          path={`${ROUTES.SUBMIT}`}
          component={SubmitPage}
          canActivate={loggedIn}
        />

        <Route path={`${ROUTES.REGISTER}/:key`} element={<VerifyEmailPage/>} />
        <Route path={`${ROUTES.RESET}/:key`} element={<ResetPasswordPage/>} />

        <Route path={`${ROUTES.TERMS}`} element={<TermsPage/>} />
        <Route path={`${ROUTES.PRIVACY}`} element={<PrivacyPage/>} />

        <PrivateRoute
          path={`${ROUTES.ADMIN}`}
          component={AdminPage}
          canActivate={admin}
        /> */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <NavigationDrawer />
    </BrowserRouter>
  );
};
