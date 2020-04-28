import React, { useCallback } from 'react';
import { Drawer, Divider, Avatar, Typography, makeStyles, Theme, createStyles, useTheme } from '@material-ui/core';
import { MenuListItem } from '../components/UserMenu';
import { ShoppingCart, ExitToApp, Person, Videocam, Subscriptions, Today, LocalBar, Home } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../__types__';
import { ROUTES } from '../constants/routes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatarInside: {
            color: theme.palette.common.white,
            height: theme.spacing(5),
            width: theme.spacing(5),
            backgroundColor: theme.palette.primary.main,
            fontWeight: 600,
            fontFamily: 'Roboto Mono',
        },
        drawerPaper: {
            minWidth: 250,
            maxWidth: '90%',
            color: theme.palette.primary.main,
        },
    })
);

export const NavigationDrawer = (): JSX.Element => {
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const dispatch = useDispatch();
    const clickMenuItem = useCallback(
        (route) => {
            history.push(route);
            dispatch({ type: 'CLOSE_DRAWER' });
        },
        [history, dispatch]
    );

    return (
        <Drawer
            open={drawerOpen}
            anchor={'right'}
            onBackdropClick={(): void => {
                dispatch({ type: 'CLOSE_DRAWER' });
            }}
            classes={{ paper: classes.drawerPaper }}
            style={{ color: 'red' }}
        >
            <div style={{ display: 'flex', padding: 16, color: theme.palette.text.primary }}>
                <Avatar aria-controls={'user-menu'} className={classes.avatarInside}>
                    JB
                </Avatar>
                <div style={{ marginLeft: 16 }}>
                    <Typography variant={'h6'} style={{ lineHeight: 1.2 }}>
                        joebochill
                    </Typography>
                    <Typography variant={'subtitle1'} style={{ lineHeight: 1, fontSize: '0.875rem', fontWeight: 300 }}>
                        Joseph Boyle
                    </Typography>
                </div>
            </div>
            <Divider />
            <MenuListItem
                title={'Home'}
                icon={<Home />}
                divider
                onClick={(): void => {
                    clickMenuItem(ROUTES.HOME);
                }}
            />
            <MenuListItem
                title={'Your Lessons'}
                icon={<Subscriptions />}
                divider
                onClick={(): void => {
                    clickMenuItem(ROUTES.LESSONS);
                }}
            />
            <MenuListItem
                title={'Submit Your Swing'}
                icon={<Videocam />}
                divider
                onClick={(): void => {
                    clickMenuItem(ROUTES.SUBMIT);
                }}
            />
            <MenuListItem
                title={'Order More'}
                icon={<ShoppingCart />}
                divider
                onClick={(): void => {
                    clickMenuItem(ROUTES.ORDER);
                }}
            />
            <MenuListItem
                title={'Tip of the Month'}
                icon={<Today />}
                divider
                onClick={(): void => {
                    clickMenuItem(ROUTES.TIPS);
                }}
            />
            <MenuListItem
                title={'The 19th Hole'}
                icon={<LocalBar />}
                divider
                onClick={(): void => {
                    clickMenuItem(ROUTES.BLOG);
                }}
            />
            <MenuListItem
                title={'Your Profile'}
                icon={<Person />}
                divider
                onClick={(): void => {
                    clickMenuItem(ROUTES.PROFILE);
                }}
            />
            <MenuListItem
                title={'Sign Out'}
                icon={<ExitToApp />}
                divider
                onClick={(): void => {
                    // TODO Log Out
                    history.push(ROUTES.LOGIN);
                    dispatch({ type: 'CLOSE_DRAWER' });
                }}
            />
        </Drawer>
    );
};
