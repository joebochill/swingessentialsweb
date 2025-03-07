import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatTimer } from "../../utilities/date";
import {
  DialogProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Zoom,
} from "@mui/material";
import { Update } from "@mui/icons-material";
import { RootState } from "../../redux/store";
import {
  useLogoutMutation,
  useGetRoleMutation,
  useRefreshTokenMutation,
} from "../../redux/apiServices/authService";

type TokenModalProps = Omit<DialogProps, "open">;
export const TokenModal: React.FC<TokenModalProps> = (props) => {
  const { onClose = () => {}, ...dialogProps } = props;

  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);
  const [refreshToken] = useRefreshTokenMutation();
  const [getUserRole, { data: dbRole }] = useGetRoleMutation();
  const [logout] = useLogoutMutation();

  const [timeRemaining, setTimeRemaining] = useState(-1);
  const [engageCountdown, setEngageCountdown] = useState(false);
  const [updateRate, setUpdateRate] = useState(1);

  const updateRefreshRate = useCallback(() => {
    if (timeRemaining <= 3 * 60) {
      setUpdateRate(1);
    } else if (timeRemaining <= 10 * 60) {
      setUpdateRate(1 * 60);
    } else if (timeRemaining <= 20 * 60) {
      setUpdateRate(5 * 60);
    } else {
      setUpdateRate(30 * 60);
    }
  }, [timeRemaining]);

  useEffect(() => {
    // timer to check for pending user registration
    if (role === "pending") {
      const interval = setInterval(() => {
        getUserRole();
      }, 20 * 1000);
      return (): void => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Get a new token after registration is complete
  useEffect(() => {
    if (role && dbRole && role !== dbRole) {
      refreshToken();
    }
  }, [role, dbRole, refreshToken]);

  useEffect(() => {
    // set the time remaining on login/logout
    if (token) {
      const exp = JSON.parse(atob(token.split(".")[1])).exp;
      setTimeRemaining(exp - Date.now() / 1000);
      setEngageCountdown(true);
    } else {
      setTimeRemaining(0);
      setEngageCountdown(false);
    }
  }, [token]);

  useEffect(() => {
    // Update the timer
    if (!token || !engageCountdown) {
      return;
    }
    let interval = 0;
    if (timeRemaining > 0) {
      // @ts-ignore
      interval = setInterval(() => {
        const exp = JSON.parse(atob(token.split(".")[1])).exp;
        setTimeRemaining(exp - Date.now() / 1000);
      }, updateRate * 1000);
      updateRefreshRate();
    } else {
      logout();
    }

    return (): void => clearInterval(interval);
  }, [
    timeRemaining,
    engageCountdown,
    token,
    updateRate,
    updateRefreshRate,
    dispatch,
  ]);

  return (
    <Dialog
      {...dialogProps}
      transitionDuration={500}
      slots={{
        transition: Zoom,
      }}
      open={token !== null && timeRemaining <= 3 * 60 && timeRemaining > 0}
      style={{ zIndex: 100000 }}
    >
      <DialogTitle>
        <Typography
          variant={"h6"}
          component={"span"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Update sx={{ fontSize: 40, mr: 1 }} />
          {`Session Expiration in ${formatTimer(timeRemaining)}`}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your session is about to expire. Click below to stay logged in.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          fullWidth
          variant={"contained"}
          onClick={(e): void => {
            onClose(e, "backdropClick");
            refreshToken();
          }}
        >
          Keep Me Logged In
        </Button>
      </DialogActions>
    </Dialog>
  );
};
