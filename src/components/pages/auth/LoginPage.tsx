import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    Button,
    Slide,
    Typography,
    InputAdornment,
    MenuItem,
    IconButton,
    Tooltip,
    SlideProps,
    Stack,
    CircularProgress,
    StackProps,
} from '@mui/material';
import { Visibility, VisibilityOff, Info } from '@mui/icons-material';

import bg from '../../../assets/images/banners/landing.jpg';
import { RootState } from '../../../redux/store';
import { EMAIL_REGEX } from '../../../constants';
import { ROUTES } from '../../../constants/routes';
import { usePrevious } from '../../../hooks';
import { useLoginMutation, useSendResetPasswordEmailMutation } from '../../../redux/apiServices/authService';
import {
    useCheckUsernameAvailabilityMutation,
    useCheckEmailAvailabilityMutation,
    useCreateNewUserAccountMutation,
} from '../../../redux/apiServices/registrationService';
import { resetLoginFailures } from '../../../redux/slices/authSlice';
import { ErrorBox } from '../../common/ErrorBox';
import { StyledTextField, StyledPassword } from '../../common/StyledInputs';
import { Banner } from '../../layout/Banner';
import { SimpleLink } from '../../navigation/SimpleLinks';

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

const formStyle = {
    zIndex: 100,
    width: '100%',
    maxWidth: 512,
    color: 'white',
};
const transformerStyle = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

type SignInFormProps = StackProps & {
    onChangeForm: (f: Form) => void;
};
const SignInForm = React.forwardRef<HTMLDivElement, SignInFormProps>((props, ref) => {
    const { onChangeForm, ...other } = props;

    const dispatch = useDispatch();
    const location = useLocation();
    const [login, { isSuccess: loggedIn, isLoading }] = useLoginMutation();

    const loginFailures = useSelector((state: RootState) => state.auth.loginFailures);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { from } = location && location.state ? location.state : { from: { pathname: ROUTES.HOME } };

    const resetForm = useCallback(() => {
        setUsername('');
        setPassword('');
        setPassword('');
        setErrorMessage('');
        dispatch(resetLoginFailures());
    }, [setUsername, setPassword, setErrorMessage, dispatch]);

    useEffect(() => {
        if (loginFailures > 0) {
            setPassword('');
            setErrorMessage('Your username / password was not correct. Please try again.');
        }
    }, [loginFailures]);

    if (loggedIn) {
        return <Navigate to={from} replace />;
    }
    return (
        <Stack sx={formStyle} spacing={2} ref={ref} {...other}>
            <StyledTextField
                label={'Username'}
                placeholder={'Username or Email'}
                name={'username'}
                value={username}
                onChange={(e): void => {
                    setUsername(e.target.value);
                }}
            />
            <StyledPassword
                label={'Password'}
                name={'password'}
                value={password}
                onChange={(e): void => {
                    setPassword(e.target.value);
                }}
                onKeyDown={
                    username && password
                        ? (e): void => {
                              if (e.key === 'Enter') {
                                  login({ username, password });
                              }
                          }
                        : undefined
                }
                color={'secondary'}
            />
            <ErrorBox message={errorMessage} />
            <Button
                fullWidth
                variant={'contained'}
                color={'primary'}
                onClick={
                    !isLoading
                        ? username && password
                            ? (): void => {
                                  login({ username, password });
                              }
                            : (): void => setErrorMessage('You need to enter your username / password first.')
                        : undefined
                }
            >
                {isLoading ? <CircularProgress color={'inherit'} size={28} /> : 'Sign In'}
            </Button>
            <Stack direction={'row'} justifyContent={'space-between'}>
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
            </Stack>
        </Stack>
    );
});
SignInForm.displayName = 'SignInForm';

type RegisterFormProps = StackProps & {
    onChangeForm: (f: Form) => void;
};
const RegisterForm = React.forwardRef<HTMLDivElement, RegisterFormProps>((props, ref) => {
    const { onChangeForm, ...other } = props;

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [acquisition, setAcquisition] = useState<Acquisition | ''>('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [checkUsernameAvailability, { data: usernameAvailable, reset: resetUsernameCheck }] =
        useCheckUsernameAvailabilityMutation();
    const [checkEmailAvailability, { data: emailAvailable, reset: resetEmailCheck }] =
        useCheckEmailAvailabilityMutation();
    const [
        createNewUserAccount,
        { isSuccess: registeredSuccessfully, isUninitialized, isLoading, reset: resetRegistration },
    ] = useCreateNewUserAccountMutation();

    const usernameTaken = username !== '' && usernameAvailable === false;
    const emailTaken = email !== '' && emailAvailable === false;

    const resetForm = useCallback(() => {
        setEmail('');
        setUsername('');
        setPassword('');
        setAcquisition('');
        setShowPassword(false);
        setErrorMessage('');
    }, []);

    useEffect(() => {
        if (isUninitialized || isLoading) {
            return;
        }
        if (!registeredSuccessfully) {
            setErrorMessage(
                'Your account registration has failed. Please try again later and contact us if the problem continues.'
            );
        } else if (registeredSuccessfully) {
            navigate(ROUTES.PROFILE);
            // googleAnalyticsConversion(`https://swingessentials.com/register-complete`);
            resetForm();
            resetEmailCheck();
            resetUsernameCheck();
            resetRegistration();
        }
    }, [registeredSuccessfully, isUninitialized, isLoading, resetForm]);

    return (
        <Stack sx={formStyle} spacing={2} {...other} ref={ref}>
            <StyledTextField
                label={'Username'}
                name={'new-username'}
                value={username}
                error={usernameTaken}
                helperText={usernameTaken ? 'Username is already registered.' : undefined}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip
                                    title={`Username may contain Letters, Numbers, and Special Characters (-_.$#@!+). Spaces are NOT permitted.`}
                                >
                                    <Info style={{ cursor: 'context-menu' }} />
                                </Tooltip>
                            </InputAdornment>
                        ),
                    },
                }}
                onChange={(e): void => {
                    setUsername(e.target.value.replace(/[^A-Z0-9-_.$#@!+]/gi, '').substring(0, 32));
                    resetUsernameCheck();
                }}
                onBlur={(): void => {
                    if (username) checkUsernameAvailability(username);
                }}
            />
            <StyledTextField
                label={'Email Address'}
                name={'email'}
                value={email}
                error={emailTaken}
                helperText={emailTaken ? 'Email address is already registered.' : undefined}
                onChange={(e): void => {
                    setEmail(e.target.value.substring(0, 128));
                    resetEmailCheck();
                }}
                onBlur={(): void => {
                    if (email) checkEmailAvailability(email);
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
                slotProps={{
                    input: {
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
                    },
                }}
            />
            <StyledTextField
                select
                label={`How'd you find us?`}
                name={'acquisition'}
                value={acquisition}
                onChange={(e): void => setAcquisition(e.target.value as Acquisition)}
            >
                {acquisitionMenuItems.map((item, index) => (
                    <MenuItem key={`option_${index}`} value={item}>
                        {item}
                    </MenuItem>
                ))}
            </StyledTextField>

            <ErrorBox message={errorMessage} />
            <Button
                fullWidth
                variant={'contained'}
                color={'primary'}
                onClick={
                    !isLoading
                        ? email && EMAIL_REGEX.test(email) && !emailTaken && !usernameTaken && password && acquisition
                            ? (): void => {
                                  createNewUserAccount({
                                      username,
                                      email,
                                      password,
                                      acquisition,
                                  });
                              }
                            : (): void => setErrorMessage('Please make sure all fields are filled.')
                        : undefined
                }
            >
                {isLoading ? <CircularProgress color={'inherit'} size={28} /> : `Create Account`}
            </Button>
            <Stack direction={'row'} justifyContent={'flex-start'}>
                <SimpleLink
                    label={'Back to Sign In'}
                    onClick={(): void => {
                        onChangeForm('login' as Form);
                        resetForm();
                        resetEmailCheck();
                        resetUsernameCheck();
                    }}
                />
            </Stack>
        </Stack>
    );
});
RegisterForm.displayName = 'RegisterForm';

type ForgotFormProps = StackProps & {
    onChangeForm: (f: Form) => void;
};
const ForgotForm = React.forwardRef<HTMLDivElement, ForgotFormProps>((props, ref) => {
    const { onChangeForm, ...other } = props;

    const [sendResetPasswordEmail] = useSendResetPasswordEmailMutation();

    const [email, setEmail] = useState('');
    const [complete, setComplete] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <Stack sx={formStyle} spacing={2} {...other} ref={ref}>
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
                <Typography variant={'h6'} align={'center'}>
                    {`Your request was received — if there is an account registered to that email address, you will receive an email with instructions to reset your password.`}
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
                                sendResetPasswordEmail(email);
                                setComplete(true);
                            }
                          : (): void => setErrorMessage('You need to enter a valid email address.')
                }
            >
                {complete ? ' Back to Sign In' : 'Send Reset Instructions'}
            </Button>
            {!complete && (
                <Stack direction={'row'} justifyContent={'flex-end'}>
                    <SimpleLink label={'Back to Sign In'} onClick={(): void => onChangeForm('login' as Form)} />
                </Stack>
            )}
            {/* {!complete && (
          <div
            className={classes.linkContainer}
            style={{ justifyContent: "flex-end" }}
          ></div>
        )} */}
        </Stack>
    );
});
ForgotForm.displayName = 'ForgotForm';

export const LoginPage: React.FC = () => {
    const location = useLocation();
    // const navigate = useNavigate();
    // useGoogleAnalyticsPageView();

    // const token = useSelector((state: RootState) => state.auth.token);
    // const [
    //   createNewUserAccount,
    //   { data: registeredSuccessfully, isLoading: registering },
    // ] = useCreateNewUserAccountMutation();

    const { initialPage } = location && location.state ? location.state : { initialPage: 'login' };

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

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }} className={'banner'} sx={{ overflow: 'hidden' }}>
                {
                    <Slide
                        direction={loginSlideDirection}
                        in={isLogin}
                        timeout={{
                            enter: 500,
                            exit: 250,
                        }}
                    >
                        <Stack
                            direction={'row'}
                            alignItems={'center'}
                            justifyContent={'center'}
                            className={'slideStack'}
                            sx={[transformerStyle]}
                        >
                            <SignInForm onChangeForm={(f: Form): void => setForm(f)} />
                        </Stack>
                    </Slide>
                }
                {
                    <Slide
                        direction={'left'}
                        in={isRegister}
                        timeout={{
                            enter: 500,
                            exit: 250,
                        }}
                    >
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={transformerStyle}>
                            <RegisterForm onChangeForm={(f: Form): void => setForm(f)} />
                        </Stack>
                    </Slide>
                }
                {
                    <Slide
                        direction={'right'}
                        in={isForgot}
                        timeout={{
                            enter: 500,
                            exit: 250,
                        }}
                    >
                        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} sx={transformerStyle}>
                            <ForgotForm onChangeForm={(f: Form): void => setForm(f)} />
                        </Stack>
                    </Slide>
                }
            </Banner>
        </>
    );
};
