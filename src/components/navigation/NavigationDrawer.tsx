import { JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Drawer } from '@mui/material';
import { RootState } from '../../redux/store';
import { closeDrawer } from '../../redux/slices/navigationSlice';
import { MenuContent } from './MenuContent';

export const NavigationDrawer = (): JSX.Element => {
    const dispatch = useDispatch();

    const drawerOpen = useSelector((state: RootState) => state.navigation.drawerOpen);

    return (
        <Drawer
            open={drawerOpen}
            anchor={'right'}
            onClose={(): void => {
                dispatch(closeDrawer());
            }}
            PaperProps={{
                sx: {
                    minWidth: 250,
                    maxWidth: '90%',
                    color: 'text.primary',
                },
            }}
        >
            <MenuContent
                onClose={(): void => {
                    dispatch(closeDrawer());
                }}
            />
        </Drawer>
    );
};
