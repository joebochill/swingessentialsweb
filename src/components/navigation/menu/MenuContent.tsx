import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import {
  useMediaQuery,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  ShoppingCart,
  Subscriptions,
  Videocam,
  Person,
  ExitToApp,
  Home,
  Face,
  Today,
  LocalBar,
  Security,
} from "@mui/icons-material";
import { MenuListItem } from "./MenuListItem";
import { RootState } from "../../../redux/store";
// import { useLogoutMutation } from "../../../redux/apiServices/authService";
import {
  useLogoutMutation,
} from "../../../redux/apiServices/newAuthService";
import { UserAvatar } from "./UserAvatar";

type MenuContentProps = {
  onClose: () => void;
};
export const MenuContent: React.FC<MenuContentProps> = (props) => {
  const { onClose } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [logout] = useLogoutMutation();

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.userDetails);
  const isAdmin = useSelector((state: RootState) => state.auth.admin);

  const clickMenuItem = useCallback(
    (route: string) => {
      navigate(route);
      onClose();
    },
    [navigate, onClose]
  );

  return (
    <>
      {token && (
        <ListItem divider>
          <ListItemAvatar>
            <UserAvatar />
          </ListItemAvatar>
          <ListItemText
            primary={user.username}
            secondary={
              !user.firstName && !user.lastName
                ? "Welcome User"
                : `${user.firstName} ${user.lastName}`
            }
            slotProps={{
              primary: {
                variant: "h6",
                sx: { lineHeight: 1.2 },
              },
              secondary: {
                variant: "subtitle1",
                sx: { lineHeight: 1, fontSize: "0.875rem", fontWeight: 300 },
              },
            }}
          />
        </ListItem>
      )}
      <MenuListItem
        title={"Home"}
        icon={<Home />}
        divider
        onClick={(): void => clickMenuItem(ROUTES.HOME)}
      />
      {isAdmin && (
        <MenuListItem
          title={"Admin Portal"}
          icon={<Security />}
          divider
          onClick={(): void => clickMenuItem(ROUTES.ADMIN)}
        />
      )}
      {token && (
        <>
          <MenuListItem
            title={"Your Profile"}
            icon={<Person />}
            divider
            onClick={(): void => clickMenuItem(ROUTES.PROFILE)}
          />
          <MenuListItem
            title={"Your Lessons"}
            icon={<Subscriptions />}
            divider
            onClick={(): void => clickMenuItem(ROUTES.LESSONS)}
          />
          <MenuListItem
            title={"Submit Your Swing"}
            icon={<Videocam />}
            divider
            onClick={(): void => clickMenuItem(ROUTES.SUBMIT)}
          />
          <MenuListItem
            title={"Order More"}
            icon={<ShoppingCart />}
            divider
            onClick={(): void => clickMenuItem(ROUTES.ORDER)}
          />
        </>
      )}
      {mdDown && (
        <>
          <MenuListItem
            title={"Meet Our Pros"}
            icon={<Face />}
            divider
            onClick={(): void => {
              clickMenuItem(ROUTES.PROS);
            }}
          />
          <MenuListItem
            title={"Tip of the Month"}
            icon={<Today />}
            divider
            onClick={(): void => {
              clickMenuItem(ROUTES.TIPS);
            }}
          />
          <MenuListItem
            title={"The 19th Hole"}
            icon={<LocalBar />}
            divider
            onClick={(): void => {
              clickMenuItem(ROUTES.BLOG);
            }}
          />
        </>
      )}
      {token ? (
        <MenuListItem
          title={"Sign Out"}
          icon={<ExitToApp />}
          onClick={(): void => {
            logout();
            onClose();
          }}
        />
      ) : (
        <MenuListItem
          title={"Sign In"}
          icon={<Person />}
          divider
          onClick={(): void => {
            navigate(ROUTES.LOGIN, {
              state: { from: { pathname: location.pathname } },
            });
            onClose();
          }}
        />
      )}
    </>
  );
};

MenuContent.displayName = "MenuContent";
