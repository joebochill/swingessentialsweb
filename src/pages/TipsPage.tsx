import React, { useState, useEffect } from 'react';
import bg from '../assets/images/banners/tips.jpg';
import {
    makeStyles,
    Theme,
    createStyles,
    Toolbar,
    AppBar,
    Button,
    Typography,
    useTheme,
    Card,
    CardHeader,
    IconButton,
    useMediaQuery,
    CircularProgress,
} from '@material-ui/core';
import { SectionBlurb } from '../components/SectionBlurb';
import { AddCircle, Today, Create, ChevronRight, ChevronLeft } from '@material-ui/icons';
import YouTube from 'react-youtube';

import { Spacer, InfoListItem } from '@pxblue/react-components';
import { prettyDate } from '../utilities/date';
import { splitParagraphText } from '../utilities/text';
import { FancyHeadline } from '../components/FancyHeadline';
import { useSelector } from 'react-redux';
import { AppState, Tip } from '../__types__';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bannerWrapper: {
            height: 540,
            maxHeight: '80%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 100,
            [theme.breakpoints.down('sm')]: {
                padding: `100px 10%`,
                textAlign: 'center',
            },
        },
        section: {
            background: theme.palette.background.default,
            padding: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:nth-child(even)': {
                background: theme.palette.background.paper,
            },
            [theme.breakpoints.down('sm')]: {
                padding: `100px 10%`,
            },
        },
        tipSection: {
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'stretch',
            },
        },
        listCard: {
            flex: '1 1 0px',
            maxWidth: '40%',
        },
        youtube: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        actionPanel: {
            alignSelf: 'center',
            marginTop: 0,
        },
        chevron: {
            cursor: 'pointer',
        },
        disabled: {
            cursor: 'default',
            opacity: 0.5,
        },
    })
);

export const TipsPage: React.FC = (): JSX.Element => {
    const currentYear = new Date().getFullYear();
    const classes = useStyles();
    const theme = useTheme();
    const tips = useSelector((state: AppState) => state.tips.tipList);
    const loading = useSelector((state: AppState) => state.tips.loading);
    const admin = useSelector((state: AppState) => state.auth.admin);
    const [activeYear, setActiveYear] = useState(currentYear);
    const [activeTip, setActiveTip] = useState<Tip | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const isSmall = useMediaQuery('(max-width:959px)');

    useEffect(() => {
        if (!activeTip) {
            setActiveTip(tips[0]);
            setActiveIndex(0);
        }
    }, [tips, activeTip, setActiveTip, setActiveIndex]);

    useEffect(() => {
        if (activeTip && tips.findIndex((tip) => tip.id === activeTip.id) < 0) {
            setActiveIndex(0);
            if (tips.length > 0) setActiveTip(tips[0]);
        }
    }, [tips, activeTip, setActiveIndex, setActiveTip]);

    const firstYear = tips && tips.length > 0 ? parseInt(tips[tips.length - 1].date.substr(0, 4), 10) : currentYear;
    const lastYear = tips && tips.length > 0 ? parseInt(tips[0].date.substr(0, 4), 10) : currentYear;

    const isFirstYear = activeYear === firstYear;
    const isLastYear = activeYear === lastYear;

    const description = activeTip ? splitParagraphText(activeTip.comments) : [];
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
                        backgroundPosition: 'center right',
                        backgroundRepeat: 'no-repeat',
                        opacity: 0.5,
                    }}
                />
                <SectionBlurb
                    jumbo
                    icon={<Today fontSize={'inherit'} />}
                    headline={'Tip of the Month'}
                    subheading={'Keep your game sharp'}
                    body={`Every month, Swing Essentials brings you new video tips to help you solve common problems in your golf game. If you have an idea for a future tip, let us know!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </div>
            {admin && (
                <AppBar position={'static'} color={'default'}>
                    <Toolbar style={{ justifyContent: 'center' }}>
                        <Button variant={'text'}>
                            <AddCircle style={{ marginRight: 4 }} />
                            New Tip
                        </Button>
                    </Toolbar>
                </AppBar>
            )}
            {loading && (
                <div className={classes.section}>
                    <CircularProgress />
                </div>
            )}
            {tips.length > 0 && (
                <div className={classes.section}>
                    <div className={classes.tipSection}>
                        {!isSmall && (
                            <Card className={classes.listCard}>
                                <CardHeader
                                    title={activeYear}
                                    titleTypographyProps={{ variant: 'subtitle2' }}
                                    action={
                                        <>
                                            <ChevronLeft
                                                className={!isLastYear ? classes.chevron : classes.disabled}
                                                onClick={
                                                    !isLastYear ? (): void => setActiveYear(activeYear + 1) : undefined
                                                }
                                            />
                                            <ChevronRight
                                                className={!isFirstYear ? classes.chevron : classes.disabled}
                                                style={{ marginLeft: 8 }}
                                                onClick={
                                                    !isFirstYear ? (): void => setActiveYear(activeYear - 1) : undefined
                                                }
                                            />
                                        </>
                                    }
                                    classes={{ action: classes.actionPanel }}
                                    style={{ background: theme.palette.primary.main, color: 'white' }}
                                />
                                {tips.map((tip, index) => {
                                    if (!tip.date.startsWith(activeYear.toString())) {
                                        return null;
                                    }
                                    return (
                                        <InfoListItem
                                            key={`tip_${tip.id}`}
                                            dense
                                            chevron
                                            hidePadding
                                            wrapTitle
                                            divider={'full'}
                                            title={tip.title}
                                            subtitle={prettyDate(tip.date)}
                                            onClick={(): void => {
                                                setActiveTip(tip);
                                                setActiveIndex(index);
                                            }}
                                            statusColor={
                                                activeTip && tip.id === activeTip.id ? theme.palette.primary.main : ''
                                            }
                                            backgroundColor={
                                                activeTip && tip.id === activeTip.id
                                                    ? theme.palette.primary.light
                                                    : undefined
                                            }
                                        />
                                    );
                                })}
                            </Card>
                        )}
                        <Spacer flex={0} width={100} />
                        {activeTip && (
                            <div style={{ flex: '1 1 0px' }}>
                                <div
                                    style={{
                                        width: '100%',
                                        background: 'black',
                                        paddingTop: '56.25%',
                                        position: 'relative',
                                        marginBottom: 32,
                                    }}
                                >
                                    <YouTube
                                        videoId={activeTip.video}
                                        // id={"se_response_video"}
                                        className={classes.youtube}
                                        opts={{
                                            playerVars: {
                                                showinfo: 0,
                                                origin: 'www.swingessentials.com',
                                                playsinline: 1,
                                                rel: 0,
                                            },
                                        }}
                                    />
                                    {isSmall && (
                                        <>
                                            <IconButton
                                                disabled={activeIndex <= 0}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    left: -32,
                                                    padding: 0,
                                                    fontSize: 32,
                                                }}
                                                onClick={(): void => {
                                                    setActiveIndex(activeIndex - 1);
                                                    setActiveTip(tips[activeIndex - 1]);
                                                }}
                                            >
                                                <ChevronLeft fontSize={'inherit'} />
                                            </IconButton>
                                            <IconButton
                                                disabled={activeIndex >= tips.length - 1}
                                                style={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    right: -32,
                                                    padding: 0,
                                                    fontSize: 32,
                                                }}
                                                onClick={(): void => {
                                                    setActiveIndex(activeIndex + 1);
                                                    setActiveTip(tips[activeIndex + 1]);
                                                }}
                                            >
                                                <ChevronRight fontSize={'inherit'} />
                                            </IconButton>
                                        </>
                                    )}
                                </div>
                                <FancyHeadline
                                    icon={<Create fontSize={'inherit'} />}
                                    headline={activeTip.title}
                                    subheading={prettyDate(activeTip.date)}
                                    style={{ cursor: 'pointer' }}
                                    onClick={(): void => {
                                        /* do nothing */
                                    }}
                                />

                                {description.map((par, pInd) => (
                                    <Typography key={`par_${pInd}`} paragraph style={{ lineHeight: 1.8 }}>
                                        {par}
                                    </Typography>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
