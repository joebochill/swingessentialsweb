import React, { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../__types__";
import { OPEN_DRAWER } from "../../redux/actions/types";
import { ROUTES } from "../../../src/constants/routes";
import { SimpleRouterLink } from "../navigation/SimpleLink";
import { Spacer } from "@brightlayer-ui/react-components";
import { UserMenu } from "../navigation/UserMenu";
import {
  AppBar,
  Button,
  Toolbar as MuiToolbar,
  Theme,
  IconButton,
  SxProps,
  useMediaQuery,
  Box,
} from "@mui/material";
import { Menu } from "@mui/icons-material";
import logo from "../../assets/icons/logo-full-white.svg";

const styles: { [key: string]: SxProps<Theme> } = {
  avatar: {
    cursor: "pointer",
    color: "primary.main",
    height: (t) => t.spacing(5),
    width: (t) => t.spacing(5),
    backgroundColor: "background.paper",
    fontWeight: 600,
    fontFamily: "Roboto Mono",
  },
  toolbar: {
    py: 0,
    px: 2,
  },
};

export const Toolbar: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const xsDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("xs"));

  const token = ""; //useSelector((state: AppState) => state.auth.token);

  return (
    <AppBar position={"sticky"}>
      <MuiToolbar sx={styles.toolbar}>
        <Box
          component={"img"}
          src={logo}
          alt={"Swing Essentials Logo"}
          onClick={(): void => {
            navigate(ROUTES.HOME);
          }}
          sx={{ cursor: "pointer" }}
        />
        <Spacer classes={{}} />

        {!smDown && (
          <>
            <SimpleRouterLink to={ROUTES.PROS} label={"Meet Our Pros"} />
            <SimpleRouterLink to={ROUTES.TIPS} label={"Tip of the Month"} />
            <SimpleRouterLink to={ROUTES.BLOG} label={"The 19th Hole"} />
            <Spacer classes={{}} flex={0} sx={{ width: (t) => t.spacing(2) }} />
            <UserMenu />
          </>
        )}
        {!mdUp && (
          <>
            {!xsDown && (
              <>
                {!token && (
                  <Button
                    variant={"outlined"}
                    color={"inherit"}
                    onClick={(): void => {
                      navigate(ROUTES.LOGIN, {
                        state: { from: { pathname: location.pathname } },
                      });
                    }}
                  >
                    SIGN IN
                  </Button>
                )}
              </>
            )}

            <IconButton
              sx={{ color: "inherit", mr: -2 }}
              onClick={(): void => {
                dispatch({ type: OPEN_DRAWER });
              }}
            >
              <Menu />
            </IconButton>
          </>
        )}
      </MuiToolbar>
    </AppBar>
  );
};
