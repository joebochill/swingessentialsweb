import React, { HTMLAttributes } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGoogleAnalyticsPageView } from '../hooks';

import { AppState } from '../__types__/redux';
import { ROUTES } from '../constants/routes';
import { APP_STORE_LINK, PLAY_STORE_LINK } from '../constants';

import { SectionBlurb } from '../components/text/SectionBlurb';
import { InfoCard } from '../components/display/InfoCard';
import { ScreenShot } from '../components/display/ScreenShot';
import { Headline } from '../components/text/Typography';
import { Testimonial } from '../components/display/Testimonial';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { Spacer } from '@pxblue/react-components';
import { makeStyles, Theme, createStyles, Grid, Typography, useTheme } from '@material-ui/core';
import { GetApp } from '@material-ui/icons';

import bg from '../assets/images/banners/landing.jpg';
import fullLogo from '../assets/images/logos/logo-full-white.svg';
import pga from '../assets/images/logos/pga_p.svg';
import post1 from '../assets/icons/post-01.svg';
import post2 from '../assets/icons/post-02.svg';
import post3 from '../assets/icons/post-03.svg';
import tips from '../assets/images/banners/tips.jpg';
import nineteen from '../assets/images/banners/19th.jpg';
import pros from '../assets/images/banners/nelson.jpeg';
import cart from '../assets/images/banners/download.jpg';
import screenshot from '../assets/images/screenshot/home.png';
import appstore from '../assets/images/logos/app-store.svg';
import playstore from '../assets/images/logos/google-play.svg';

const getAbbreviatedName = (username: string, first: string, last: string): string => {
    if (!first) return username;

    const _first = first.charAt(0).toUpperCase() + first.substr(1);
    const _last = last ? last.charAt(0).toUpperCase() : '';

    return `${_first} ${_last}.`;
};

const getInitials = (username: string, first: string, last: string): string => {
    if (!first) return username.charAt(0).toUpperCase();

    const _first = first.charAt(0).toUpperCase();
    const _last = last ? last.charAt(0).toUpperCase() : '';

    return `${_first}${_last}`;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        seLogo: {
            width: '60%',
            maxWidth: 600,
        },
        pgaLogo: {
            position: 'absolute',
            top: theme.spacing(2),
            right: theme.spacing(2),
            maxWidth: 150,
            width: '15%',
        },
        stores: {
            marginTop: theme.spacing(2),
            textAlign: 'center',
            [theme.breakpoints.down('xs')]: {
                marginTop: 0,
                position: 'absolute',
                left: 0,
                width: '100%',
            },
        },
        stepsWrapper: {
            marginLeft: theme.spacing(8),
            maxWidth: 512,
            [theme.breakpoints.down('sm')]: {
                marginLeft: 0,
            },
        },
        stepIcon: {
            marginRight: theme.spacing(4),
            flex: '0 0 auto',
            [theme.breakpoints.down('sm')]: {
                marginRight: 0,
                marginBottom: theme.spacing(1),
                width: theme.spacing(8),
            },
        },
        step: {
            display: 'flex',
            alignItems: 'center',
            '&:not(:first-child)': {
                marginTop: theme.spacing(2),
            },
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        },
        cartBackground: {
            position: 'absolute',
            zIndex: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            opacity: 0.3,
        },
        testimonialWrapper: {
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'center',
            marginTop: theme.spacing(4),
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
        },
    })
);

const AppleStoreIcon: React.FC<HTMLAttributes<HTMLImageElement>> = (props) => (
    <img
        src={appstore}
        alt={'Apple App Store Icon'}
        onClick={(): void => {
            window.open(APP_STORE_LINK, 'blank');
        }}
        {...props}
    />
);

const GoogleStoreIcon: React.FC<HTMLAttributes<HTMLImageElement>> = (props) => (
    <img
        src={playstore}
        alt={'Google Play Store Icon'}
        onClick={(): void => {
            window.open(PLAY_STORE_LINK, 'blank');
        }}
        {...props}
    />
);

export const LandingPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    useGoogleAnalyticsPageView();

    const testimonials = useSelector((state: AppState) => state.testimonials.list);

    return (
        <>
            <Banner
                background={{ src: bg, position: 'center 70%', maintainAspectRatio: true }}
                noPadding
                justify={'center'}
            >
                <img src={pga} alt={'PGA Logo'} className={classes.pgaLogo} />
                <div className={classes.seLogo}>
                    <img src={fullLogo} alt={'Swing Essentials banner logo'} style={{ width: '100%' }} />
                    <div className={classes.stores}>
                        <AppleStoreIcon style={{ cursor: 'pointer' }} />
                        <GoogleStoreIcon style={{ cursor: 'pointer' }} />
                    </div>
                </div>
            </Banner>
            <div />
            <Section>
                <SectionBlurb
                    jumbo
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
            </Section>
            <Section>
                <Grid container spacing={10} justify={'center'}>
                    <Grid item xs={12} md={4}>
                        <InfoCard
                            spacing={10}
                            source={tips}
                            title={'Tip of the Month'}
                            aspectRatio={'16x9'}
                            description={
                                'Each month we bring you a new video to help you bring your golf game to the next level.'
                            }
                            onClick={(): void => {
                                history.push(ROUTES.TIPS);
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
                                history.push(ROUTES.BLOG);
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
                                history.push(ROUTES.PROS);
                            }}
                        />
                    </Grid>
                </Grid>
            </Section>
            <Section background={{ color: 'black' }} style={{ position: 'relative' }}>
                <div className={classes.cartBackground} style={{ backgroundImage: `url(${cart})` }} />
                <div style={{ zIndex: 100 }}>
                    <SectionBlurb
                        jumbo
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
                    <div style={{ marginTop: theme.spacing(2), display: 'inline-flex' }}>
                        <AppleStoreIcon style={{ cursor: 'pointer' }} />
                        <GoogleStoreIcon style={{ cursor: 'pointer', marginLeft: theme.spacing(2) }} />
                    </div>
                </div>

                <Spacer flex={0} width={theme.spacing(8)} height={theme.spacing(8)} />

                <ScreenShot src={screenshot} alt={'Swing Essentials app screenshot'} style={{ flex: '0 0 auto' }} />
            </Section>

            {testimonials.length > 0 && (
                <Section style={{ display: 'block', textAlign: 'center' }}>
                    <Headline>{`Here's What Our Customers Are Saying`}</Headline>
                    <div className={classes.testimonialWrapper}>
                        {testimonials.slice(0, 3).map((testimonial, ind) => (
                            <React.Fragment key={`testimonial_${ind}`}>
                                <Testimonial
                                    name={getAbbreviatedName(testimonial.username, testimonial.first, testimonial.last)}
                                    initials={getInitials(testimonial.username, testimonial.first, testimonial.last)}
                                    location={testimonial.location}
                                    joined={
                                        parseInt(testimonial.joined, 10) > 0
                                            ? new Date(parseInt(testimonial.joined, 10) * 1000).getFullYear().toString()
                                            : ''
                                    }
                                    testimonial={testimonial.review}
                                    style={{ flex: '1 1 0', margin: '0 auto' }}
                                />
                                {ind < testimonials.length - 1 && ind < 2 && <Spacer flex={0} height={64} width={64} />}
                            </React.Fragment>
                        ))}
                    </div>
                </Section>
            )}
        </>
    );
};
