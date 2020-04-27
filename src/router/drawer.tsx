import React, { useCallback } from 'react';
import { Drawer, Divider, Avatar, Typography, makeStyles, Theme, createStyles } from '@material-ui/core';
import { MenuListItem } from '../components/UserMenu';
import { ShoppingCart, ExitToApp, Person, Videocam, Subscriptions, Today, LocalBar } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/reducers';

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
        drawerPaper:{
            minWidth: 250,
            maxWidth: '90%',
        }
    })
);

export const NavigationDrawer = (): JSX.Element => {
    const history = useHistory();
    const classes = useStyles();
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const dispatch = useDispatch();
    const clickMenuItem = useCallback(
        (route) => {
            history.push(route);
            dispatch({type: 'CLOSE_DRAWER'});
        },
        [history, dispatch]
    );

    return (
        <Drawer open={drawerOpen} anchor={'right'} onBackdropClick={() => dispatch({type: 'CLOSE_DRAWER'})} classes={{paper: classes.drawerPaper}}>
            <div style={{ display: 'flex', padding: 16 }}>
                <Avatar
                    aria-controls={'user-menu'}
                    className={classes.avatarInside}
                >
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
                title={'Your Lessons'}
                icon={<Subscriptions />}
                divider
                onClick={(): void => {
                    clickMenuItem('/lessons');
                }}
            />
            <MenuListItem
                title={'Submit Your Swing'}
                icon={<Videocam />}
                divider
                onClick={(): void => {
                    clickMenuItem('/lessons');
                }}
            />
            <MenuListItem
                title={'Order More'}
                icon={<ShoppingCart />}
                divider
                onClick={(): void => {
                    clickMenuItem('/lessons');
                }}
            />
            <MenuListItem
                title={'Tips of the Month'}
                icon={<Today />}
                divider
                onClick={(): void => {
                    clickMenuItem('/lessons');
                }}
            />
            <MenuListItem
                title={'The 19th Hole'}
                icon={<LocalBar />}
                divider
                onClick={(): void => {
                    clickMenuItem('/lessons');
                }}
            />
            <MenuListItem
                title={'Your Profile'}
                icon={<Person />}
                divider
                onClick={(): void => {
                    clickMenuItem('/lessons');
                }}
            />
            <MenuListItem
                title={'Sign Out'}
                icon={<ExitToApp />}
                divider
                onClick={(): void => {
                    history.push('/logout');
                    dispatch('CLOSE_DRAWER');
                }}
            />
        </Drawer>
    );
};