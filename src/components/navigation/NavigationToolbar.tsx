import React, { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../constants/routes';
import { AppBar, Toolbar, Theme, IconButton, useMediaQuery, Box, Stack } from '@mui/material';
import { Menu } from '@mui/icons-material';
import logo from '../../assets/icons/logo-full-white.svg';
import { RootState } from '../../redux/store';
import { openDrawer } from '../../redux/slices/navigationSlice';
import { SimpleRouterLink } from './SimpleLinks';
import { UserMenu } from './UserMenu';
import { SignInButton } from './SignInButton';

export const NavigationToolbar: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    const token = useSelector((state: RootState) => state.auth.token);

    return (
        <AppBar position={'sticky'}>
            <Toolbar
                sx={{
                    minHeight: { xs: 64 },
                    px: { xs: 2 },
                    py: 0,
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    component={'img'}
                    src={logo}
                    alt={'Swing Essentials Logo'}
                    onClick={(): void => {
                        navigate(ROUTES.HOME);
                    }}
                    sx={{ cursor: 'pointer' }}
                />

                {mdUp && (
                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                        <SimpleRouterLink to={ROUTES.PROS} label={'Meet Our Pros'} />
                        <SimpleRouterLink to={ROUTES.TIPS} label={'Tip of the Month'} />
                        <SimpleRouterLink to={ROUTES.BLOG} label={'The 19th Hole'} />
                        <UserMenu />
                    </Stack>
                )}

                {!mdUp && (
                    <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
                        {!token && !smDown && <SignInButton />}
                        <IconButton
                            sx={{
                                color: 'inherit',
                                mr: (t) => `${t.spacing(-1)} !important`,
                            }}
                            onClick={(): void => {
                                dispatch(openDrawer());
                            }}
                        >
                            <Menu />
                        </IconButton>
                    </Stack>
                )}
            </Toolbar>
        </AppBar>
    );
};
