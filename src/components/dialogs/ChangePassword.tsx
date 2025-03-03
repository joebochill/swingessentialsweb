import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { AppState } from '../../__types__';
// import { CHANGE_PASSWORD } from '../../redux/actions/types';
// import { changePassword } from '../../redux/actions/auth-actions';
import { StyledPassword } from "../text/StyledInputs";
import {
  ButtonProps,
  DialogProps,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CircularProgress,
  DialogActions,
  useTheme,
  Stack,
  Box,
} from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";
import {
  useChangePasswordMutation,
  useVerifyPasswordMutation,
} from "../../redux/apiServices/authService";
import { EmptyState } from "../display/EmptyState";

type ChangePasswordProps = ButtonProps & {
  dialogProps?: DialogProps;
};
export const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  const { dialogProps, ...buttonProps } = props;

  //   const theme = useTheme();

  const [showDialog, setShowDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // const validateStatus = useSelector((state: AppState) => state.api.validatePassword);
  // const changeStatus = useSelector((state: AppState) => state.api.changePassword);

  // const validLoading = validateStatus.status === 'loading';
  // const changeLoading = changeStatus.status === 'loading';

  // const validateRequestStatus = validateStatus.status;
  // const changeRequestStatus = changeStatus.status;

  const [
    verifyPassword,
    { isLoading: verifying, error: verifyError, reset: resetVerify },
  ] = useVerifyPasswordMutation();
  const [
    changePassword,
    {
      isLoading: changing,
      data: changed,
      error: changeError,
      reset: resetChange,
    },
  ] = useChangePasswordMutation();

  const isLoading = verifying || changing;

  const resetDialog = useCallback(() => {
    setCurrentPassword("");
    setNewPassword("");
    resetVerify();
    resetChange();
  }, []);

  return (
    <>
      <Button
        variant={"outlined"}
        color={"inherit"}
        onClick={(): void => {
          setShowDialog(true);
        }}
        {...buttonProps}
      >
        Change Password
      </Button>
      <Dialog
        open={showDialog}
        onClose={(_e, reason): void => {
          if (reason !== "backdropClick") {
            setShowDialog(false);
            resetDialog();
          }
        }}
        closeAfterTransition={false}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
            },
          },
        }}
        {...dialogProps}
      >
        <DialogTitle>{`Change Password`}</DialogTitle>
        <DialogContent>
          {/* {changeRequestStatus === "initial" &&
            validateRequestStatus !== "loading" && ( */}
          {!isLoading && !changeError && !changed && (
            <Stack spacing={2}>
              <DialogContentText>{`To change your password, enter your current password and new password below.`}</DialogContentText>
              <StyledPassword
                label={"Current Password"}
                name={"current"}
                error={Boolean(verifyError)}
                helperText={Boolean(verifyError) ? "Password is incorrect" : ""}
                value={currentPassword}
                onChange={(e): void => {
                  setCurrentPassword(e.target.value);
                }}
              />
              <StyledPassword
                label={"New Password"}
                name={"new"}
                value={newPassword}
                onChange={(e): void => {
                  setNewPassword(e.target.value);
                }}
              />
            </Stack>
          )}
          {isLoading && (
            <Box style={{ textAlign: "center" }}>
              <CircularProgress color="inherit" />
            </Box>
          )}
          {changed && (
            <EmptyState
              icon={
                <CheckCircle
                  fontSize={"inherit"}
                  sx={{ color: "success.main" }}
                />
              }
              title={"Password Changed"}
              description={"Your password was changed successfully"}
            />
          )}
          {changeError && (
            <EmptyState
              icon={<Error fontSize={"inherit"} sx={{ color: "error.main" }} />}
              title={"Password Change Failed"}
              description={
                "We were unable to change your password. Please try again later."
              }
            />
          )}
        </DialogContent>
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            justifyContent: "space-between",
          }}
        >
          {!isLoading && changed === undefined && !changeError && (
            <>
              <Button
                color={"inherit"}
                variant={"outlined"}
                onClick={(): void => {
                  setShowDialog(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={!currentPassword || !newPassword}
                color={"primary"}
                variant={"contained"}
                onClick={async (): Promise<void> => {
                  try {
                    await verifyPassword(btoa(currentPassword)).unwrap();
                    changePassword(btoa(newPassword));
                  } catch (error) {
                    console.error("Error:", error);
                  }
                }}
              >
                Change Password
              </Button>
            </>
          )}
          {(changed || changeError) && (
            <Button
              fullWidth
              disabled={!currentPassword || !newPassword}
              color={"primary"}
              variant={"contained"}
              onClick={(): void => {
                setShowDialog(false);
              }}
            >
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};
