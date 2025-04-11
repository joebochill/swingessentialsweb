import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

type PrivateRouteProps = {
    canActivate: boolean | (() => boolean);
    fallbackRoute?: string;
};
export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const { canActivate, fallbackRoute = ROUTES.LOGIN } = props;
    const location = useLocation();

    let active = false;
    if (typeof canActivate === 'function') active = canActivate();
    else active = canActivate;

    const fromPath = location.state?.from?.pathname;

    const from = fromPath && ![ROUTES.FORGOT, ROUTES.LOGIN, ROUTES.RESET].includes(fromPath) ? fromPath : fallbackRoute;

    return active ? <Outlet /> : <Navigate to={from} state={{ from: location }} />;
};
