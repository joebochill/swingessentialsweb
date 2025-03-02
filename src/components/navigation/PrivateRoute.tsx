import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

type PrivateRouteProps = {
  canActivate: boolean | (() => boolean);
};
export const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { canActivate } = props;
  const location = useLocation();

  let active = false;
  if (typeof canActivate === "function") active = canActivate();
  else active = canActivate;

  return active ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} />
  );
};
