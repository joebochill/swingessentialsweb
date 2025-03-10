import React, { JSX } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

type MenuListItemProps = {
    icon?: JSX.Element;
    title: string;
    onClick: () => void;
    divider?: boolean;
};
export const MenuListItem: React.FC<MenuListItemProps> = (props) => {
    const { icon, title, onClick, ...other } = props;

    return (
        <>
            <ListItem disablePadding tabIndex={0} sx={{ height: (t) => t.spacing(6), userSelect: 'none' }} {...other}>
                <ListItemButton onClick={onClick}>
                    <ListItemIcon sx={{ color: 'text.primary', minWidth: 40 }}>{icon}</ListItemIcon>
                    <ListItemText primary={title} />
                </ListItemButton>
            </ListItem>
        </>
    );
};
