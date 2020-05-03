import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

type PrivateRouteProps = RouteProps & {
    component: React.ComponentType<any>;
    canActivate: boolean | (() => boolean);
};
export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
    const { component, canActivate, ...rest } = props;
    const Component = component;

    let active = false;
    if (typeof canActivate === 'function') active = canActivate();
    else active = canActivate;

    return (
        <Route
            {...rest}
            render={(_props): JSX.Element =>
                active ? (
                    <Component {..._props} />
                ) : (
                    <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: _props.location } }} />
                )
            }
        />
    );
};
