import React, { JSX, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AppState } from "../../__types__";
// import { requestLogout } from '../../redux/actions/auth-actions';
import { ROUTES } from "../../../src/constants/routes";
import { Spacer } from "@brightlayer-ui/react-components";
import {
  Avatar,
  Typography,
  Divider,
  Hidden,
  createStyles,
  makeStyles,
  Theme,
  useTheme,
  Box,
  SxProps,
  useMediaQuery,
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

const styles: { [key: string]: SxProps<Theme> } = {
  menuHeader: {
    display: "flex",
    p: 2,
    color: "text.primary",
  },
  avatarInside: {
    color: "common.white",
    height: (t) => t.spacing(5),
    width: (t) => t.spacing(5),
    backgroundColor: "primary.main",
    fontWeight: 600,
    fontFamily: "Roboto Mono",
  },
  row: {
    display: "flex",
    alignItems: "center",
    px: 2,
    height: (t) => t.spacing(6),
    cursor: "pointer",
    userSelect: "none",
    "&:hover": {
      backgroundColor: "primary.light",
    },
  },
};

type MenuListItemProps = {
  icon?: JSX.Element;
  title: string;
  onClick: () => void;
  divider?: boolean;
};
export const MenuListItem: React.FC<MenuListItemProps> = (props) => {
  //   const classes = useStyles();
  //   const theme = useTheme();

  return (
    <>
      <Box sx={styles.row} onClick={(): void => props.onClick()}>
        {props.icon}
        {props.icon && (
          <Spacer
            classes={{}}
            flex={0}
            /*width={theme.spacing(2)}*/ sx={{ width: (t) => t.spacing(2) }}
          />
        )}
        <Typography>{props.title}</Typography>
      </Box>
      {props.divider && <Divider />}
    </>
  );
};

type MenuContentProps = {
  onClose: () => void;
};
export const MenuContent: React.FC<MenuContentProps> = (props) => {
  const { onClose } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("xl"));
  //   const classes = useStyles();
  //   const dispatch = useDispatch();

  const token = ""; //useSelector((state: AppState) => state.auth.token);
  const user = { firstName: "XXX", lastName: "YYY", username: "mmmmm" }; //useSelector((state: AppState) => state.user);
  const avatar = ""; //useSelector((state: AppState) => state.settings.avatar);
  const isAdmin = false; //useSelector((state: AppState) => state.auth.admin);

  const clickMenuItem = useCallback(
    (route: string) => {
      navigate(route);
      onClose();
    },
    [navigate, onClose]
  );

  const initials = `${user.firstName.charAt(0).toUpperCase()}${user.lastName
    .charAt(0)
    .toUpperCase()}`;

  return (
    <>
      {token && (
        <>
          <Box sx={styles.menuHeader}>
            <Avatar
              src={
                avatar
                  ? `https://www.swingessentials.com/images/profiles/${user.username}/${avatar}.png`
                  : undefined
              }
              sx={styles.avatarInside}
            >
              {initials ? initials : <Person fontSize={"inherit"} />}
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant={"h6"} sx={{ lineHeight: 1.2 }}>
                {user.username}
              </Typography>
              <Typography
                variant={"subtitle1"}
                sx={{ lineHeight: 1, fontSize: "0.875rem", fontWeight: 300 }}
              >
                {`${user.firstName} ${user.lastName}`}
                {!user.firstName && !user.lastName ? "Welcome User" : ""}
              </Typography>
            </Box>
          </Box>
          <Divider />
        </>
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
      {!mdUp && (
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
            // dispatch(requestLogout());
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
