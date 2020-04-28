import React from 'react';
import {
    AppBar,
    Toolbar as MuiToolbar,
    Link,
    LinkProps,
    makeStyles,
    createStyles,
    Theme,
    useTheme,
    Hidden,
    IconButton,
} from '@material-ui/core';
import logo from '../assets/icons/logo-full-white.svg';
import { Spacer } from '@pxblue/react-components';
import { UserMenu } from '../components/UserMenu';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { Menu } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { ROUTES } from '../constants/routes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            cursor: 'pointer',
            color: theme.palette.primary.main,
            height: theme.spacing(5),
            width: theme.spacing(5),
            backgroundColor: 'white',
            fontWeight: 600,
            fontFamily: 'Roboto Mono',
        },
        navLink: {
            fontWeight: 400,
            textDecoration: 'none',
            color: '#ffffff',
            marginLeft: theme.spacing(2),
            userSelect: 'none',
            '&:hover': {
                // textDecoration: 'none',
                // fontWeight: 600,
            },
        },
        toolbar: {
            padding: `0 ${theme.spacing(2)}px`,
        },
    })
);
type NavLinkProps = LinkProps & {
    title: string;
    to: string;
};
export const NavLink: React.FC<NavLinkProps> = (props) => {
    const classes = useStyles();
    return (
        <Link component={RouterLink} to={props.to} color={'inherit'} className={clsx(classes.navLink, props.className)}>
            {props.title}
        </Link>
    );
};

export const Toolbar: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();

    return (
        <AppBar position={'sticky'}>
            <MuiToolbar className={classes.toolbar}>
                <img
                    src={logo}
                    alt={'Swing Essentials Logo'}
                    onClick={(): void => {
                        history.push(ROUTES.HOME);
                    }}
                    style={{ cursor: 'pointer' }}
                />
                <Spacer />
                <Hidden smDown>
                    <NavLink to={ROUTES.PROS} title={'Meet Our Pros'} />
                    <NavLink to={ROUTES.TIPS} title={'Tip of the Month'} />
                    <NavLink to={ROUTES.BLOG} title={'The 19th Hole'} />
                    <Spacer flex={0} width={theme.spacing(2)} />
                    <UserMenu />
                </Hidden>
                <Hidden mdUp>
                    <IconButton
                        style={{ color: 'inherit', marginRight: theme.spacing(-2) }}
                        onClick={(): void => {
                            dispatch({ type: 'OPEN_DRAWER' });
                        }}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </MuiToolbar>
        </AppBar>
    );
};
