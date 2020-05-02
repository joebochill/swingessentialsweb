import React from 'react';
import {
    AppBar,
    Button,
    Toolbar as MuiToolbar,
    makeStyles,
    createStyles,
    Theme,
    useTheme,
    Hidden,
    IconButton,
} from '@material-ui/core';
import logo from '../../assets/icons/logo-full-white.svg';
import { Spacer } from '@pxblue/react-components';
import { UserMenu } from '../navigation/UserMenu';
import { useHistory } from 'react-router-dom';
import { Menu } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTES } from '../../constants/routes';
import { AppState } from '../../__types__';
import { SimpleRouterLink } from '../navigation/SimpleLink';

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
        toolbar: {
            padding: `0 ${theme.spacing(2)}px`,
        },
    })
);

export const Toolbar: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    const token = useSelector((state: AppState) => state.auth.token);

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
                    <SimpleRouterLink to={ROUTES.PROS} label={'Meet Our Pros'} />
                    <SimpleRouterLink to={ROUTES.TIPS} label={'Tip of the Month'} />
                    <SimpleRouterLink to={ROUTES.BLOG} label={'The 19th Hole'} />
                    <Spacer flex={0} width={theme.spacing(2)} />
                    <UserMenu />
                </Hidden>
                <Hidden mdUp>
                    <Hidden xsDown>
                        {!token && (
                            <Button
                                variant={'outlined'}
                                color={'inherit'}
                                onClick={(): void => history.push(ROUTES.LOGIN)}
                            >
                                SIGN IN
                            </Button>
                        )}
                    </Hidden>
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
