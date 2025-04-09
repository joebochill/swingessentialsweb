import React, { useCallback, useState } from 'react';
import { MenuContent } from './MenuContent';
import { Menu } from '@mui/material';
import { useSelector } from 'react-redux';
import { UserAvatar } from './UserAvatar';
import { RootState } from '../../redux/store';
import { SignInButton } from './SignInButton';

export const UserMenu: React.FC = () => {
    const token = useSelector((state: RootState) => state.auth.token);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const closeMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const openMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    return token ? (
        <>
            <UserAvatar onClick={openMenu} />
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={closeMenu}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                MenuListProps={{ sx: { p: 0, minWidth: 200 } }}
                slotProps={{
                    paper: {
                        sx: {
                            color: 'text.primary',
                        },
                    },
                }}
            >
                <MenuContent onClose={closeMenu} />
            </Menu>
        </>
    ) : (
        <SignInButton />
    );
};

UserMenu.displayName = 'UserMenu';
