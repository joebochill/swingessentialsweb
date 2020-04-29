import { Avatar, Typography, Divider, Hidden } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useCallback } from 'react';
import { Spacer } from '@pxblue/react-components';
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
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../__types__';
import { requestLogout } from '../../redux/actions/auth-actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        menuHeader: {
            display: 'flex',
            padding: 16,
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
            paddingLeft: 16,
            paddingRight: 16,
            height: 48,
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
                        <Avatar className={classes.avatarInside}>{initials}</Avatar>
                        <div style={{ marginLeft: 16 }}>
                            <Typography variant={'h6'} style={{ lineHeight: 1.2 }}>
                                {user.username}
                            </Typography>
                            <Typography
                                variant={'subtitle1'}
                                style={{ lineHeight: 1, fontSize: '0.875rem', fontWeight: 300 }}
                            >
                                {`${user.firstName} ${user.lastName}`}
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                </>
            )}
            <MenuListItem title={'Home'} icon={<Home />} divider onClick={(): void => clickMenuItem(ROUTES.HOME)} />
            {isAdmin && (
                <MenuListItem
                    title={'Admin'}
                    icon={<Security />}
                    divider
                    onClick={(): void => clickMenuItem(ROUTES.ADMIN)}
                />
            )}
            {token && (
                <>
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
            {token && (
                <MenuListItem
                    title={'Your Profile'}
                    icon={<Person />}
                    divider
                    onClick={(): void => clickMenuItem(ROUTES.PROFILE)}
                />
            )}
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
                        history.push(ROUTES.LOGIN);
                        onClose();
                    }}
                />
            )}
        </>
    );
};

MenuContent.displayName = 'MenuContent';
