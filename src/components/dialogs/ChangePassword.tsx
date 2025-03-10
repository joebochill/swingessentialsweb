import React, { useState, useCallback } from 'react';
import { StyledPassword } from '../text/StyledInputs';
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
    Stack,
    Box,
} from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import { useChangePasswordMutation } from '../../redux/apiServices/authService';
import { EmptyState } from '../display/EmptyState';
import { useDarkMode } from '../../hooks';

type ChangePasswordProps = ButtonProps & {
    dialogProps?: DialogProps;
};
export const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
    const { dialogProps, ...buttonProps } = props;

    const [showDialog, setShowDialog] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const [changePassword, { isLoading, isSuccess: changed, error: changeError, reset: resetChange }] =
        useChangePasswordMutation();

    const resetDialog = useCallback(() => {
        setCurrentPassword('');
        setNewPassword('');
        resetChange();
    }, [resetChange]);

    const incorrectPassword = (changeError as { data: { code: number } })?.data?.code === 400150;

    const { isDarkMode } = useDarkMode();

    return (
        <>
            <Button
                variant={'outlined'}
                color={'inherit'}
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
                    if (reason !== 'backdropClick') {
                        setShowDialog(false);
                        resetDialog();
                    }
                }}
                closeAfterTransition={false}
                slotProps={{
                    paper: {
                        sx: {
                            width: '100%',
                        },
                    },
                }}
                {...dialogProps}
            >
                <DialogTitle>{`Change Password`}</DialogTitle>
                <DialogContent>
                    {!isLoading && (!changeError || incorrectPassword) && !changed && (
                        <Stack spacing={2}>
                            <DialogContentText>{`To change your password, enter your current password and new password below.`}</DialogContentText>
                            <StyledPassword
                                darkStyle={isDarkMode}
                                label={'Current Password'}
                                name={'current'}
                                error={incorrectPassword}
                                helperText={incorrectPassword ? 'Password is incorrect' : ''}
                                value={currentPassword}
                                onChange={(e): void => {
                                    setCurrentPassword(e.target.value);
                                }}
                            />
                            <StyledPassword
                                darkStyle={isDarkMode}
                                label={'New Password'}
                                name={'new'}
                                value={newPassword}
                                onChange={(e): void => {
                                    setNewPassword(e.target.value);
                                }}
                            />
                        </Stack>
                    )}
                    {isLoading && (
                        <Box style={{ textAlign: 'center' }}>
                            <CircularProgress color="inherit" />
                        </Box>
                    )}
                    {changed && (
                        <EmptyState
                            icon={<CheckCircle fontSize={'inherit'} sx={{ color: 'success.main' }} />}
                            title={'Password Changed'}
                            description={'Your password was changed successfully'}
                        />
                    )}
                    {changeError && !incorrectPassword && (
                        <EmptyState
                            icon={<Error fontSize={'inherit'} sx={{ color: 'error.main' }} />}
                            title={'Password Change Failed'}
                            description={'We were unable to change your password. Please try again later.'}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    {!isLoading && (!changeError || incorrectPassword) && !changed && (
                        <>
                            <Button
                                color={'inherit'}
                                variant={'outlined'}
                                onClick={(): void => {
                                    setShowDialog(false);
                                    resetDialog();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={!currentPassword || !newPassword}
                                color={'primary'}
                                variant={'contained'}
                                onClick={async (): Promise<void> => {
                                    try {
                                        changePassword({
                                            oldPassword: btoa(currentPassword),
                                            newPassword: btoa(newPassword),
                                        });
                                    } catch (error) {
                                        console.error('Error:', error);
                                    }
                                }}
                            >
                                Change Password
                            </Button>
                        </>
                    )}
                    {(changed || (changeError && !incorrectPassword)) && (
                        <Button
                            fullWidth
                            disabled={!currentPassword || !newPassword}
                            color={'primary'}
                            variant={'contained'}
                            onClick={(): void => {
                                setShowDialog(false);
                                resetDialog();
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
