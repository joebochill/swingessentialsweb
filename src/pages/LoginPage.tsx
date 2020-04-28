import React, { useState, useEffect } from 'react';
import bg from '../assets/images/banners/landing.jpg';
import fullLogo from '../assets/images/fullLogo-06.svg';
import pga from '../assets/images/pga_p.svg';
import post1 from '../assets/icons/post-01.svg';
import post2 from '../assets/icons/post-02.svg';
import post3 from '../assets/icons/post-03.svg';
import tips from '../assets/images/banners/tips.jpg';
import nineteen from '../assets/images/banners/19th.jpg';
import pros from '../assets/images/banners/nelson.jpeg';
import cart from '../assets/images/banners/download.jpg';

import screenshot from '../assets/images/screenshot.png';
import appstore from '../assets/images/app-store.svg';
import playstore from '../assets/images/google-play.svg';

import { makeStyles, Theme, createStyles, Grid, Typography, TextField, Button } from '@material-ui/core';
import { SectionBlurb } from '../components/SectionBlurb';
import { InfoCard } from '../components/InfoCard';
import { useHistory, Redirect } from 'react-router-dom';
import { GetApp } from '@material-ui/icons';
import { ScreenShot } from '../components/ScreenShot';
import { Spacer } from '@pxblue/react-components';
import { Headline } from '../components/Typography';
import { Testimonial } from '../components/Testimonial';
import { ROUTES } from '../constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../__types__';
import { requestLogin } from '../redux/actions/auth-actions';
import { useCompare } from '../hooks';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bannerWrapper: {
            height: 540,
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                height: 'initial',
                minHeight: 372,
                paddingTop: '56.25%',
            },
        },
        form: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            width: '80%',
            maxWidth: 512,
            color: 'white'
        },
        input: {
            background: 'rgba(255,255,255,0.6)',
            '&:hover': {
                background: 'rgba(255,255,255,0.8)',
            },
            '&$focused': {
                background: 'rgba(255,255,255,1)',
            }
        },
        focused: {
            background: 'rgba(255,255,255,1)',
            '&:hover': {
                background: 'rgba(255,255,255,1)',
            },
            '&$focused': {
                background: 'rgba(255,255,255,1)',
            }
        },
    })
);

export const LoginPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const token = useSelector((state: AppState) => state.auth.token);
    const failCount = useSelector((state: AppState) => state.auth.failCount);
    const failuresChanged = useCompare(failCount);
    const dispatch = useDispatch();

    useEffect(() => {
        if (failCount > 0) {
            setPassword('');
        }
    }, [failCount, setPassword]);


    if (token) return <Redirect to={ROUTES.PROFILE} />
    return (
        <>
            <div className={classes.bannerWrapper}>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        top: 0,
                        left: 0,
                        position: 'absolute',
                        backgroundColor: '#4f4c81',
                    }}
                />
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        backgroundImage: `url(${bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center 70%',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.5,
                    }}
                />
                <div className={classes.form}>
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Username'}
                        placeholder={'Username or Email'}
                        name={'username'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{
                            classes: {
                                root: username ? classes.focused : classes.input,
                                focused: classes.focused,
                            }
                        }}
                        style={{ marginBottom: 16 }}
                    />
                    <TextField
                        fullWidth
                        variant={'filled'}
                        type={'password'}
                        label={'Password'}
                        name={'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            classes: {
                                root: password ? classes.focused : classes.input,
                                focused: classes.focused,
                            }
                        }}
                        style={{ marginBottom: 16 }}
                    />
                    {failCount > 0 &&
                        <div style={{padding: 20, background: '#ca3c3d', color: 'white', textAlign: 'center', marginBottom: 16}}>
                            <Typography>Your username/password was not correct. Please try again.</Typography>
                        </div>
                    }
                    <Button
                        fullWidth
                        variant={'contained'}
                        color={!username || !password ? 'default' : 'primary'}
                        disabled={!username || !password}
                        onClick={() => dispatch(requestLogin({ username, password }))}
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        </>
    );
};
