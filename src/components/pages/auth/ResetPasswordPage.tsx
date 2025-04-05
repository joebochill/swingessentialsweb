import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Button, Typography, CircularProgress, Stack } from '@mui/material';
import bg from '../../../assets/images/banners/landing.jpg';
import { ROUTES } from '../../../constants/routes';
import {
    useLogoutMutation,
    useVerifyResetPasswordCodeMutation,
    useResetPasswordMutation,
} from '../../../redux/apiServices/authService';
import { ErrorBox } from '../../common/ErrorBox';
import { StyledPassword } from '../../common/StyledInputs';
import { Banner } from '../../layout/Banner';

export const ResetPasswordPage: React.FC = () => {
    const { key } = useParams<{ key: string }>();

    // useGoogleAnalyticsPageView();

    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const [verifyResetPasswordCode, { isLoading: verifying, error: verifyError, data: { auth } = {} }] =
        useVerifyResetPasswordCodeMutation();
    const [resetPassword, { isLoading: changingPassword, isUninitialized, isSuccess, error: changeError }] =
        useResetPasswordMutation();

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    useEffect(() => {
        if (key) {
            logout();
            verifyResetPasswordCode(key);
        }
    }, [key]);

    if (!key) return <Navigate to={ROUTES.LOGIN} replace />;

    const loading = verifying || changingPassword;

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }} justifyContent={'center'}>
                <Stack
                    sx={{
                        width: '80%',
                        maxWidth: 512,
                        color: 'white',
                        textAlign: 'center',
                    }}
                    spacing={2}
                    alignItems={'center'}
                >
                    <>
                        {loading && (
                            <>
                                <CircularProgress color={'inherit'} />
                                <Typography variant={'h6'} align={'center'}>
                                    {verifying ? 'Verifying your reset request...' : 'Resetting your password...'}
                                </Typography>
                            </>
                        )}
                        {auth && isUninitialized && !loading && (
                            <>
                                <Typography variant={'h6'} align={'center'}>
                                    Enter your new password below:
                                </Typography>
                                <StyledPassword
                                    label={'New Password'}
                                    placeholder={'Choose a new password'}
                                    name={'password'}
                                    value={password}
                                    onChange={(e): void => {
                                        setPassword(e.target.value);
                                    }}
                                    color="secondary"
                                />
                                <StyledPassword
                                    label={'Confirm Password'}
                                    name={'confirm'}
                                    value={confirm}
                                    onChange={(e): void => {
                                        setConfirm(e.target.value);
                                    }}
                                    color="secondary"
                                />
                                <ErrorBox
                                    show={confirm !== '' && password !== '' && password !== confirm}
                                    message={'Passwords do not match.'}
                                    sx={{ alignSelf: 'stretch' }}
                                />
                                <Button
                                    fullWidth
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={
                                        confirm !== '' && password !== '' && password === confirm
                                            ? (): void => {
                                                  resetPassword({
                                                      password: btoa(password),
                                                      token: auth,
                                                  });
                                              }
                                            : undefined
                                    }
                                >
                                    {'Set Password'}
                                </Button>
                            </>
                        )}
                        {!isUninitialized && isSuccess && (
                            <>
                                <Typography variant={'h6'} align={'center'}>
                                    Your password was successfully changed!
                                </Typography>
                                <Button
                                    fullWidth
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={(): void => {
                                        navigate(ROUTES.PROFILE, { replace: true });
                                    }}
                                >
                                    {'Go To Profile'}
                                </Button>
                            </>
                        )}
                        {(verifyError || changeError) && (
                            <>
                                <Typography variant={'h6'} align={'center'}>
                                    {(changeError || verifyError) as string}
                                </Typography>
                            </>
                        )}
                    </>
                </Stack>
            </Banner>
        </>
    );
};
