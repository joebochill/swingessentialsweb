import React, { useState, useEffect, HTMLAttributes, useCallback } from 'react';
import { useLocation, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { usePrevious, useGoogleAnalyticsPageView, googleAnalyticsConversion } from '../hooks';

import { AppState } from '../__types__';
import { LOGIN, CREATE_ACCOUNT } from '../redux/actions/types';
import { requestLogin } from '../redux/actions/auth-actions';
import {
    requestPasswordReset,
    createAccount,
    checkUsernameAvailability,
    checkEmailAvailability,
    resetRegistrationAvailabilityChecks,
} from '../redux/actions/registration-actions';
import { ROUTES } from '../constants/routes';
import { EMAIL_REGEX } from '../constants';

import { StyledTextField, StyledSelect } from '../components/text/StyledInputs';
import { Banner } from '../components/display/Banner';
import { ErrorBox } from '../components/display/ErrorBox';
import { SimpleLink } from '../components/navigation/SimpleLink';
import {
    makeStyles,
    createStyles,
    Button,
    Slide,
    Theme,
    Typography,
    InputAdornment,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    Tooltip,
    SlideProps,
    useTheme,
} from '@material-ui/core';
import { Visibility, VisibilityOff, Info } from '@material-ui/icons';

import bg from '../assets/images/banners/landing.jpg';

type Form = 'login' | 'register' | 'forgot';
type Acquisition =
    | 'In-person Lesson'
    | 'From a Friend'
    | 'Google Search'
    | 'Online Ad'
    | 'Golf Course Ad'
    | 'Social Media'
    | 'Youtube'
    | 'Other';

const acquisitionMenuItems: Acquisition[] = [
    'In-person Lesson',
    'From a Friend',
    'Google Search',
    'Online Ad',
    'Golf Course Ad',
    'Social Media',
    'Youtube',
    'Other',
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        transformer: {
            height: '100%',
            maxWidth: '100%',
            margin: '0 auto',
            top: 0,
            display: 'flex',
            alignItems: 'center',
        },
        form: {
            zIndex: 100,
            width: '100%',
            maxWidth: 512,
            color: 'white',
        },
        linkContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: theme.spacing(2),
        },
    })
);

type SignInFormProps = HTMLAttributes<HTMLDivElement> & {
    onChangeForm: (f: Form) => void;
};
const SignInForm = React.forwardRef<HTMLDivElement, SignInFormProps>((props, ref) => {
    const { onChangeForm, ...other } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const failCount = useSelector((state: AppState) => state.api.authentication.data.failures);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const resetForm = useCallback(() => {
        setUsername('');
        setPassword('');
        setPassword('');
        setErrorMessage('');
        dispatch({ type: LOGIN.RESET });
    }, [setUsername, setPassword, setErrorMessage, dispatch]);

    useEffect(() => {
        if (failCount > 0) {
            setPassword('');
            setErrorMessage('Your username / password was not correct. Please try again.');
        }
    }, [failCount, setPassword, setErrorMessage]);

    return (
        <div className={classes.form} ref={ref} {...other}>
            <StyledTextField
                label={'Username'}
                placeholder={'Username or Email'}
                name={'username'}
                value={username}
                onChange={(e): void => {
                    setUsername(e.target.value);
                }}
            />
            <StyledTextField
                type={'password'}
                label={'Password'}
                name={'password'}
                value={password}
                onChange={(e): void => {
                    setPassword(e.target.value);
                }}
                onKeyPress={
                    username && password
                        ? (e): void => {
                              if (e.key === 'Enter') {
                                  dispatch(requestLogin({ username, password }));
                              }
                          }
                        : undefined
                }
            />
            <ErrorBox message={errorMessage} />
            <Button
                fullWidth
                variant={'contained'}
                color={'primary'}
                onClick={
                    username && password
                        ? (): void => {
                              dispatch(requestLogin({ username, password }));
                          }
                        : (): void => setErrorMessage('You need to enter your username / password first.')
                }
            >
                Sign In
            </Button>
            <div className={classes.linkContainer}>
                <SimpleLink
                    label={'Forgot Password?'}
                    onClick={(): void => {
                        onChangeForm('forgot' as Form);
                        resetForm();
                    }}
                />
                <SimpleLink
                    label={'Need an Account?'}
                    onClick={(): void => {
                        onChangeForm('register' as Form);
                        resetForm();
                    }}
                />
            </div>
        </div>
    );
});
SignInForm.displayName = 'SignInForm';

type RegisterFormProps = HTMLAttributes<HTMLDivElement> & {
    onChangeForm: (f: Form) => void;
};
const RegisterForm = React.forwardRef<HTMLDivElement, RegisterFormProps>((props, ref) => {
    const { onChangeForm, ...other } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const createAccountStatus = useSelector((state: AppState) => state.api.createAccount.status);
    const usernameStatus = useSelector((state: AppState) => state.api.checkUsername);
    const emailStatus = useSelector((state: AppState) => state.api.checkEmail);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [acquisition, setAcquisition] = useState<Acquisition | ''>('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const usernameTaken = usernameStatus.status === 'success' && !usernameStatus.data.available;
    const emailTaken = emailStatus.status === 'success' && !emailStatus.data.available;

    const resetForm = useCallback(() => {
        setEmail('');
        setUsername('');
        setPassword('');
        setAcquisition('');
        setShowPassword(false);
        setErrorMessage('');
        dispatch(resetRegistrationAvailabilityChecks());
    }, [setEmail, setUsername, setPassword, setAcquisition, setShowPassword, setErrorMessage, dispatch]);

    useEffect(() => {
        // Registration finished
        if (createAccountStatus === 'failed') {
            // if (!registration.success) {
            setErrorMessage(
                'Your account registration has failed. Please try again later and contact us if the problem continues.'
            );
            // }
        }
        // Registration finished
        if (createAccountStatus === 'success') {
            resetForm();
        }
    }, [createAccountStatus, setErrorMessage, resetForm]);

    return (
        <div className={classes.form} {...other} ref={ref}>
            <StyledTextField
                label={'Username'}
                name={'new-username'}
                value={username}
                error={username !== '' && usernameTaken}
                helperText={username !== '' && usernameTaken ? 'Username is already registered.' : undefined}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip
                                title={`Username may contain Letters, Numbers, and Special Characters (-_.$#@!+). Spaces are NOT permitted.`}
                            >
                                <Info style={{ cursor: 'context-menu' }} />
                            </Tooltip>
                        </InputAdornment>
                    ),
                }}
                onChange={(e): void => {
                    setUsername(e.target.value.replace(/[^A-Z0-9-_.$#@!+]/gi, '').substr(0, 32));
                }}
                onBlur={(): void => {
                    if (username) dispatch(checkUsernameAvailability(username));
                }}
            />
            <StyledTextField
                label={'Email Address'}
                name={'email'}
                value={email}
                error={email !== '' && emailTaken}
                helperText={email !== '' && emailTaken ? 'Email address is already registered.' : undefined}
                onChange={(e): void => {
                    setEmail(e.target.value.substr(0, 128));
                }}
                onBlur={(): void => {
                    if (email) dispatch(checkEmailAvailability(email));
                }}
            />
            <StyledTextField
                type={showPassword ? 'text' : 'password'}
                label={'Password'}
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
            <FormControl variant="filled" fullWidth>
                <InputLabel id="acquisition-label">{`How'd you find us?`}</InputLabel>
                <StyledSelect
                    labelId="acquisition-label"
                    value={acquisition}
                    onChange={(e): void => setAcquisition(e.target.value as Acquisition)}
                >
                    {acquisitionMenuItems.map((item, index) => (
                        <MenuItem key={`option_${index}`} value={item}>
                            {item}
                        </MenuItem>
                    ))}
                </StyledSelect>
            </FormControl>

            <ErrorBox message={errorMessage} />
            <Button
                fullWidth
                variant={'contained'}
                color={'primary'}
                onClick={
                    email && EMAIL_REGEX.test(email) && !emailTaken && username && !usernameTaken && password
                        ? (): void => {
                              dispatch(
                                  createAccount({
                                      username,
                                      email,
                                      password,
                                      heard: acquisition,
                                  })
                              );
                          }
                        : (): void => setErrorMessage('Please make sure all fields are filled.')
                }
            >
                Create Account
            </Button>
            <div className={classes.linkContainer}>
                <SimpleLink
                    label={'Back to Sign In'}
                    onClick={(): void => {
                        onChangeForm('login' as Form);
                        resetForm();
                    }}
                />
            </div>
        </div>
    );
});
RegisterForm.displayName = 'RegisterForm';

type ForgotFormProps = HTMLAttributes<HTMLDivElement> & {
    onChangeForm: (f: Form) => void;
};
const ForgotForm = React.forwardRef<HTMLDivElement, ForgotFormProps>((props, ref) => {
    const { onChangeForm, ...other } = props;

    const classes = useStyles();
    const dispatch = useDispatch();
    const theme = useTheme();

    const [email, setEmail] = useState('');
    const [complete, setComplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <div className={classes.form} {...other} ref={ref}>
            {!complete && (
                <>
                    <StyledTextField
                        fullWidth
                        label={'Email Address'}
                        placeholder={'Enter your email address'}
                        name={'email'}
                        value={email}
                        onChange={(e): void => {
                            setEmail(e.target.value);
                        }}
                    />
                    <ErrorBox message={errorMessage} />
                </>
            )}
            {complete && (
                <Typography variant={'h6'} align={'center'} style={{ marginBottom: theme.spacing(2) }}>
                    Your password reset request was received. Check your email for further instructions.
                </Typography>
            )}
            <Button
                fullWidth
                variant={'contained'}
                color={'primary'}
                onClick={
                    complete
                        ? (): void => {
                              onChangeForm('login' as Form);
                              setComplete(false);
                              setEmail('');
                              setErrorMessage('');
                          }
                        : email && EMAIL_REGEX.test(email)
                        ? (): void => {
                              dispatch(requestPasswordReset({ email }));
                              setComplete(true);
                          }
                        : (): void => setErrorMessage('You need to enter a valid email address.')
                }
            >
                {complete ? ' Back to Sign In' : 'Send Reset Instructions'}
            </Button>
            {!complete && (
                <div className={classes.linkContainer} style={{ justifyContent: 'flex-end' }}>
                    <SimpleLink label={'Back to Sign In'} onClick={(): void => onChangeForm('login' as Form)} />
                </div>
            )}
        </div>
    );
});
ForgotForm.displayName = 'ForgotForm';

export const LoginPage: React.FC = () => {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    useGoogleAnalyticsPageView();

    const token = useSelector((state: AppState) => state.auth.token);
    const registration = useSelector((state: AppState) => state.api.createAccount.status);

    // @ts-ignore
    const { from, initialPage } = location && location.state ? location.state : { from: { pathname: ROUTES.HOME } };

    const [form, setForm] = useState<Form>(initialPage || 'login');
    const previousForm = usePrevious(form);

    const isLogin = form === 'login';
    const isForgot = form === 'forgot';
    const isRegister = form === 'register';

    let loginSlideDirection: SlideProps['direction'] = 'up';
    if (previousForm !== undefined) {
        if (previousForm === 'login') {
            if (form === 'register') loginSlideDirection = 'right';
            else if (form === 'forgot') loginSlideDirection = 'left';
        } else {
            if (previousForm === 'register') loginSlideDirection = 'right';
            else if (previousForm === 'forgot') loginSlideDirection = 'left';
        }
    }

    useEffect(() => {
        if (token) {
            if (registration === 'success') {
                history.push(ROUTES.PROFILE);
                googleAnalyticsConversion(`https://swingessentials.com/register-complete`);
                dispatch({ type: CREATE_ACCOUNT.RESET });
            }
        }
    }, [token, registration, history, dispatch]);

    if (token && registration !== 'success') return <Redirect to={from} />;

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }} justify={'center'}>
                {
                    <Slide
                        direction={loginSlideDirection}
                        in={isLogin}
                        style={{ position: form === 'login' ? 'static' : 'absolute' }}
                        timeout={{
                            enter: 500,
                            exit: 250,
                        }}
                    >
                        <div className={classes.transformer}>
                            <SignInForm onChangeForm={(f: Form): void => setForm(f)} />
                        </div>
                    </Slide>
                }
                {
                    <Slide
                        direction={'left'}
                        in={isRegister}
                        style={{ position: isRegister ? 'static' : 'absolute' }}
                        timeout={{
                            enter: 500,
                            exit: 250,
                        }}
                    >
                        <div className={classes.transformer}>
                            <RegisterForm onChangeForm={(f: Form): void => setForm(f)} />
                        </div>
                    </Slide>
                }
                {
                    <Slide
                        direction={'right'}
                        in={isForgot}
                        style={{ position: isForgot ? 'static' : 'absolute' }}
                        timeout={{
                            enter: 500,
                            exit: 250,
                        }}
                    >
                        <div className={classes.transformer}>
                            <ForgotForm onChangeForm={(f: Form): void => setForm(f)} />
                        </div>
                    </Slide>
                }
                {/* </div> */}
            </Banner>
        </>
    );
};
