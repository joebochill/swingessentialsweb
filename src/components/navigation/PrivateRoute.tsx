import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

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

    const from = location.state?.from?.pathname || fallbackRoute;

    return active ? <Outlet /> : <Navigate to={from} state={{ from: location }} />;
};
