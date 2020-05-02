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
} from '../pages';
import { usePrevious } from '../hooks';

const ScrollToTop = (): any => {
    const { pathname } = useLocation();
    const previousPath = usePrevious(pathname);

    useEffect(() => {
        if (pathname.split('/')[1] !== previousPath?.split('/')[1]) {
            window.scrollTo(0, 0);
        }
    }, [pathname, previousPath]);

    return null;
};

export const MainRouter = (): JSX.Element => (
    <Router>
        <ScrollToTop />
        <Toolbar />
        <Switch>
            <Route exact path={`${ROUTES.HOME}`} component={LandingPage} />
            <Route exact path={`${ROUTES.LOGIN}`} component={LoginPage} />
            <Route exact path={`${ROUTES.PROS}`} component={ProsPage} />
            <Route exact path={`${ROUTES.BLOG}`} component={BlogsPage} />
            <Route exact path={`${ROUTES.TIPS}`} component={TipsPage} />
            <Route exact path={`${ROUTES.LESSONS}`} component={LessonsPage} />
            <Route exact path={`${ROUTES.REGISTER}/:key`} component={VerifyEmailPage} />
            <Route exact path={`${ROUTES.RESET}/:key`} component={ResetPasswordPage} />

            {/* Deep Links */}
            <Route exact path={`${ROUTES.BLOG}/:id`} component={BlogsPage} />
            <Route exact path={`${ROUTES.TIPS}/:id`} component={TipsPage} />
            <Route exact path={`${ROUTES.LESSONS}/:id`} component={LessonsPage} />

            {/* TODO */}
            <Route exact path={`${ROUTES.ORDER}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.SUBMIT}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.PROFILE}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.UNSUBSCRIBE}/:user/:key`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.ADMIN}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.PRIVACY}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.TERMS}`} component={PlaceholderPage} />

            <Route path="*">
                <Redirect to="/" />
            </Route>
        </Switch>
        <Footer />
        <NavigationDrawer />
    </Router>
);
