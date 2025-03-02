import React, { JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../__types__';
import { MenuContent } from './MenuContent';
import { Drawer } from '@mui/material';
// import { CLOSE_DRAWER } from '../../../holding/redux/actions/types';

export const NavigationDrawer = (): JSX.Element => {
    // const classes = useStyles();
    // const dispatch = useDispatch();

    const drawerOpen = false;//useSelector((state: AppState) => state.app.drawerOpen);

    return (
        <Drawer
            open={drawerOpen}
            anchor={'right'}
            onClose={(): void => {
                // dispatch({ type: CLOSE_DRAWER });
            }}
            PaperProps={{
                sx: {
                    minWidth: 250,
                    maxWidth: '90%',
                    color: 'primary.main',
                },
            }}
        >
            <MenuContent
                onClose={(): void => {
                    // dispatch({ type: CLOSE_DRAWER });
                }}
            />
        </Drawer>
    );
};
