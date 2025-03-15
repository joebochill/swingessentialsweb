import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Typography, CircularProgress, Stack } from '@mui/material';
import bg from '../../../assets/images/banners/landing.jpg';
import { ROUTES } from '../../../constants/routes';
import { useLogoutMutation } from '../../../redux/apiServices/authService';
import { useVerifyUserEmailMutation } from '../../../redux/apiServices/registrationService';
import { Banner } from '../../layout/Banner';

export const VerifyEmailPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    const [verifyUserEmail, { isLoading, error, isUninitialized, isSuccess }] = useVerifyUserEmailMutation();

    const { key } = useParams<{ key: string }>();
    // useGoogleAnalyticsPageView();

    useEffect(() => {
        if (key) {
            logout();
            verifyUserEmail(key);
        }
    }, [key, dispatch]);

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%' }} justifyContent={'center'}>
                <Stack
                    spacing={2}
                    alignItems={'center'}
                    sx={{
                        width: '80%',
                        maxWidth: 512,
                        color: 'primary.contrastText',
                        textAlign: 'center',
                    }}
                >
                    {isLoading && (
                        <>
                            <CircularProgress color={'inherit'} />
                            <Typography variant={'h6'} align={'center'}>
                                Verifying your email address...
                            </Typography>
                        </>
                    )}
                    {!isUninitialized && !isLoading && isSuccess && (
                        <>
                            <Typography variant={'h6'} align={'center'} sx={{ mb: 2 }}>
                                Your email address has been confirmed!
                            </Typography>
                            <Button
                                fullWidth
                                variant={'contained'}
                                color={'primary'}
                                onClick={(): void => {
                                    navigate(ROUTES.PROFILE);
                                }}
                            >
                                {'Sign In'}
                            </Button>
                        </>
                    )}
                    {!isUninitialized && !isLoading && error && (
                        <>
                            <Typography variant={'h6'} align={'center'}>
                                {error as string}
                            </Typography>
                        </>
                    )}
                </Stack>
            </Banner>
        </>
    );
};
