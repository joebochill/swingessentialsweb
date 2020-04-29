import React from 'react';
import { Drawer, makeStyles, Theme, createStyles } from '@material-ui/core';
import { MenuContent } from './MenuContent';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../__types__';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawerPaper: {
            minWidth: 250,
            maxWidth: '90%',
            color: theme.palette.primary.main,
        },
    })
);

export const NavigationDrawer = (): JSX.Element => {
    const classes = useStyles();
    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);
    const dispatch = useDispatch();

    return (
        <Drawer
            open={drawerOpen}
            anchor={'right'}
            onBackdropClick={(): void => {
                dispatch({ type: 'CLOSE_DRAWER' });
            }}
            classes={{ paper: classes.drawerPaper }}
        >
            <MenuContent
                onClose={(): void => {
                    dispatch({ type: 'CLOSE_DRAWER' });
                }}
            />
        </Drawer>
    );
};
