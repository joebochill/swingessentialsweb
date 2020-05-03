import React, { useState, useEffect } from 'react';
import bg from '../assets/images/banners/landing.jpg';

import {
    makeStyles,
    createStyles,
    Button,
    // Slide,
    Theme,
    Typography,
    IconButton,
    CircularProgress,
    useTheme,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../__types__';
import { Banner } from '../components/display/Banner';
import { ROUTES } from '../constants/routes';

import { StyledTextField } from '../components/text/StyledInputs';
import { Edit } from '@material-ui/icons';

import { Spacer } from '@pxblue/react-components';
import { setUserData } from '../redux/actions/user-data-actions';
import { RESET_SET_USER_DATA } from '../redux/actions/types';

import { ChangePassword } from '../components/dialogs/ChangePassword';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            width: '100%',
            maxWidth: 1024,
            color: 'white',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'center',
            },
        },
        imageWrapper: {
            flex: '0 0 auto',
            textAlign: 'center',
        },
        avatar: {
            height: 300,
            width: 300,
            borderRadius: 300,
            color: 'white',
            backgroundPosition: 'center center',
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        name: {
            marginTop: theme.spacing(2),
        },
        aboutMe: {
            flex: '1 1 0px',
        },
    })
);

export const ProfilePage: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();

    const token = useSelector((state: AppState) => state.auth.token);
    const loaded = useSelector((state: AppState) => state.auth.initialLoaded);
    const user = useSelector((state: AppState) => state.user);

    // const [image, setImage] = useState('');

    const [initialized, setInitialized] = useState(false);

    const joined = new Date(user.joined).getFullYear();

    useEffect(() => {
        if (!initialized && user.username) {
            // setImage(user.image || '');
            setInitialized(true);
        }
    }, [user, initialized, /*setImage,*/ setInitialized]);

    if (loaded && !token) return <Redirect to={ROUTES.LOGIN} />;

    return (
        <>
            <Banner background={{ src: bg, position: 'center 70%', opacity: 0.5 }} justify={'center'}>
                {!initialized && (
                    <div style={{ color: 'white' }}>
                        <CircularProgress color={'inherit'} />
                    </div>
                )}
                {initialized && (
                    <div className={classes.root}>
                        <div className={classes.imageWrapper}>
                            <div
                                className={classes.avatar}
                                style={{
                                    backgroundColor: theme.palette.primary.light,
                                    backgroundImage: `url(https://www.swingessentials.com/images/profiles/${
                                        user.image ? `${user.username}/image.jpeg` : 'blank.png'
                                    }`,
                                }}
                            >
                                <IconButton color={'inherit'}>
                                    <Edit />
                                </IconButton>
                            </div>
                            <div className={classes.name}>
                                <Typography variant={'h5'} style={{ fontWeight: 700, lineHeight: 1.3 }}>
                                    {`${user.firstName} ${user.lastName}`}
                                </Typography>
                                <Typography variant={'h6'} style={{ lineHeight: 1.2 }}>
                                    {user.username}
                                </Typography>
                                <Typography variant={'caption'} display={'block'}>
                                    {`Member since ${joined}`}
                                </Typography>
                                <ChangePassword style={{ marginTop: 16 }} />
                            </div>
                        </div>

                        <Spacer flex={0} width={64} height={32} />

                        <ProfileForm />
                    </div>
                )}
            </Banner>
        </>
    );
};

export const ProfileForm: React.FC = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const token = useSelector((state: AppState) => state.auth.token);
    const loaded = useSelector((state: AppState) => state.auth.initialLoaded);
    const user = useSelector((state: AppState) => state.user);
    const update = user.update;

    const [first, setFirst] = useState('');
    const [last, setLast] = useState('');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    // const [sendEmails, setSendEmails] = useState(true);

    const [initialized, setInitialized] = useState(false);

    const changes =
        first !== user.firstName || last !== user.lastName || location !== user.location || phone !== user.phone;

    useEffect(() => {
        if (changes) {
            dispatch({ type: RESET_SET_USER_DATA });
        }
    }, [changes, dispatch]);

    useEffect(() => {
        if (!initialized && user.username) {
            setFirst(user.firstName);
            setLast(user.lastName);
            setLocation(user.location || '');
            setPhone(user.phone || '');
            // setSendEmails(user.notifications !== undefined ? user.notifications : false);
            setInitialized(true);
        }
    }, [user, initialized]);

    if (loaded && !token) return <Redirect to={ROUTES.LOGIN} />;

    return (
        <div className={classes.aboutMe}>
            <Typography variant={'h5'}>Welcome to the Swing Essentials family!</Typography>
            <Typography paragraph>Help us get to know you by filling out your profile below.</Typography>

            {/* <Typography variant={'h6'} style={{ marginTop: 16, marginBottom: 16 }}>About Me:</Typography> */}
            <StyledTextField
                label={'First Name'}
                name={'first-name'}
                value={first}
                onChange={(e): void => {
                    setFirst(e.target.value.replace(/[^A-Z-' ]/gi, '').substr(0, 32));
                }}
            />
            <StyledTextField
                label={'Last Name'}
                name={'last-name'}
                value={last}
                onChange={(e): void => {
                    setLast(e.target.value.replace(/[^A-Z-' ]/gi, '').substr(0, 32));
                }}
            />
            <StyledTextField
                label={'Location'}
                name={'location'}
                placeholder={'e.g. Portland, OR'}
                value={location}
                onChange={(e): void => {
                    setLocation(e.target.value.replace(/[^A-Z-', ]/gi, '').substr(0, 64));
                }}
            />
            <StyledTextField
                last
                label={'Phone Number'}
                name={'phone'}
                placeholder={'e.g. 123-456-7890'}
                value={phone}
                onChange={(e): void => {
                    setPhone(e.target.value.replace(/[^0-9- +().]/gi, '').substr(0, 20));
                }}
            />
            {/* <Typography variant={'h6'} style={{ marginTop: 16, marginBottom: 16 }}>Notifications:</Typography>
                        <FormControlLabel labelPlacement="start"
                            control={<PurpleSwitch checked={sendEmails} color={'default'} onChange={(e) => setSendEmails(e.target.checked)} />}
                            label="New Lesson Emails"
                            style={{ marginLeft: 0 }}
                        /> */}

            <div style={{ textAlign: 'center', marginTop: 16 }}>
                {changes && update === 'unset' && (
                    <Button
                        color={'primary'}
                        variant={'contained'}
                        onClick={(): void => {
                            dispatch(
                                setUserData({
                                    firstName: first,
                                    lastName: last,
                                    location,
                                    phone,
                                })
                            );
                        }}
                    >
                        Save Changes
                    </Button>
                )}
                {update === 'pending' && <CircularProgress color={'inherit'} />}
                {update === 'success' && <Typography variant={'caption'}>Success!</Typography>}
                {update === 'error' && <Typography variant={'caption'}>Failed to update profile</Typography>}
            </div>
        </div>
    );
};
