import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../__types__';
import { ROUTES } from '../../constants/routes';
import { MenuContent } from './MenuContent';
import { Menu, Avatar, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Person } from '@material-ui/icons';

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
        paper: {
            color: theme.palette.primary.main,
        },
    })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ForwardMenuContent = React.forwardRef((props: { onClose: Function }, ref) => <MenuContent {...props} />);
ForwardMenuContent.displayName = 'ForwardRefMenuContent';

export const UserMenu: React.FC = () => {

    const history = useHistory();
    const classes = useStyles();

    const token = useSelector((state: AppState) => state.auth.token);
    const user = useSelector((state: AppState) => state.user);
    const avatar = useSelector((state: AppState) => state.settings.avatar);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const closeMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const openMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const initials = `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`;

    return token ? (
        <>
            <Avatar
                src={
                    avatar
                        ? `https://www.swingessentials.com/images/profiles/${user.username}/${avatar}.png`
                        : undefined
                }
                className={classes.avatar}
                onClick={openMenu}
            >
                {initials ? initials : <Person fontSize={'inherit'} />}
            </Avatar>
            <Menu
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={closeMenu}
                getContentAnchorEl={null}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                MenuListProps={{ style: { padding: 0, minWidth: 200 } }}
                classes={{ paper: classes.paper }}
            >
                <ForwardMenuContent onClose={closeMenu} />
            </Menu>
        </>
    ) : (
            <Button
                variant={'outlined'}
                color={'inherit'}
                onClick={(): void => history.push(ROUTES.LOGIN, { from: { pathname: history.location.pathname } })}
            >
                SIGN IN
            </Button>
        );
};

UserMenu.displayName = 'UserMenu';
