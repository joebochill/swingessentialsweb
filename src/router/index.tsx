import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation, Redirect } from 'react-router-dom';
// import { DrawerLayout } from '@pxblue/react-components';
import { NavigationDrawer } from '../components/navigation/drawer';
import { Toolbar } from '../components/navigation/Toolbar';
import { Footer } from '../components/navigation/Footer';
import { ROUTES } from '../constants/routes';
import { LessonsPage, LandingPage, PlaceholderPage, ProsPage, TipsPage, BlogsPage, LoginPage } from '../pages';

const ScrollToTop = (): any => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

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

            <Route exact path={`${ROUTES.BLOG}/:id`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.TIPS}/:id`} component={PlaceholderPage} />

            <Route exact path={`${ROUTES.LESSONS}/:id`} component={LessonsPage} />
            <Route exact path={`${ROUTES.ORDER}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.SUBMIT}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.PROFILE}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.REGISTER}`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.REGISTER}/:key`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.UNSUBSCRIBE}/:user/:key`} component={PlaceholderPage} />
            <Route exact path={`${ROUTES.RESET}/:key`} component={PlaceholderPage} />
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
