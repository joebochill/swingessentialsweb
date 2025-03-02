import React, { useEffect, useState } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGoogleAnalyticsPageView } from '../../src/hooks';
import { AppState } from '../../src/__types__';
import { resetUserPassword } from '../redux/actions/user-data-actions';
import { requestLogout } from '../redux/actions/auth-actions';
import { verifyResetPasswordCode } from '../redux/actions/registration-actions';
import { ROUTES } from '../../src/constants/routes';
import { btoa } from '../utilities/base64';
import { StyledTextField } from '../components/text/StyledInputs';
import { ErrorBox } from '../components/display/ErrorBox';
import { Banner } from '../components/display/Banner';
import {
    makeStyles,
    createStyles,
    Button,
    Typography,
    CircularProgress,
    InputAdornment,
    IconButton,
    useTheme,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import bg from '../assets/images/banners/landing.jpg';

const getErrorMessage = (code: number | null): string => {
    switch (code) {
        case 400300:
            return 'Oops! Your reset password link is invalid or may have already been used. Please check the link in your email and try again. If you continue to have problems, please contact us.';
        case 400301:
            return 'Your reset password link has expired. You will need to re-request a password reset.';
        case -1:
        default:
            return `Unknown Error: ${code || ''}`;
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

type PreRequestProps = {
    onSubmit: () => void;
};
const PreRequest: React.FC<PreRequestProps> = (props) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const verification = useSelector((state: AppState) => state.api.verifyReset);
    const status = verification.status;
    const loading = status === 'loading';

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            {loading && (
                <>
                    <CircularProgress color={'inherit'} />
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                        Verifying your reset request...
                    </Typography>
                </>
            )}
            {status === 'success' && (
                <>
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                        Enter your new password below:
                    </Typography>
                    <StyledTextField
                        type={showPassword ? 'text' : 'password'}
                        label={'New Password'}
                        placeholder={'Choose a new password'}
                        name={'password'}
                        value={password}
                        onChange={(e): void => {
                            setPassword(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={(): void => setShowPassword(!showPassword)}
                                        onMouseDown={(e): void => e.preventDefault()}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <StyledTextField
                        type={showConfirm ? 'text' : 'password'}
                        label={'Confirm Password'}
                        name={'confirm'}
                        value={confirm}
                        onChange={(e): void => {
                            setConfirm(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={(): void => setShowConfirm(!showConfirm)}
                                        onMouseDown={(e): void => e.preventDefault()}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <ErrorBox
                        show={confirm !== '' && password !== '' && password !== confirm}
                        message={'Passwords do not match.'}
                    />
                    <Button
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        onClick={
                            confirm !== '' && password !== '' && password === confirm
                                ? (): void => {
                                      dispatch(
                                          resetUserPassword({
                                              password: btoa(password),
                                              token: verification.data ? verification.data.resetToken || '' : '',
                                          })
                                      );
                                      props.onSubmit();
                                  }
                                : undefined
                        }
                    >
                        {'Set Password'}
                    </Button>
                </>
            )}
            {status === 'failed' && (
                <>
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                        {getErrorMessage(verification.code)}
                    </Typography>
                </>
            )}
        </>
    );
};

const PostRequest: React.FC = () => {
    const history = useHistory();
    const theme = useTheme();

    const verification = useSelector((state: AppState) => state.api.resetPassword);
    const status = verification.status;
    const loading = status === 'loading';

    return (
        <>
            {loading && (
                <>
                    <CircularProgress color={'inherit'} />
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                        Resetting your password...
                    </Typography>
                </>
            )}
            {status === 'success' && (
                <>
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                        Your password was successfully changed!
                    </Typography>
                    <Button
                        fullWidth
                        variant={'contained'}
                        color={'primary'}
                        onClick={(): void => {
                            history.replace(ROUTES.PROFILE);
                        }}
                    >
                        {'Go To Profile'}
                    </Button>
                </>
            )}
            {status === 'failed' && (
                <>
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                        Failed to change your password. Please try again later. If the problem persists, please contact
                        us.
                    </Typography>
                </>
            )}
        </>
    );
};

export const ResetPasswordPage: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { key } = useParams<{ key: string }>();
    useGoogleAnalyticsPageView();

    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
        if (key) {
            dispatch(requestLogout());
            dispatch(verifyResetPasswordCode(key));
        }
    }, [key, dispatch]);

    if (!key) return <Redirect to={ROUTES.LOGIN} />;

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }} justify={'center'}>
                <div className={classes.form}>
                    {requestSent && <PostRequest />}
                    {!requestSent && <PreRequest onSubmit={(): void => setRequestSent(true)} />}
                </div>
            </Banner>
        </>
    );
};
