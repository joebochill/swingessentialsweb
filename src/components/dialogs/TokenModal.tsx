import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../__types__';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { refreshToken, checkToken, requestLogout } from '../../redux/actions/auth-actions';
import { formatTimer } from '../../utilities/date';
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
    useTheme,
} from '@material-ui/core';
import { Update } from '@material-ui/icons';

const Transition = React.forwardRef(
    (props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) => (
        <Zoom in ref={ref} {...props} />
    )
);
Transition.displayName = 'ZoomTransition';

type TokenModalProps = Omit<DialogProps, 'open'>;
export const TokenModal: React.FC<TokenModalProps> = (props) => {
    const { ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();
    const theme = useTheme();

    const token = useSelector((state: AppState) => state.auth.token);
    const role = useSelector((state: AppState) => state.auth.role);

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
        if (role === 'pending') {
            const interval = setInterval(() => {
                dispatch(checkToken());
            }, 20 * 1000);
            return (): void => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        // set the time remaining on login/logout
        if (token) {
            const exp = JSON.parse(atob(token.split('.')[1])).exp;
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
                const exp = JSON.parse(atob(token.split('.')[1])).exp;
                setTimeRemaining(exp - Date.now() / 1000);
            }, updateRate * 1000);
            updateRefreshRate();
        } else {
            dispatch(requestLogout());
        }

        return (): void => clearInterval(interval);
    }, [timeRemaining, engageCountdown, token, updateRate, updateRefreshRate, dispatch]);

    return (
        <Dialog
            {...dialogProps}
            disableBackdropClick
            transitionDuration={500}
            TransitionComponent={Transition}
            open={token !== null && timeRemaining <= 3 * 60 && timeRemaining > 0}
            style={{ zIndex: 100000 }}
        >
            <DialogTitle disableTypography>
                <Typography variant={'h6'} style={{ display: 'flex', alignItems: 'center' }}>
                    <Update style={{ fontSize: 40, marginRight: theme.spacing(1) }} />
                    {`Session Expiration in ${formatTimer(timeRemaining)}`}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>Your session is about to expire. Click below to stay logged in.</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    fullWidth
                    variant={'contained'}
                    onClick={(e): void => {
                        onClose(e, 'backdropClick');
                        dispatch(refreshToken());
                    }}
                >
                    Keep Me Logged In
                </Button>
            </DialogActions>
        </Dialog>
    );
};
