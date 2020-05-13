import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { NavigationDrawer } from '../components/navigation/drawer';
import { Toolbar } from '../components/toolbars/Toolbar';
import { Footer } from '../components/toolbars/Footer';
import { ROUTES } from '../constants/routes';
import {
    LessonsPage,
    LandingPage,
    ProsPage,
    TipsPage,
    BlogsPage,
    LoginPage,
    VerifyEmailPage,
    ResetPasswordPage,
    TermsPage,
    PrivacyPage,
    ProfilePage,
    PackagesPage,
    SubmitPage,
    AdminPage,
} from '../pages';
import { usePrevious } from '../hooks';
import { useSelector } from 'react-redux';
import { AppState } from '../__types__';
import { PrivateRoute } from '../components/navigation/PrivateRoute';

const ScrollToTop = (): any => {
    const { pathname } = useLocation();
    const previousPath = usePrevious(pathname);

    useEffect(() => {
        if (pathname.split('/')[1] !== previousPath?.split('/')[1] || pathname.split('/')[1] === 'legal') {
            window.scrollTo(0, 0);
        }
    }, [pathname, previousPath]);

    return null;
};

export const MainRouter = (): JSX.Element => {
    const token = useSelector((state: AppState) => state.auth.token);
    const admin = useSelector((state: AppState) => state.auth.admin);
    const loggedIn = token !== null;
    return (
        <Router>
            <ScrollToTop />
            <Toolbar />
            <Switch>
                <Route exact path={`${ROUTES.HOME}`} component={LandingPage} />
                <Route exact path={`${ROUTES.LOGIN}`} component={LoginPage} />
                <Route exact path={`${ROUTES.PROS}`} component={ProsPage} />
                <Route exact path={`${ROUTES.BLOG}/:id?`} component={BlogsPage} />
                <Route exact path={`${ROUTES.TIPS}/:id?`} component={TipsPage} />
                <PrivateRoute exact path={`${ROUTES.LESSONS}/:id?`} component={LessonsPage} canActivate={loggedIn} />
                <PrivateRoute exact path={`${ROUTES.PROFILE}`} component={ProfilePage} canActivate={loggedIn} />
                <PrivateRoute exact path={`${ROUTES.ORDER}`} component={PackagesPage} canActivate={loggedIn} />
                <PrivateRoute exact path={`${ROUTES.SUBMIT}`} component={SubmitPage} canActivate={loggedIn} />

                <Route exact path={`${ROUTES.REGISTER}/:key`} component={VerifyEmailPage} />
                <Route exact path={`${ROUTES.RESET}/:key`} component={ResetPasswordPage} />

                <Route exact path={`${ROUTES.TERMS}`} component={TermsPage} />
                <Route exact path={`${ROUTES.PRIVACY}`} component={PrivacyPage} />

                <PrivateRoute exact path={`${ROUTES.ADMIN}`} component={AdminPage} canActivate={admin} />

                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
            <Footer />
            <NavigationDrawer />
        </Router>
    );
};
