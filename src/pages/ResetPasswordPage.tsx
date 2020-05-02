import React, { useEffect, useState } from 'react';
import bg from '../assets/images/banners/landing.jpg';

import {
    makeStyles,
    createStyles,
    Button,
    Typography,
    CircularProgress,
    InputAdornment,
    IconButton,
} from '@material-ui/core';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../__types__';
import { Banner } from '../components/display/Banner';
import { verifyResetPasswordCode } from '../redux/actions/registration-actions';
import { ROUTES } from '../constants/routes';
import { StyledTextField } from '../components/text/StyledInputs';
import { ErrorBox } from '../components/display/ErrorBox';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { resetUserPassword } from '../redux/actions/user-data-actions';
import { requestLogout } from '../redux/actions/auth-actions';
import { btoa } from '../utilities/base64';

const _getErrorMessage = (code: number): string => {
    switch (code) {
        case 400300:
            return 'Oops! Your reset password link is invalid or may have already been used. Please check your the link in your email and try again. If you continue to have problems, please contact us.';
        case 400301:
            return 'Your reset password link has expired. You will need to re-request a password reset.';
        case -1:
        default:
            return `Unknown Error: ${code}`;
    }
};

const useStyles = makeStyles(() =>
    createStyles({
        form: {
            position: 'absolute',
            // top: '50%',
            // transform: 'translateY(-50%)',
            zIndex: 100,
            width: '80%',
            maxWidth: 512,
            color: 'white',
            textAlign: 'center',
        },
    })
);

export const ResetPasswordPage: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { key } = useParams();

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

type PreRequestProps = {
    onSubmit: Function;
};
const PreRequest: React.FC<PreRequestProps> = (props) => {
    const dispatch = useDispatch();

    const verification = useSelector((state: AppState) => state.user.password);

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <>
            {verification.pending && (
                <>
                    <CircularProgress color={'inherit'} />
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: 16 }}>
                        Verifying your reset request...
                    </Typography>
                </>
            )}
            {!verification.pending && verification.codeValid && (
                <>
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: 16 }}>
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
                                      // history.replace(ROUTES.PROFILE);
                                      dispatch(
                                          resetUserPassword({
                                              password: btoa(password),
                                              token: verification.resetToken,
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
            {!verification.pending && !verification.codeValid && (
                <>
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: 16 }}>
                        {_getErrorMessage(verification.error)}
                    </Typography>
                </>
            )}
        </>
    );
};

const PostRequest: React.FC = () => {
    const history = useHistory();
    const verification = useSelector((state: AppState) => state.user.password);

    return (
        <>
            {verification.pending && (
                <>
                    <CircularProgress color={'inherit'} />
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: 16 }}>
                        Resetting your password...
                    </Typography>
                </>
            )}
            {!verification.pending && verification.resetSuccess && (
                <>
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: 16 }}>
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
            {!verification.pending && !verification.resetSuccess && (
                <>
                    <Typography variant={'h6'} align={'center'} style={{ marginBottom: 16 }}>
                        Failed to change your password. Please try again later. If the problem persists, please contact
                        us.
                    </Typography>
                </>
            )}
        </>
    );
};
