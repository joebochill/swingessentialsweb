import React, { useState, useEffect } from 'react';
import bg from '../assets/images/banners/lessons.jpg';
import { makeStyles, createStyles, Button, Typography, IconButton, useMediaQuery, Theme } from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import {
    AddCircle,
    Edit,
    ChevronRight,
    ChevronLeft,
    Subscriptions,
    FilterList,
    Warning,
    Update,
} from '@material-ui/icons';
import YouTube from 'react-youtube';

import { Spacer, EmptyState } from '@pxblue/react-components';
import { prettyDate } from '../utilities/date';
import { splitDatabaseText } from '../utilities/text';
import { FancyHeadline } from '../components/text/FancyHeadline';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Lesson } from '../__types__';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { PendingLessonsCard } from '../components/lessons/PendingCard';
import { CompletedLessonsCard } from '../components/lessons/CompletedCard';
import { PlaceholderLesson } from '../constants/lessons';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { ActionToolbar } from '../components/actions/ActionToolbar';
import { LoadingIndicator } from '../components/display/LoadingIndicator';
import { FilterLessonsDialog } from '../components/lessons/FilterLessonsDialog';
import { EditLessonDialog } from '../components/lessons/EditLessonDialog';
import { NewLessonDialog } from '../components/lessons/NewLessonDialog';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionBar: {
            top: 64,
            [theme.breakpoints.down('xs')]: {
                top: 56,
            },
        },
        cardContainer: {
            flex: '1 1 0px',
            maxWidth: '40%',
        },
        videoWrapper: {
            width: '100%',
            background: 'black',
            paddingTop: '56.25%',
            position: 'relative',
            marginBottom: 32,
        },
        youtube: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
        nextButton: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: -32,
            padding: 0,
            fontSize: 32,
        },
        previousButton: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: -32,
            padding: 0,
            fontSize: 32,
        },
    })
);

export const LessonsPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const lessons = useSelector((state: AppState) => state.lessons);
    const closedLessons = lessons.closed;
    const pendingLessons = lessons.pending;
    const activeLesson = lessons.selected;

    const pendingIndex = !activeLesson
        ? -1
        : pendingLessons.findIndex((lesson) => lesson.request_id === activeLesson.request_id);
    const completeIndex = !activeLesson
        ? -1
        : closedLessons.findIndex((lesson) => lesson.request_id === activeLesson.request_id);

    const token = useSelector((state: AppState) => state.auth.token);
    const admin = useSelector((state: AppState) => state.auth.admin);

    const [filter, setFilter] = useState('');
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showNewDialog, setShowNewDialog] = useState(false);

    const isSmall = useMediaQuery('(max-width:959px)');

    // Initialize the active lesson when we load the lessons
    useEffect(() => {
        if (!activeLesson) {
            const active = closedLessons.length > 0 ? closedLessons[0] : PlaceholderLesson;
            dispatch({ type: 'SET_SELECTED_LESSON', payload: active });
        } else if (activeLesson.request_id === -1 && closedLessons.length > 0) {
            dispatch({ type: 'SET_SELECTED_LESSON', payload: closedLessons[0] });
        } else if (activeLesson && closedLessons.length < 1) {
            dispatch({ type: 'SET_SELECTED_LESSON', payload: PlaceholderLesson });
        } else if (activeLesson && completeIndex >= 0) {
            dispatch({
                type: 'SET_SELECTED_LESSON',
                payload: closedLessons.find((lesson) => lesson.request_id === activeLesson.request_id),
            });
        }
    }, [closedLessons]);

    const description =
        activeLesson && activeLesson.response_notes ? splitDatabaseText(activeLesson.response_notes) : [];

    if (!token) return <Redirect to={ROUTES.HOME} />

    return (
        <>
            <Banner background={{ src: bg, position: 'center right' }}>
                <SectionBlurb
                    jumbo
                    icon={<Subscriptions fontSize={'inherit'} />}
                    headline={'Your Lessons'}
                    subheading={`See how far you've come`}
                    body={`Here, you can view all of the lessons that you have taken with Swing Essentials. Each lesson includes a detailed video analysis as well as written comments and tips to try the next time you're on the range. Submit your swing for a new lesson today!`}
                    style={{ color: 'white', zIndex: 100, maxWidth: 960 }}
                />
            </Banner>
            <ActionToolbar show={admin}>
                <Button variant={'text'} onClick={(): void => setShowNewDialog(true)}>
                    <AddCircle style={{ marginRight: 4 }} />
                    New In-Person Lesson
                </Button>
                <Button variant={'text'} onClick={(): void => setShowFilterDialog(true)}>
                    <FilterList style={{ marginRight: 4 }} />
                    Filter By User
                </Button>
            </ActionToolbar>

            <LoadingIndicator show={pendingLessons.length < 1 && closedLessons.length < 1 && lessons.loading} />
            {admin && (
                <>
                    <FilterLessonsDialog
                        open={showFilterDialog}
                        onFilterChange={(username): void => {
                            setFilter(username);
                        }}
                        onClose={(): void => setShowFilterDialog(false)}
                    />
                    {activeLesson && (
                        <EditLessonDialog
                            open={showEditDialog}
                            onClose={(): void => setShowEditDialog(false)}
                            lesson={activeLesson}
                        />
                    )}
                    <NewLessonDialog open={showNewDialog} onClose={(): void => setShowNewDialog(false)} />
                </>
            )}
            <Section align={isSmall ? 'stretch' : 'flex-start'}>
                <div className={classes.cardContainer}>
                    <PendingLessonsCard style={{ marginBottom: 32 }} hidden={isSmall} />
                    <CompletedLessonsCard filter={filter} hidden={isSmall} />
                </div>

                <Spacer flex={0} width={64} />
                {activeLesson && (
                    <div style={{ flex: '1 1 0px' }}>
                        <div style={{ marginBottom: 32 }}>
                            <div
                                className={classes.videoWrapper}
                                style={{
                                    background: activeLesson.response_video ? 'black' : 'rgba(0,0,0,0.05)',
                                }}
                            >
                                {activeLesson.response_video && (
                                    <YouTube
                                        videoId={activeLesson.response_video}
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
                                )}
                                {!activeLesson.response_video && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                                        <EmptyState
                                            icon={<Update fontSize={'inherit'} />}
                                            title={'Swing Analysis In Progress'}
                                            description={`We're working on your lesson now. Check back soon!`}
                                        />
                                    </div>
                                )}
                                {isSmall && (
                                    <>
                                        <IconButton
                                            className={classes.previousButton}
                                            disabled={
                                                pendingIndex === 0 ||
                                                (pendingLessons.length === 0 && completeIndex === 0)
                                            }
                                            onClick={(): void => {
                                                const next =
                                                    pendingIndex > 0
                                                        ? pendingLessons[pendingIndex - 1]
                                                        : completeIndex === 0
                                                        ? pendingLessons[pendingLessons.length - 1]
                                                        : closedLessons[completeIndex - 1];
                                                dispatch({ type: 'SET_SELECTED_LESSON', payload: next });
                                            }}
                                        >
                                            <ChevronLeft fontSize={'inherit'} />
                                        </IconButton>
                                        <IconButton
                                            className={classes.nextButton}
                                            disabled={completeIndex >= closedLessons.length - 1}
                                            onClick={(): void => {
                                                let next: Lesson = PlaceholderLesson;
                                                // Next pending lesson
                                                if (pendingIndex >= 0 && pendingIndex < pendingLessons.length - 1) {
                                                    next = pendingLessons[pendingIndex + 1];
                                                }
                                                // Crossing Boundary
                                                else if (
                                                    pendingIndex >= 0 &&
                                                    pendingIndex === pendingLessons.length - 1 &&
                                                    closedLessons.length > 0
                                                ) {
                                                    next = closedLessons[0];
                                                }
                                                // Next complete lesson
                                                else if (completeIndex >= 0) {
                                                    next = closedLessons[completeIndex + 1];
                                                }
                                                dispatch({ type: 'SET_SELECTED_LESSON', payload: next });
                                            }}
                                        >
                                            <ChevronRight fontSize={'inherit'} />
                                        </IconButton>
                                    </>
                                )}
                            </div>
                            {activeLesson.response_video && (
                                <>
                                    <FancyHeadline
                                        icon={admin ? <Edit fontSize={'inherit'} /> : undefined}
                                        headline={
                                            admin ? activeLesson.username || '' : prettyDate(activeLesson.request_date)
                                        }
                                        subheading={
                                            admin
                                                ? prettyDate(activeLesson.request_date)
                                                : activeLesson.type === 'in-person'
                                                ? 'In-Person Lesson'
                                                : 'Remote Lesson'
                                        }
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
                                </>
                            )}
                        </div>
                        {activeLesson && activeLesson.type !== 'in-person' && (
                            <>
                                <Typography variant={'h6'} style={{ marginBottom: 16, lineHeight: 1.2 }}>
                                    Your Submission
                                </Typography>
                                {activeLesson.fo_swing !== '' && activeLesson.dtl_swing !== '' && (
                                    <>
                                        <div style={{ width: '100%', display: 'flex' }}>
                                            <div style={{ flex: '1 1 0px', background: 'black' }}>
                                                <video
                                                    width="100%"
                                                    controls
                                                    src={`https://www.swingessentials.com/video_links/${activeLesson.request_url}/${activeLesson.fo_swing}`}
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                            <Spacer flex={0} width={16} height={16} />
                                            <div style={{ flex: '1 1 0px', background: 'black' }}>
                                                <video
                                                    width="100%"
                                                    controls
                                                    src={`https://www.swingessentials.com/video_links/${activeLesson.request_url}/${activeLesson.dtl_swing}`}
                                                >
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </div>
                                        <Spacer flex={0} height={16} />
                                    </>
                                )}
                                {splitDatabaseText(activeLesson.request_notes).map((par, pInd) => (
                                    <Typography key={`par_${pInd}`} paragraph style={{ lineHeight: 1.8 }}>
                                        {par}
                                    </Typography>
                                ))}
                            </>
                        )}
                    </div>
                )}
                {!activeLesson && (
                    <div style={{ flex: '1 1 0px' }}>
                        <EmptyState
                            icon={<Warning fontSize={'inherit'} />}
                            title={'No Lesson Selected'}
                            description={'Choose a lesson to view its details.'}
                        />
                    </div>
                )}
            </Section>
        </>
    );
};
