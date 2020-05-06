import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
// import { DrawerLayout } from '@pxblue/react-components';
import { NavigationDrawer } from '../components/navigation/drawer';
import { Toolbar } from '../components/toolbars/Toolbar';
import { Footer } from '../components/toolbars/Footer';
import { ROUTES } from '../constants/routes';
import {
    LessonsPage,
    LandingPage,
    PlaceholderPage,
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
    const loggedIn = token !== null;
    return (
        <Router>
            <ScrollToTop />
            <Toolbar />
            <Switch>
                <Route exact path={`${ROUTES.HOME}`} component={LandingPage} />
                <Route exact path={`${ROUTES.LOGIN}`} component={LoginPage} />
                <Route exact path={`${ROUTES.PROS}`} component={ProsPage} />
                <Route exact path={`${ROUTES.BLOG}`} component={BlogsPage} />
                <Route exact path={`${ROUTES.TIPS}`} component={TipsPage} />
                <PrivateRoute exact path={`${ROUTES.LESSONS}`} component={LessonsPage} canActivate={loggedIn} />
                <PrivateRoute exact path={`${ROUTES.PROFILE}`} component={ProfilePage} canActivate={loggedIn} />
                <PrivateRoute exact path={`${ROUTES.ORDER}`} component={PackagesPage} canActivate={loggedIn} />

                <Route exact path={`${ROUTES.REGISTER}/:key`} component={VerifyEmailPage} />
                <Route exact path={`${ROUTES.RESET}/:key`} component={ResetPasswordPage} />

                <Route exact path={`${ROUTES.TERMS}`} component={TermsPage} />
                <Route exact path={`${ROUTES.PRIVACY}`} component={PrivacyPage} />

                {/* Deep Links */}
                <Route exact path={`${ROUTES.BLOG}/:id`} component={BlogsPage} />
                <Route exact path={`${ROUTES.TIPS}/:id`} component={TipsPage} />
                <Route exact path={`${ROUTES.LESSONS}/:id`} component={LessonsPage} />

                {/* TODO */}

                <Route exact path={`${ROUTES.SUBMIT}`} component={PlaceholderPage} />

                <Route exact path={`${ROUTES.UNSUBSCRIBE}/:user/:key`} component={PlaceholderPage} />
                <Route exact path={`${ROUTES.ADMIN}`} component={PlaceholderPage} />
                <Route exact path={`${ROUTES.PRIVACY}`} component={PlaceholderPage} />

                <Route path="*">
                    <Redirect to="/" />
                </Route>
            </Switch>
            <Footer />
            <NavigationDrawer />
        </Router>
    );
};
