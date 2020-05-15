import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../__types__';
import { MenuContent } from './MenuContent';
import { Drawer, makeStyles, Theme, createStyles } from '@material-ui/core';
import { CLOSE_DRAWER } from '../../redux/actions/types';

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
    const dispatch = useDispatch();

    const drawerOpen = useSelector((state: AppState) => state.app.drawerOpen);

    return (
        <Drawer
            open={drawerOpen}
            anchor={'right'}
            onBackdropClick={(): void => {
                dispatch({ type: CLOSE_DRAWER });
            }}
            classes={{ paper: classes.drawerPaper }}
        >
            <MenuContent
                onClose={(): void => {
                    dispatch({ type: CLOSE_DRAWER });
                }}
            />
        </Drawer>
    );
};
