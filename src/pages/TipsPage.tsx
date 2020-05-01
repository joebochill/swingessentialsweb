import React, { useState, useEffect } from 'react';
import bg from '../assets/images/banners/tips.jpg';
import {
    makeStyles,
    createStyles,
    Button,
    Typography,
    useTheme,
    Card,
    CardHeader,
    IconButton,
    useMediaQuery,
} from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { AddCircle, Today, Edit, ChevronRight, ChevronLeft } from '@material-ui/icons';
import YouTube from 'react-youtube';

import { Spacer, InfoListItem } from '@pxblue/react-components';
import { prettyDate } from '../utilities/date';
import { splitDatabaseText } from '../utilities/text';
import { FancyHeadline } from '../components/text/FancyHeadline';
import { useSelector } from 'react-redux';
import { AppState, Tip } from '../__types__';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { ActionToolbar } from '../components/actions/ActionToolbar';
import { LoadingIndicator } from '../components/display/LoadingIndicator';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { EditTipDialog } from '../components/tips/EditTipDialog';

const BlankTip: Tip = {
    id: -1,
    title: '',
    date: '',
    video: '',
    comments: '',
};

const useStyles = makeStyles(() =>
    createStyles({
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
    const history = useHistory();

    const tips = useSelector((state: AppState) => state.tips.tipList);
    const loading = useSelector((state: AppState) => state.tips.loading);
    const admin = useSelector((state: AppState) => state.auth.admin);
    const { id } = useParams();

    const [activeYear, setActiveYear] = useState(currentYear);
    const [activeTip, setActiveTip] = useState<Tip | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showNewDialog, setShowNewDialog] = useState(false);

    const paramIndex = id !== undefined ? tips.findIndex((tip) => tip.id === id) : -1;

    const isSmall = useMediaQuery('(max-width:959px)');

    useEffect(() => {
        if (!activeTip) {
            if (id !== undefined && paramIndex >= 0) {
                setActiveTip(tips[paramIndex]);
                setActiveIndex(paramIndex);
            } else {
                setActiveTip(tips[0]);
                setActiveIndex(0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tips, activeTip, setActiveTip, setActiveIndex]);

    useEffect(() => {
        if (activeTip && tips.findIndex((tip) => tip.id === activeTip.id) < 0) {
            setActiveIndex(0);
            if (tips.length > 0) setActiveTip(tips[0]);
        }
    }, [tips, activeTip, setActiveIndex, setActiveTip]);

    useEffect(() => {
        if (activeTip) {
            const ind = tips.findIndex((tip) => tip.id === activeTip.id);
            setActiveTip(ind >= 0 ? tips[ind] : tips[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tips]);

    const firstYear = tips && tips.length > 0 ? parseInt(tips[tips.length - 1].date.substr(0, 4), 10) : currentYear;
    const lastYear = tips && tips.length > 0 ? parseInt(tips[0].date.substr(0, 4), 10) : currentYear;

    const isFirstYear = activeYear === firstYear;
    const isLastYear = activeYear === lastYear;

    const description = activeTip ? splitDatabaseText(activeTip.comments) : [];

    if (id !== undefined && paramIndex < 0 && tips.length > 0) {
        return <Redirect to={ROUTES.TIPS} />;
    }

    return (
        <>
            <Banner background={{ src: bg, position: 'center right' }}>
                <SectionBlurb
                    jumbo
                    icon={<Today fontSize={'inherit'} />}
                    headline={'Tip of the Month'}
                    subheading={'Keep your game sharp'}
                    body={`Every month, Swing Essentials brings you new video tips to help you solve common problems in your golf game. If you have an idea for a future tip, let us know!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>
            <ActionToolbar show={admin}>
                <Button variant={'text'} onClick={(): void => setShowNewDialog(true)}>
                    <AddCircle style={{ marginRight: 4 }} />
                    New Tip
                </Button>
            </ActionToolbar>

            <LoadingIndicator show={loading && tips.length < 1} />

            {admin && (
                <EditTipDialog
                    isNew={showNewDialog}
                    tip={showNewDialog ? BlankTip : activeTip ? activeTip : BlankTip}
                    open={showNewDialog || showEditDialog}
                    onClose={(): void => {
                        setShowNewDialog(false);
                        setShowEditDialog(false);
                    }}
                />
            )}

            {tips.length > 0 && (
                <Section align={'flex-start'}>
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
                                            history.replace(`${ROUTES.TIPS}/${tip.id}`);
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
                    <Spacer flex={0} width={64} />
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
                                                history.replace(`${ROUTES.TIPS}/${tips[activeIndex - 1].id}`);
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
                                                history.replace(`${ROUTES.TIPS}/${tips[activeIndex + 1].id}`);
                                            }}
                                        >
                                            <ChevronRight fontSize={'inherit'} />
                                        </IconButton>
                                    </>
                                )}
                            </div>
                            <FancyHeadline
                                icon={<Edit fontSize={'inherit'} />}
                                headline={activeTip.title}
                                subheading={prettyDate(activeTip.date)}
                                style={admin ? { cursor: 'pointer' } : {}}
                                onClick={
                                    admin
                                        ? (): void => {
                                              setShowEditDialog(true);
                                          }
                                        : undefined
                                }
                            />

                            {description.map((par, pInd) => (
                                <Typography key={`par_${pInd}`} paragraph style={{ lineHeight: 1.8 }}>
                                    {par}
                                </Typography>
                            ))}
                        </div>
                    )}
                </Section>
            )}
        </>
    );
};
