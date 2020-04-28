import React, { useState } from 'react';
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
} from '@material-ui/core';
import { SectionBlurb } from '../components/SectionBlurb';
import { AddCircle, Today, Create, ChevronRight, ChevronLeft } from '@material-ui/icons';
import YouTube from 'react-youtube';

import { MockTips } from '../__mock-data__';
import { Spacer, InfoListItem } from '@pxblue/react-components';
import { prettyDate } from '../utilities/date';
import { splitParagraphText } from '../utilities/text';
import { FancyHeadline } from '../components/FancyHeadline';

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
                alignItems: 'center',
            },
        },
        listCard: {
            flex: '1 1 0px',
            maxWidth: '40%',
            // [theme.breakpoints.down('sm')]: {
            //     flex: '1 1 auto',
            //     display: 'none'
            // },
        },
        youtube: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        // noMargin: {
        //     overflow: 'hidden',
        //     margin: '0 !important',
        //     '&$expanded': {
        //         minHeight: theme.spacing(6),
        //     },
        // },
        // expanded: {},
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
    const classes = useStyles();
    const theme = useTheme();
    const [activeYear, setActiveYear] = useState(parseInt(MockTips[0].date.substr(0, 4), 10));
    const [activeTip, setActiveTip] = useState(MockTips[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const isSmall = useMediaQuery('(max-width:959px)');

    const firstYear = parseInt(MockTips[MockTips.length - 1].date.substr(0, 4), 10);
    const lastYear = parseInt(MockTips[0].date.substr(0, 4), 10);

    const isFirstYear = activeYear === firstYear;
    const isLastYear = activeYear === lastYear;

    const description = splitParagraphText(activeTip.comments);
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
                    icon={<Today fontSize={'inherit'} />}
                    headline={'Tip of the Month'}
                    subheading={'Keep your game sharp'}
                    body={`Every month, Swing Essentials brings you new video tips to help you solve common problems in your golf game. If you have an idea for a future tip, let us know!`}
                    style={{ color: 'white', zIndex: 100 }}
                />
            </div>
            <AppBar position={'static'} color={'default'}>
                <Toolbar style={{ justifyContent: 'center' }}>
                    <Button variant={'text'}>
                        <AddCircle style={{ marginRight: 4 }} />
                        New Tip
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.section}>
                <div className={classes.tipSection}>
                    {/* <div style={{ flex: '1 1 0px', maxWidth: '40%' }}> */}
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
                            {MockTips.map((tip, index) => {
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
                                        statusColor={tip.id === activeTip.id ? theme.palette.primary.main : ''}
                                        backgroundColor={
                                            tip.id === activeTip.id ? theme.palette.primary.light : undefined
                                        }
                                    />
                                );
                            })}
                        </Card>
                    )}
                    {/* <ExpansionPanel defaultExpanded square>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMore />}
                                IconButtonProps={{ color: 'inherit' }}
                                style={{ background: theme.palette.primary.main, color: 'white', padding: '0 16px', margin: 0 }}
                                classes={{
                                    root: classes.noMargin,
                                    content: classes.noMargin,
                                    expanded: classes.expanded,
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant={'subtitle2'}>{activeYear}</Typography>
                                </div>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{ display: 'block', padding: 0 }}>
                                {MockTips.filter((tip) => tip.date.startsWith(activeYear.toString())).map((tip) => (
                                    <InfoListItem key={`tip_${tip.id}`}
                                        dense
                                        chevron
                                        hidePadding
                                        wrapTitle
                                        divider={'full'}
                                        title={tip.title}
                                        subtitle={prettyDate(tip.date)}
                                        onClick={(): void => setActiveTip(tip)}
                                        statusColor={tip.id === activeTip.id ? theme.palette.primary.main : ''}
                                        backgroundColor={tip.id === activeTip.id ? theme.palette.primary.light : undefined}
                                    />
                                ))}

                            </ExpansionPanelDetails>
                        </ExpansionPanel> */}

                    {/* </div> */}
                    <Spacer flex={0} width={100} />
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
                                            setActiveTip(MockTips[activeIndex - 1]);
                                        }}
                                    >
                                        <ChevronLeft fontSize={'inherit'} />
                                    </IconButton>
                                    <IconButton
                                        disabled={activeIndex >= MockTips.length - 1}
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
                                            setActiveTip(MockTips[activeIndex + 1]);
                                        }}
                                    >
                                        <ChevronRight fontSize={'inherit'} />
                                    </IconButton>
                                </>
                            )}
                        </div>
                        <FancyHeadline
                            small
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
                </div>
            </div>
        </>
    );
};
