import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from 'react-redux';
// import { AppState } from "../../__types__";
import { ROUTES } from "../../../src/constants/routes";
import { MenuContent } from "./MenuContent";
import { Menu, Avatar, Button } from "@mui/material";
import { Person } from "@mui/icons-material";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ForwardMenuContent = React.forwardRef(
  (props: { onClose: () => void }, ref) => <MenuContent {...props} />
);
ForwardMenuContent.displayName = "ForwardRefMenuContent";

export const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = ""; //useSelector((state: AppState) => state.auth.token);
  const user = { firstName: "XXX", lastName: "YYY", username: "mmmmm" }; //useSelector((state: AppState) => state.user);
  const avatar = ""; //useSelector((state: AppState) => state.settings.avatar);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const openMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const initials = `${user.firstName.charAt(0).toUpperCase()}${user.lastName
    .charAt(0)
    .toUpperCase()}`;

  return token ? (
    <>
      <Avatar
        src={
          avatar
            ? `https://www.swingessentials.com/images/profiles/${user.username}/${avatar}.png`
            : undefined
        }
        sx={{
          cursor: "pointer",
          color: "primary.main",
          height: (t) => t.spacing(5),
          width: (t) => t.spacing(5),
          backgroundColor: "background.paper",
          fontWeight: 600,
          fontFamily: "Roboto Mono",
        }}
        onClick={openMenu}
      >
        {initials ? initials : <Person fontSize={"inherit"} />}
      </Avatar>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closeMenu}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        MenuListProps={{ style: { padding: 0, minWidth: 200 } }}
        slotProps={{
          paper: {
            sx: {
              color: "primary.main",
            },
          },
        }}
      >
        <ForwardMenuContent onClose={closeMenu} />
      </Menu>
    </>
  ) : (
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
  );
};

UserMenu.displayName = "UserMenu";
