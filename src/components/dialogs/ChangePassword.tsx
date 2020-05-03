import React, { useState, useCallback, useEffect } from 'react';
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
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../__types__';
import { RESET_CHANGE_PASSWORD } from '../../redux/actions/types';
import { StyledPassword } from '../text/StyledInputs';
import { EmptyState } from '@pxblue/react-components';
import { CheckCircle, Error } from '@material-ui/icons';
import { changePassword } from '../../redux/actions/auth-actions';

import * as Colors from '@pxblue/colors';

type ChangePasswordProps = ButtonProps & {
    dialogProps?: DialogProps;
};
export const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
    const { dialogProps, ...buttonProps } = props;

    const [showDialog, setShowDialog] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const changingPassword = useSelector((state: AppState) => state.auth.changePassword);

    const dispatch = useDispatch();

    const resetDialog = useCallback(() => {
        setCurrentPassword('');
        setNewPassword('');
        dispatch({ type: RESET_CHANGE_PASSWORD });
    }, [setCurrentPassword, setNewPassword, dispatch]);

    useEffect(() => {
        if (showDialog) {
            resetDialog();
        }
    }, [showDialog, resetDialog]);

    return (
        <>
            <Button
                variant={'outlined'}
                color={'inherit'}
                style={{ marginTop: 16 }}
                onClick={(): void => {
                    setShowDialog(true);
                }}
                {...buttonProps}
            >
                Change Password
            </Button>
            <Dialog disableBackdropClick open={showDialog} onClose={(): void => setShowDialog(false)} {...dialogProps}>
                <DialogTitle>{`Change Password`}</DialogTitle>
                <DialogContent>
                    {changingPassword.result === 'initial' && changingPassword.currentValidated !== 'pending' && (
                        <>
                            <DialogContentText>{`To change your password, enter your current password and new password below.`}</DialogContentText>
                            <StyledPassword
                                onDark={false}
                                label={'Current Password'}
                                name={'current'}
                                error={changingPassword.currentValidated === 'failed'}
                                helperText={
                                    changingPassword.currentValidated === 'failed' ? 'Password is incorrect' : ''
                                }
                                value={currentPassword}
                                onChange={(e): void => {
                                    setCurrentPassword(e.target.value);
                                }}
                            />
                            <StyledPassword
                                onDark={false}
                                label={'New Password'}
                                name={'new'}
                                value={newPassword}
                                onChange={(e): void => {
                                    setNewPassword(e.target.value);
                                }}
                            />
                        </>
                    )}
                    {(changingPassword.result === 'pending' || changingPassword.currentValidated === 'pending') && (
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </div>
                    )}
                    {changingPassword.result === 'success' && (
                        <EmptyState
                            icon={<CheckCircle fontSize={'inherit'} htmlColor={Colors.green[500]} />}
                            title={'Password Changed'}
                            description={'Your password was changed successfully'}
                        />
                    )}
                    {changingPassword.result === 'failed' && (
                        <EmptyState
                            icon={<Error fontSize={'inherit'} htmlColor={Colors.red[500]} />}
                            title={'Password Change Failed'}
                            description={'We were unable to change your password. Please try again later.'}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    {changingPassword.currentValidated !== 'pending' && changingPassword.result === 'initial' && (
                        <>
                            <Button
                                color={'primary'}
                                variant={'outlined'}
                                onClick={(): void => {
                                    setShowDialog(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                disabled={!currentPassword || !newPassword}
                                color={'primary'}
                                variant={'contained'}
                                onClick={(): void => {
                                    dispatch(changePassword({ currentPassword, newPassword }));
                                }}
                            >
                                Change Password
                            </Button>
                        </>
                    )}
                    {changingPassword.result === 'success' && (
                        <Button
                            disabled={!currentPassword || !newPassword}
                            color={'primary'}
                            variant={'contained'}
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
