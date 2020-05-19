import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGoogleAnalyticsPageView } from '../hooks';
import { AppState } from '../__types__';
import { verifyEmail } from '../redux/actions/registration-actions';
import { requestLogout } from '../redux/actions/auth-actions';
import { ROUTES } from '../constants/routes';
import { Banner } from '../components/display/Banner';
import { makeStyles, createStyles, Button, Typography, CircularProgress, useTheme } from '@material-ui/core';
import bg from '../assets/images/banners/landing.jpg';

const _getRegistrationErrorMessage = (code: number | null): string => {
    switch (code) {
        case 400302:
            return 'Oops! Your verification link is invalid. Please check your registration email and try again. If you continue to have problems, please contact us.';
        case 400303:
            return 'Your verification link has expired. You will need to re-register.';
        case 400304:
        case -1:
            return 'Your your email address has already been verified. Sign in to view your account.';
        default:
            return `Unknown Error: ${code}`;
    }
};

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            position: 'absolute',
            zIndex: 100,
            width: '80%',
            maxWidth: 512,
            color: 'white',
            textAlign: 'center',
        },
    })
);

export const VerifyEmailPage: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const { key } = useParams();
    useGoogleAnalyticsPageView();

    const verification = useSelector((state: AppState) => state.api.verifyEmail);
    const verifyStatus = verification.status;
    const loading = verifyStatus === 'loading';

    useEffect(() => {
        if (key) {
            dispatch(requestLogout());
            dispatch(verifyEmail(key));
        }
    }, [key, dispatch]);

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }} justify={'center'}>
                <div className={classes.form}>
                    {loading && (
                        <>
                            <CircularProgress color={'inherit'} />
                            <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                                Verifying your email address...
                            </Typography>
                        </>
                    )}
                    {verifyStatus === 'success' && (
                        <>
                            <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                                Your email address has been confirmed!
                            </Typography>
                            <Button
                                fullWidth
                                variant={'contained'}
                                color={'primary'}
                                onClick={(): void => {
                                    history.replace(ROUTES.PROFILE);
                                }}
                            >
                                {'Sign In'}
                            </Button>
                        </>
                    )}
                    {verifyStatus === 'failed' && (
                        <>
                            <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                                {_getRegistrationErrorMessage(verification.code)}
                            </Typography>
                        </>
                    )}
                </div>
            </Banner>
        </>
    );
};
