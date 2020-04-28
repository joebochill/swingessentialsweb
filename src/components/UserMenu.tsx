import { Menu, Avatar, Typography, Divider, Button } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';
import { Spacer } from '@pxblue/react-components';
import { ShoppingCart, Subscriptions, Videocam, Person, ExitToApp, Home } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { useSelector } from 'react-redux';
import { AppState } from '../__types__';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuHeader: {
            display: 'flex',
            padding: 16,
            color: theme.palette.text.primary,
        },
        avatar: {
            cursor: 'pointer',
            color: theme.palette.primary.main,
            height: theme.spacing(5),
            width: theme.spacing(5),
            backgroundColor: 'white',
            fontWeight: 600,
            fontFamily: 'Roboto Mono',
        },
        avatarInside: {
            color: theme.palette.common.white,
            height: theme.spacing(5),
            width: theme.spacing(5),
            backgroundColor: theme.palette.primary.main,
            fontWeight: 600,
            fontFamily: 'Roboto Mono',
        },
        row: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 16,
            paddingRight: 16,
            height: 48,
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
        },
        paper: {
            color: theme.palette.primary.main,
        },
    })
);

type MenuListItemProps = {
    icon?: JSX.Element;
    title: string;
    onClick: Function;
    divider?: boolean;
};
export const MenuListItem: React.FC<MenuListItemProps> = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.row} onClick={(): void => props.onClick()}>
                {props.icon}
                {props.icon && <Spacer flex={0} width={16} />}
                <Typography>{props.title}</Typography>
            </div>
            {props.divider && <Divider />}
        </>
    );
};

export const UserMenu: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const token = useSelector((state: AppState) => state.auth.token);

    const closeMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const openMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const clickMenuItem = useCallback(
        (route) => {
            history.push(route);
            setAnchorEl(null);
        },
        [history]
    );

    return token ? (
        <>
            <Avatar aria-controls={'user-menu'} className={classes.avatar} onClick={openMenu}>
                JB
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
                <div className={classes.menuHeader}>
                    <Avatar aria-controls={'user-menu'} className={classes.avatarInside}>
                        JB
                    </Avatar>
                    <div style={{ marginLeft: 16 }}>
                        <Typography variant={'h6'} style={{ lineHeight: 1.2 }}>
                            joebochill
                        </Typography>
                        <Typography
                            variant={'subtitle1'}
                            style={{ lineHeight: 1, fontSize: '0.875rem', fontWeight: 300 }}
                        >
                            Joseph Boyle
                        </Typography>
                    </div>
                </div>
                <Divider />
                <MenuListItem title={'Home'} icon={<Home />} divider onClick={(): void => clickMenuItem(ROUTES.HOME)} />
                <MenuListItem
                    title={'Your Lessons'}
                    icon={<Subscriptions />}
                    divider
                    onClick={(): void => clickMenuItem(ROUTES.LESSONS)}
                />
                <MenuListItem
                    title={'Submit Your Swing'}
                    icon={<Videocam />}
                    divider
                    onClick={(): void => clickMenuItem(ROUTES.SUBMIT)}
                />
                <MenuListItem
                    title={'Order More'}
                    icon={<ShoppingCart />}
                    divider
                    onClick={(): void => clickMenuItem(ROUTES.ORDER)}
                />
                <MenuListItem
                    title={'Your Profile'}
                    icon={<Person />}
                    divider
                    onClick={(): void => clickMenuItem(ROUTES.PROFILE)}
                />
                <MenuListItem
                    title={'Sign Out'}
                    icon={<ExitToApp />}
                    onClick={(): void => {
                        // TODO Actually log out
                        history.push(ROUTES.LOGIN);
                        closeMenu();
                    }}
                />
            </Menu>
        </>
    ) : 
    (
        <Button variant={'outlined'} color={'inherit'} onClick={():void => history.push(ROUTES.LOGIN)}>SIGN IN</Button>
    );
};

UserMenu.displayName = 'UserMenu';
