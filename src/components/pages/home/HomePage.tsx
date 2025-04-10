import React, { JSX } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    BoxProps,
    Button,
    ButtonProps,
    Fab,
    FabProps,
    Grid2,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';

import bg from '../../../assets/images/banners/landing.jpg';
import fullLogo from '../../../assets/images/logos/logo-full-white.svg';
import pga from '../../../assets/images/logos/pga-member.svg';
import pgaWhite from '../../../assets/images/logos/pga-member-white.svg';
import tips from '../../../assets/images/banners/tips.jpg';
import nineteen from '../../../assets/images/banners/19th.jpg';
import pros from '../../../assets/images/banners/nelson.jpeg';
import cart from '../../../assets/images/banners/download.jpg';
import screenshot from '../../../assets/images/screenshot/home.png';
import appstore from '../../../assets/images/logos/app-store.svg';
import playstore from '../../../assets/images/logos/google-play.svg';
import { RootState } from '../../../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import { Banner } from '../../layout/Banner';
import { APP_STORE_LINK, PLAY_STORE_LINK } from '../../../constants';
import { Section } from '../../layout/Section';
import { InfoCard } from '../../navigation/InfoCard';
import { GetApp } from '@mui/icons-material';
import { ScreenShot } from '../../common/ScreenShot';
import { useGetTestimonialsQuery } from '../../../redux/apiServices/testimonialsService';
import { getAbbreviatedName, getInitials } from '../../../utilities/strings';
import { Testimonial } from './Testimonial';
import { useDarkMode } from '../../../hooks';
import { SectionBlurb } from '../../common/SectionBlurb';

const AppleStoreIcon: React.FC<BoxProps> = (props) => (
    <Box
        component={'img'}
        src={appstore}
        alt={'Apple App Store Icon'}
        onClick={(): void => {
            window.open(APP_STORE_LINK, 'blank');
        }}
        {...props}
    />
);

const GoogleStoreIcon: React.FC<BoxProps> = (props) => (
    <Box
        component={'img'}
        src={playstore}
        alt={'Google Play Store Icon'}
        onClick={(): void => {
            window.open(PLAY_STORE_LINK, 'blank');
        }}
        {...props}
    />
);

const RegisterButton: React.FC<ButtonProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector((state: RootState) => state.auth.token);

    const { sx, ...other } = props;

    return !token ? (
        <Button
            variant={'contained'}
            color={'primary'}
            sx={[
                {
                    display: 'flex',
                    color: 'primary.contrastText',
                    border: '1px solid',
                    borderColor: 'primary.contrastText',
                    borderRadius: (t) => t.spacing(1),
                    margin: '0 auto',
                    minWidth: 270,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            onClick={(): void => {
                navigate(ROUTES.LOGIN, {
                    state: {
                        from: { pathname: location.pathname },
                        initialPage: 'register',
                    },
                });
            }}
            {...other}
        >
            Sign Up Today
        </Button>
    ) : null;
};
const RegisterFab: React.FC<Omit<FabProps, 'children'>> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = useSelector((state: RootState) => state.auth.token);

    return !token ? (
        <Fab
            variant={'extended'}
            color={'primary'}
            sx={{
                position: 'fixed',
                bottom: (t) => t.spacing(4),
                right: (t) => t.spacing(4),
                border: '1px solid white',
                borderRadius: (t) => t.spacing(1),
                zIndex: 2000,
            }}
            onClick={(): void => {
                navigate(ROUTES.LOGIN, {
                    state: {
                        from: { pathname: location.pathname },
                        initialPage: 'register',
                    },
                });
            }}
            {...props}
        >
            Sign Up Today
        </Fab>
    ) : null;
};

export const HomePage: React.FC = (): JSX.Element => {
    const navigate = useNavigate();

    const smDown = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const lgDown = useMediaQuery((theme) => theme.breakpoints.down('xl'));
    const { isDarkMode } = useDarkMode();
    //   useGoogleAnalyticsPageView();

    const token = useSelector((state: RootState) => state.auth.token);

    const { data: testimonials = [] } = useGetTestimonialsQuery();

    return (
        <>
            <Banner
                background={{
                    src: bg,
                    position: 'center 70%',
                }}
                noPadding
                justifyContent={'center'}
                alignItems={'center'}
                lockAspectRatio
                contentPosition={'absolute'}
            >
                <Box
                    component={'img'}
                    src={isDarkMode ? pgaWhite : pga}
                    alt={'PGA Logo'}
                    sx={{
                        position: 'absolute',
                        bottom: (t) => t.spacing(2),
                        right: (t) => t.spacing(2),
                        maxWidth: 120,
                        width: '15%',
                    }}
                />
                <Box sx={{ width: '60%', maxWidth: 600 }}>
                    <img src={fullLogo} alt={'Swing Essentials banner logo'} style={{ width: '100%' }} />
                    <Box
                        sx={{
                            left: 0,
                            width: '100%',
                            textAlign: 'center',
                            mt: { xs: 0, sm: 2 },
                        }}
                    >
                        <AppleStoreIcon style={{ cursor: 'pointer' }} />
                        <GoogleStoreIcon style={{ cursor: 'pointer' }} />
                        {!smDown && <RegisterButton />}
                    </Box>
                </Box>
            </Banner>

            {smDown && <RegisterFab />}

            <Section
                sx={{
                    gap: { xs: 0, md: 8 },
                    alignItems: 'center',
                    textAlign: { xs: 'center', md: 'initial' },
                }}
            >
                <SectionBlurb
                    headline={'Lessons on your schedule'}
                    body={
                        <span>
                            Swing Essentials<sup>®</sup> provides you with affordable, individualized one-on-one
                            lessons from a PGA-certified golf professional from the comfort and convenience of your
                            home.
                        </span>
                    }
                />
                <Stack sx={{ maxWidth: 512, gap: 4 }}>
                    {[
                        'Pull out your smart phone and snap a short video of your swing using your camera.',
                        "Preview your swing and when you're ready, submit your videos for professional analysis",
                        "Within 48 hours, you will receive a personalized video highlighting what you're doing well plus areas of your swing that could be improved.",
                    ].map((text, i) => (
                        <Stack
                            key={`step${i}`}
                            alignItems={'center'}
                            gap={2}
                            sx={{
                                flexDirection: { xs: 'column', md: 'row' },
                            }}
                        >
                            <Box
                                sx={{
                                    flex: '0 0 auto',
                                    height: 80,
                                    width: 80,
                                    borderRadius: '65px',
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Typography variant={'h4'} fontWeight={'700'}>
                                    {i + 1}
                                </Typography>
                            </Box>
                            <Typography>{text}</Typography>
                        </Stack>
                    ))}
                </Stack>
            </Section>

            <Section>
                <Grid2 container justifyContent={'center'} alignContent={'stretch'} /*sx={{ m: -6 }}*/>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <InfoCard
                            src={pros}
                            title={'Meet Our Pros'}
                            aspectRatio={'16x9'}
                            backgroundPosition={'center 25%'}
                            description={
                                'Get to know the folks behind the lessons and the experience they bring to the table.'
                            }
                            onClick={(): void => {
                                navigate(ROUTES.PROS);
                            }}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <InfoCard
                            src={tips}
                            title={'Tip of the Month'}
                            aspectRatio={'16x9'}
                            description={
                                'Each month we bring you a new video to help you bring your golf game to the next level.'
                            }
                            onClick={(): void => {
                                navigate(ROUTES.TIPS);
                            }}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 4 }}>
                        <InfoCard
                            src={nineteen}
                            title={'The 19th Hole'}
                            aspectRatio={'16x9'}
                            description={
                                'Check out our golf blog where we share stories from the field and talk about all things golf.'
                            }
                            onClick={(): void => {
                                navigate(ROUTES.BLOG);
                            }}
                        />
                    </Grid2>
                </Grid2>
            </Section>

            <Section
                sx={{
                    gap: 8,
                    position: 'relative',
                    backgroundColor: '#000000',
                    alignItems: 'center',
                }}
            >
                {/* Background Graphic */}
                <Box
                    sx={{
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
                        backgroundImage: `url(${cart})`,
                    }}
                />
                <Box sx={{ zIndex: 100, textAlign: { xs: 'center', md: 'initial' } }}>
                    <SectionBlurb
                        icon={<GetApp fontSize={'inherit'} />}
                        headline={'Download our app!'}
                        subheading={'Available from the App Store and Google Play'}
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
                        sx={{ color: 'primary.contrastText', mb: 0 }}
                    />
                    <Stack sx={{ display: 'inline-flex', flexDirection: { xs: 'column', sm: 'row' }, mt: 2, gap: 2 }}>
                        <AppleStoreIcon sx={{ cursor: 'pointer' }} />
                        <GoogleStoreIcon sx={{ cursor: 'pointer' }} />
                    </Stack>
                </Box>

                <ScreenShot src={screenshot} alt={'Swing Essentials app screenshot'} sx={{ flex: '0 0 auto' }} />
            </Section>

            {testimonials.length > 0 && (
                <Section style={{ display: 'block', textAlign: 'center' }}>
                    <Typography variant={'h4'}>{`Here's what our customers are saying`}</Typography>
                    <Stack
                        sx={{
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: { xs: 'flex-start', md: 'center' },
                            alignItems: { xs: 'center', md: 'stretch' },
                            mt: 4,
                            gap: 8,
                        }}
                    >
                        {testimonials.slice(0, lgDown ? 3 : 5).map((testimonial, ind) => (
                            <Testimonial
                                key={`testimonial_${ind}`}
                                name={getAbbreviatedName(testimonial.username, testimonial.first, testimonial.last)}
                                initials={getInitials(testimonial.username, testimonial.first, testimonial.last)}
                                location={testimonial.location}
                                joined={
                                    parseInt(testimonial.joined, 10) > 0
                                        ? new Date(parseInt(testimonial.joined, 10) * 1000).getFullYear().toString()
                                        : ''
                                }
                                testimonial={testimonial.review}
                                sx={{ flex: { xs: '1 1 auto', md: '1 1 0' }, margin: '0 auto', width: '100%' }}
                            />
                        ))}
                    </Stack>
                </Section>
            )}

            {!token && !smDown && (
                <Section style={{ display: 'block', textAlign: 'center' }}>
                    <Typography variant={'h4'}>{`Let's get started!`}</Typography>
                    <RegisterButton sx={{ mt: 6, border: 'none' }} />
                </Section>
            )}
        </>
    );
};
