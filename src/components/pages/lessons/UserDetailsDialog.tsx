import React from 'react';
import { DialogProps, Dialog, DialogContent, DialogActions, Typography, Button, Skeleton, Stack } from '@mui/material';
import { differenceInYears } from 'date-fns';
import { useGetUserDetailsByIdQuery } from '../../../redux/apiServices/userDetailsService';

const mapAverage = (avg: string) => {
    switch (avg) {
        case '60':
            return 'Under 70';
        case '70':
            return '70-79';
        case '80':
            return '80-89';
        case '90':
            return '90-99';
        case '100':
            return '100-149';
        case '150':
            return '150+';
        default:
            return '';
    }
};

type UserDetailsDialogProps = DialogProps & {
    username: string | null | undefined;
};
export const UserDetailsDialog: React.FC<UserDetailsDialogProps> = (props) => {
    const { username, ...dialogProps } = props;
    const { onClose = (): void => {} } = dialogProps;

    const { data: userProfile } = useGetUserDetailsByIdQuery(username || '', { skip: !username });
    const joined = userProfile ? new Date(userProfile.joined * 1000).getFullYear() : '--';

    return (
        <Dialog {...dialogProps}>
            <DialogContent>
                {userProfile && (
                    <Stack spacing={2}>
                        <Typography variant={'h5'} sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                            {`${userProfile.first} ${userProfile.last}`}
                        </Typography>
                        <Typography variant={'h6'} sx={{ lineHeight: 1.2 }}>
                            {userProfile.username}
                        </Typography>
                        <Typography variant={'caption'} display={'block'}>
                            {`Member since ${joined}`}
                        </Typography>
                        <Typography>{`Email: ${userProfile.email}`}</Typography>
                        {userProfile.location && <Typography>{`Location: ${userProfile.location}`}</Typography>}
                        {userProfile.birthday && (
                            <Typography>
                                {`Birthday: ${userProfile.birthday} (Age ${differenceInYears(
                                    Date.now(),
                                    new Date(userProfile.birthday)
                                )})`}
                            </Typography>
                        )}
                        {userProfile.average && (
                            <Typography>{`Average: ${mapAverage(userProfile.average)}`}</Typography>
                        )}
                        {userProfile.goals && <Typography sx={{ lineHeight: 1.2 }}>{userProfile.goals}</Typography>}
                    </Stack>
                )}
                {!userProfile && (
                    <>
                        <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                        <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                        <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                        <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                    </>
                )}
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    color="secondary"
                    variant={'outlined'}
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
