import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
// import { DrawerLayout } from '@pxblue/react-components';
import { NavigationDrawer } from './drawer';
import { LandingPage } from '../pages/LandingPage';
import { Toolbar } from '../components/Toolbar';
import { Footer } from '../components/Footer';

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
            <Route exact path="/">
                <LandingPage />
            </Route>
            <Route path="*">
                <h1>Hello</h1>
            </Route>
        </Switch>
        <Footer />
        <NavigationDrawer />
    </Router>
);
