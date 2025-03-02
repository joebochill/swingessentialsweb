import React from "react";
import { Route, Navigate, RouteProps, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

type PrivateRouteProps = RouteProps & {
  canActivate: boolean | (() => boolean);
};
export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { canActivate, ...rest } = props;
  const location = useLocation();

  let active = false;
  if (typeof canActivate === "function") active = canActivate();
  else active = canActivate;

  return active ? (
    <Route {...rest} />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} />
  );
};
