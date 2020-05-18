import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppState } from '../../__types__';
import { requestLogout } from '../../redux/actions/auth-actions';
import { ROUTES } from '../../constants/routes';
import { Spacer } from '@pxblue/react-components';
import { Avatar, Typography, Divider, Hidden, createStyles, makeStyles, Theme, useTheme } from '@material-ui/core';
import {
    ShoppingCart,
    Subscriptions,
    Videocam,
    Person,
    ExitToApp,
    Home,
    Face,
    Today,
    LocalBar,
    Security,
} from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuHeader: {
            display: 'flex',
            padding: theme.spacing(2),
            color: theme.palette.text.primary,
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
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            height: theme.spacing(6),
            cursor: 'pointer',
            userSelect: 'none',
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
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
    const theme = useTheme();

    return (
        <>
            <div className={classes.row} onClick={(): void => props.onClick()}>
                {props.icon}
                {props.icon && <Spacer flex={0} width={theme.spacing(2)} />}
                <Typography>{props.title}</Typography>
            </div>
            {props.divider && <Divider />}
        </>
    );
};

type MenuContentProps = {
    onClose: Function;
};
export const MenuContent: React.FC<MenuContentProps> = (props) => {
    const { onClose } = props;

    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();

    const user = useSelector((state: AppState) => state.user);
    const token = useSelector((state: AppState) => state.auth.token);
    const isAdmin = useSelector((state: AppState) => state.auth.admin);
    const avatar = useSelector((state: AppState) => state.settings.avatar);

    const clickMenuItem = useCallback(
        (route) => {
            history.push(route);
            onClose();
        },
        [history, onClose]
    );

    const initials = `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`;

    return (
        <>
            {token && (
                <>
                    <div className={classes.menuHeader}>
                        <Avatar
                            src={
                                avatar
                                    ? `https://www.swingessentials.com/images/profiles/${user.username}/${avatar}.png`
                                    : undefined
                            }
                            className={classes.avatarInside}
                        >
                            {initials ? initials : <Person fontSize={'inherit'} />}
                        </Avatar>
                        <div style={{ marginLeft: 16 }}>
                            <Typography variant={'h6'} style={{ lineHeight: 1.2 }}>
                                {user.username}
                            </Typography>
                            <Typography
                                variant={'subtitle1'}
                                style={{ lineHeight: 1, fontSize: '0.875rem', fontWeight: 300 }}
                            >
                                {`${user.firstName} ${user.lastName}`}
                                {!user.firstName && !user.lastName ? 'Welcome User' : ''}
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                </>
            )}
            <MenuListItem title={'Home'} icon={<Home />} divider onClick={(): void => clickMenuItem(ROUTES.HOME)} />
            {isAdmin && (
                <MenuListItem
                    title={'Admin Portal'}
                    icon={<Security />}
                    divider
                    onClick={(): void => clickMenuItem(ROUTES.ADMIN)}
                />
            )}
            {token && (
                <>
                    <MenuListItem
                        title={'Your Profile'}
                        icon={<Person />}
                        divider
                        onClick={(): void => clickMenuItem(ROUTES.PROFILE)}
                    />
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
                </>
            )}
            <Hidden mdUp>
                <MenuListItem
                    title={'Meet Our Pros'}
                    icon={<Face />}
                    divider
                    onClick={(): void => {
                        clickMenuItem(ROUTES.PROS);
                    }}
                />
                <MenuListItem
                    title={'Tip of the Month'}
                    icon={<Today />}
                    divider
                    onClick={(): void => {
                        clickMenuItem(ROUTES.TIPS);
                    }}
                />
                <MenuListItem
                    title={'The 19th Hole'}
                    icon={<LocalBar />}
                    divider
                    onClick={(): void => {
                        clickMenuItem(ROUTES.BLOG);
                    }}
                />
            </Hidden>
            {token ? (
                <MenuListItem
                    title={'Sign Out'}
                    icon={<ExitToApp />}
                    onClick={(): void => {
                        dispatch(requestLogout());
                        onClose();
                    }}
                />
            ) : (
                <MenuListItem
                    title={'Sign In'}
                    icon={<Person />}
                    divider
                    onClick={(): void => {
                        history.push(ROUTES.LOGIN, { from: { pathname: history.location.pathname } });
                        onClose();
                    }}
                />
            )}
        </>
    );
};

MenuContent.displayName = 'MenuContent';
