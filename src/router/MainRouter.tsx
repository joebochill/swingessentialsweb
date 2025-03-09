import { ReactNode } from "react";
import { ROUTES } from "../constants/routes";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationToolbar } from "../components/toolbars/NavigationToolbar";
import { Footer } from "../components/toolbars/Footer";
import {
  LandingPage,
  LoginPage,
  ProsPage,
  TermsPage,
  PrivacyPage,
  VerifyEmailPage,
  ResetPasswordPage,
  ProfilePage,
  TipsPage,
} from "../pages";
import { ScrollToTop } from "./ScrollToTop";
import { NavigationDrawer } from "../components/navigation/NavigationDrawer";
import { PrivateRoute } from "../components/navigation/PrivateRoute";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const MainRouter = (): ReactNode => {
  const { token, admin, initialized } = useSelector(
    (state: RootState) => state.auth
  );
  const loggedIn = token !== null;

  if (!initialized) return null;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavigationToolbar />
      <Routes>
        <Route path={`${ROUTES.HOME}`} element={<LandingPage />} />

        <Route
          element={
            <PrivateRoute canActivate={!loggedIn} fallbackRoute={ROUTES.PROFILE} />
          }
        >
          <Route path={`${ROUTES.LOGIN}`} element={<LoginPage />} />
        </Route>

        <Route path={`${ROUTES.REGISTER}/:key`} element={<VerifyEmailPage />} />
        <Route path={`${ROUTES.RESET}/:key`} element={<ResetPasswordPage />} />

        <Route path={`${ROUTES.PROS}`} element={<ProsPage />} />
        {/* <Route exact path={`${ROUTES.BLOG}/:id?`} component={BlogsPage} /> */}
        <Route path={`${ROUTES.TIPS}/:id?`} element={<TipsPage />} />

        <Route path={`${ROUTES.TERMS}`} element={<TermsPage />} />
        <Route path={`${ROUTES.PRIVACY}`} element={<PrivacyPage />} />

        <Route element={<PrivateRoute canActivate={loggedIn} />}>
          <Route path={`${ROUTES.PROFILE}`} element={<ProfilePage />} />
          {/* <Route path={`${ROUTES.LESSONS}/:id?`} element={<LessonsPage />} /> */}
          {/* <Route path={`${ROUTES.ORDER}`} element={<PackagesPage />} /> */}
          {/* <Route path={`${ROUTES.SUBMIT}`} element={<SubmitPage />} /> */}
        </Route>

        <Route element={<PrivateRoute canActivate={admin} />}>
          {/* <Route path={`${ROUTES.ADMIN}`} element={<AdminPage />} /> */}
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <NavigationDrawer />
    </BrowserRouter>
  );
};
