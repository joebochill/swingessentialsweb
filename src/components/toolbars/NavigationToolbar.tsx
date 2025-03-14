import React, { JSX } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../constants/routes';
import { SimpleRouterLink } from '../navigation/SimpleLinks';
import { UserMenu } from '../navigation/menu/UserMenu';
import {
    AppBar,
    Button,
    Toolbar,
    Theme,
    IconButton,
    useMediaQuery,
    Box,
    Stack,
    useColorScheme,
    Tooltip,
    IconButtonProps,
} from '@mui/material';
import { DarkMode, InvertColors, LightMode, Menu } from '@mui/icons-material';
import logo from '../../assets/icons/logo-full-white.svg';
import { RootState } from '../../redux/store';
import { openDrawer } from '../../redux/slices/navigationSlice';
import { useDarkMode } from '../../hooks';

type ThemeType = 'light' | 'dark' | 'system';
export const ThemeToggleButton: React.FC<IconButtonProps> = (props): JSX.Element => {
    const { sx, ...other } = props;
    const { mode, setMode } = useColorScheme();
    const { isDarkMode } = useDarkMode();

    const handleThemeChange = (theme: ThemeType) => {
        setMode(theme);
    };
    return (
        <Tooltip title={'Toggle theme'} placement="right">
            <IconButton
                sx={[{ color: 'inherit' }, ...(Array.isArray(sx) ? sx : [sx])]}
                onClick={() => handleThemeChange(isDarkMode ? 'light' : 'dark')}
                {...other}
            >
                {mode === 'dark' ? <DarkMode /> : mode === 'light' ? <LightMode /> : <InvertColors />}
            </IconButton>
        </Tooltip>
    );
};

export const NavigationToolbar: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();
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
                        {!token && !smDown && (
                            <Button
                                variant={'outlined'}
                                color={'inherit'}
                                onClick={(): void => {
                                    navigate(ROUTES.LOGIN, {
                                        state: { from: { pathname: location.pathname } },
                                    });
                                }}
                            >
                                SIGN IN
                            </Button>
                        )}
                        <IconButton
                            sx={{
                                color: 'inherit',
                                mr: (t) => `${t.spacing(-2)} !important`,
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
