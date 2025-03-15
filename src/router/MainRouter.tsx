import { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import { ROUTES } from '../constants/routes';
import {
    HomePage,
    LoginPage,
    ProsPage,
    TermsPage,
    PrivacyPage,
    VerifyEmailPage,
    ResetPasswordPage,
    ProfilePage,
    TipsPage,
    BlogsPage,
    LessonsPage,
} from '../components/pages';
import { PrivateRoute } from './PrivateRoute';
import { ScrollToTop } from './ScrollToTop';
import { Footer } from '../components/navigation/Footer';
import { NavigationToolbar } from '../components/navigation/NavigationToolbar';
import { NavigationDrawer } from '../components/navigation/NavigationDrawer';

export const MainRouter = (): ReactNode => {
    const { token, admin, initialized } = useSelector((state: RootState) => state.auth);
    const loggedIn = token !== null;

    if (!initialized) return null;

    return (
        <BrowserRouter>
            <ScrollToTop />
            <NavigationToolbar />
            <Routes>
                <Route path={`${ROUTES.HOME}`} element={<HomePage />} />

                <Route element={<PrivateRoute canActivate={!loggedIn} fallbackRoute={ROUTES.PROFILE} />}>
                    <Route path={`${ROUTES.LOGIN}`} element={<LoginPage />} />
                </Route>

                <Route path={`${ROUTES.REGISTER}/:key`} element={<VerifyEmailPage />} />
                <Route path={`${ROUTES.RESET}/:key`} element={<ResetPasswordPage />} />

                <Route path={`${ROUTES.PROS}`} element={<ProsPage />} />
                <Route path={`${ROUTES.BLOG}/:id?`} element={<BlogsPage />} />
                <Route path={`${ROUTES.TIPS}/:id?`} element={<TipsPage />} />

                <Route path={`${ROUTES.TERMS}`} element={<TermsPage />} />
                <Route path={`${ROUTES.PRIVACY}`} element={<PrivacyPage />} />

                <Route element={<PrivateRoute canActivate={loggedIn} />}>
                    <Route path={`${ROUTES.PROFILE}`} element={<ProfilePage />} />
                    <Route path={`${ROUTES.LESSONS}/:id?`} element={<LessonsPage />} />
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
