import { Menu, Avatar, Typography, Divider } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useCallback, useState } from 'react';
import { Spacer } from '@pxblue/react-components';
import { ShoppingCart, Subscriptions, Videocam, Person, ExitToApp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

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
        groupHeader: {
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 16px',
        },
        header: {
            width: '100%',
            userSelect: 'none',
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
type MenuGroupHeaderProps = {
    title: string;
    subtitle?: string;
    topDivider?: boolean;
    bottomDivider?: boolean;
};
export const MenuGroupHeader: React.FC<MenuGroupHeaderProps> = (props) => {
    const { title, subtitle, topDivider = true, bottomDivider = true } = props;
    const classes = useStyles();
    return (
        <>
            {topDivider && <Divider />}
            <div className={classes.groupHeader}>
                <Typography variant={'subtitle2'}>{title}</Typography>
                {props.subtitle !== undefined && <Typography variant={'caption'}>{subtitle}</Typography>}
            </div>
            {bottomDivider && <Divider />}
        </>
    );
};

export const UserMenu: React.FC = () => {
    const history = useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const closeMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const openMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const clickMenuItem = useCallback((route) => {
        history.push(route);
        setAnchorEl(null);
    }, [history]);

    return (
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
            >
                <div style={{ display: 'flex', padding: 16 }}>
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
                {/* <MenuGroupHeader title={'Lessons'} /> */}
                <MenuListItem
                    title={'Your Lessons'}
                    icon={<Subscriptions />}
                    divider
                    onClick={(): void => clickMenuItem('/lessons')}
                />
                <MenuListItem
                    title={'Submit Your Swing'}
                    icon={<Videocam />}
                    divider
                    onClick={(): void => clickMenuItem('/submit')}
                />
                {/* <MenuGroupHeader title={'Credits'} subtitle={'5 Remaining'} /> */}
                <MenuListItem
                    title={'Order More'}
                    icon={<ShoppingCart />}
                    divider
                    onClick={(): void => clickMenuItem('/order')}
                />
                {/* <MenuGroupHeader title={'Account'} /> */}
                <MenuListItem
                    title={'Your Profile'}
                    icon={<Person />}
                    divider
                    onClick={(): void => clickMenuItem('/profile')}
                />
                <MenuListItem
                    title={'Sign Out'}
                    icon={<ExitToApp />}
                    onClick={(): void => {
                        history.push('/logout');
                        closeMenu();
                    }}
                />
            </Menu>
        </>
    );
};

UserMenu.displayName = 'UserMenu';
