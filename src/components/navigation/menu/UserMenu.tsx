import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { MenuContent } from './MenuContent';
import { Menu, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { UserAvatar } from './UserAvatar';

const ForwardMenuContent = React.forwardRef((props: { onClose: () => void }) => <MenuContent {...props} />);
ForwardMenuContent.displayName = 'ForwardRefMenuContent';

export const UserMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
                closeAfterTransition={true}
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
                <ForwardMenuContent onClose={closeMenu} />
            </Menu>
        </>
    ) : (
        <Button
            variant={'outlined'}
            color={'inherit'}
            onClick={(): void => {
                navigate(ROUTES.LOGIN, {
                    state: { from: { pathname: location.pathname } },
                });
            }}
        >
            SIGN IN
        </Button>
    );
};

UserMenu.displayName = 'UserMenu';
