/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../__types__';
import { DialogProps, Dialog, DialogContent, DialogActions, Typography, Button } from '@material-ui/core';
import { getUserProfile } from '../../redux/actions/user-data-actions';
import { differenceInYears } from 'date-fns';

type UserDetailsDialogProps = DialogProps & {
    username: string | null | undefined;
};
export const UserDetailsDialog: React.FC<UserDetailsDialogProps> = (props) => {
    const { username, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();

    const userProfile = useSelector((state: AppState) => state.userProfile);
    const joined = new Date(userProfile.joined * 1000).getFullYear();

    useEffect((): void => {
        if (username) dispatch(getUserProfile(username));
    }, [username]);

    return (
        <Dialog {...dialogProps}>
            <DialogContent>
                <Typography variant={'h5'} style={{ fontWeight: 700, lineHeight: 1.3 }}>
                    {`${userProfile.firstName} ${userProfile.lastName}`}
                </Typography>
                <Typography variant={'h6'} style={{ lineHeight: 1.2 }}>
                    {userProfile.username}
                </Typography>
                <Typography variant={'caption'} display={'block'}>
                    {`Member since ${joined}`}
                </Typography>
                <Typography style={{ marginTop: 16 }}>{`Email: ${userProfile.email}`}</Typography>
                {userProfile.location && <Typography>{`Location: ${userProfile.location}`}</Typography>}
                {userProfile.birthday && (
                    <Typography style={{ marginTop: 16 }}>
                        {`Birthday: ${userProfile.birthday} (Age ${differenceInYears(
                            Date.now(),
                            new Date(userProfile.birthday)
                        )})`}
                    </Typography>
                )}
                {userProfile.average && <Typography>{`Average: ${userProfile.average}`}</Typography>}
                <Typography style={{ lineHeight: 1.2, marginTop: 16 }}>{userProfile.goals}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={(e): void => {
                        onClose(e, 'backdropClick');
                    }}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};
