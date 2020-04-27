import React from 'react';
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

import { makeStyles, Theme, createStyles, Grid, Typography } from '@material-ui/core';
import { SectionBlurb } from '../components/SectionBlurb';
import { InfoCard } from '../components/InfoCard';
import { useHistory } from 'react-router-dom';
import { GetApp } from '@material-ui/icons';
import { ScreenShot } from '../components/ScreenShot';
import { Spacer } from '@pxblue/react-components';
import { Headline } from '../components/Typography';
import { Testimonial } from '../components/Testimonial';

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
                paddingTop: '56.25%',
            },
        },
        section: {
            background: theme.palette.background.paper,
            padding: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:nth-child(even)': {
                background: theme.palette.background.default,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `100px 10%`,
                flexDirection: 'column',
                textAlign: 'center',
            },
        },
        stepsWrapper: {
            marginLeft: 100,
            maxWidth: 512,
            [theme.breakpoints.down('sm')]: {
                marginLeft: 0,
            },
        },
        stepIcon: {
            marginRight: 32,
            [theme.breakpoints.down('sm')]: {
                marginRight: 0,
                marginBottom: 8,
                width: 64,
            },
        },
        step: {
            display: 'flex',
            alignItems: 'center',
            '&:not(:first-child)': {
                marginTop: 20,
            },
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
        testimonialWrapper: {
            display: 'flex',
            alignItems: 'stretch',
            marginTop: 32,
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'center',
            },
        },
    })
);

export const LandingPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();

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
                <img
                    src={fullLogo}
                    alt={'Swing Essentials banner logo'}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 100,
                        width: '60%',
                        maxWidth: 600,
                    }}
                />
                <img
                    src={pga}
                    alt={'PGA Logo'}
                    style={{ position: 'absolute', top: 20, right: 20, maxWidth: 150, width: '15%' }}
                />
            </div>
            <div className={classes.section}>
                <SectionBlurb
                    headline={'Lessons On Your Schedule'}
                    body={
                        <span>
                            Swing Essentials<sup>®</sup> provides you with affordable, individualized one-on-one lessons
                            from a PGA-certified golf professional from the comfort and convenience of your home.
                        </span>
                    }
                />
                <div className={classes.stepsWrapper}>
                    <div className={classes.step}>
                        <img src={post1} alt={'Step one icon'} className={classes.stepIcon} />
                        <Typography>
                            Pull out your smart phone and snap a short video of your swing using your camera.
                        </Typography>
                    </div>
                    <div className={classes.step}>
                        <img src={post2} alt={'Step two icon'} className={classes.stepIcon} />
                        <Typography>
                            Preview your swing and when you’re ready, submit your videos for professional analysis.
                        </Typography>
                    </div>
                    <div className={classes.step}>
                        <img src={post3} alt={'Step three icon'} className={classes.stepIcon} />
                        <Typography>
                            Within 48 hours, you will receive a personalized video highlighting what you’re doing well
                            plus areas of your swing that could be improved.
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={classes.section}>
                <Grid container spacing={10} justify={'center'}>
                    <Grid item xs={12} md={4}>
                        <InfoCard
                            spacing={10}
                            source={tips}
                            title={'Tips of the Month'}
                            aspectRatio={'16x9'}
                            description={
                                'Each month we bring you a new video top to help you bring your golf game to the next level.'
                            }
                            onClick={(): void => {
                                history.push('/tips-of-the-month');
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InfoCard
                            spacing={10}
                            source={nineteen}
                            title={'The 19th Hole'}
                            aspectRatio={'16x9'}
                            description={
                                'Check out our golf blog where we share stories from the field and talk about all things golf.'
                            }
                            onClick={(): void => {
                                history.push('/19th-hole');
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <InfoCard
                            spacing={10}
                            source={pros}
                            title={'Meet the Pros'}
                            aspectRatio={'16x9'}
                            backgroundPosition={'center 25%'}
                            description={
                                'Get to know the folks behind the lessons and the experience they bring to the table.'
                            }
                            onClick={(): void => {
                                history.push('/our-pros');
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={classes.section} style={{ background: 'black', position: 'relative' }}>
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 0,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        backgroundImage: `url(${cart})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.3,
                    }}
                />
                <div style={{ zIndex: 100 }}>
                    <SectionBlurb
                        icon={<GetApp fontSize={'inherit'} />}
                        headline={'Download Our App!'}
                        subheading={'Available in the App Store and Google Play'}
                        body={
                            <>
                                <span>
                                    Our mobile app lets you take Swing Essentials on the go. Use it to record your
                                    swing, view your lessons, and keep up to date with the latest news and tips from
                                    Swing Essentials.
                                </span>
                                <br />
                                <br />
                                <span>Sign up and get your first lesson free!</span>
                            </>
                        }
                        style={{ color: 'white' }}
                    />
                    <div style={{ marginTop: 16, display: 'inline-flex' }}>
                        <img
                            src={appstore}
                            alt={'Apple App Store Icon'}
                            style={{ cursor: 'pointer' }}
                            onClick={(): void => {
                                /* do nothing */
                            }}
                        />
                        <img
                            src={playstore}
                            alt={'Google Play Store Icon'}
                            style={{ cursor: 'pointer', marginLeft: 16 }}
                            onClick={(): void => {
                                /* do nothing */
                            }}
                        />
                    </div>
                </div>

                <Spacer flex={0} width={100} />
                <Spacer flex={0} height={64} />
                <ScreenShot src={screenshot} alt={'Swing Essentials app screenshot'} style={{ flex: '0 0 auto' }} />
            </div>
            <div className={classes.section} style={{ display: 'block', textAlign: 'center' }}>
                <Headline>{`Here's What Our Fans Are Saying`}</Headline>
                <div className={classes.testimonialWrapper}>
                    <Testimonial
                        name={'David A.'}
                        initials={'DA'}
                        location={'Raleigh, NC'}
                        joined={'2017'}
                        testimonial={`Thanks for the great work this last year. After working with you, I've lowered my handicap by three and a half.`}
                    />
                    <Testimonial
                        name={'Dean L.'}
                        initials={'DL'}
                        location={'Ashburn, VA'}
                        joined={'2018'}
                        testimonial={`I sent my swing in to Swing Essentials and I'm playing so much better - it's easily taken four to five shots off my game. I strongly recommend it!`}
                    />
                    <Testimonial
                        name={'Will M.'}
                        initials={'WM'}
                        location={'Louisville, KY'}
                        joined={'2019'}
                        testimonial={`Thanks to you, I have been playing my best golf. It's all finally clicking now!`}
                    />
                </div>
            </div>
        </>
    );
};
