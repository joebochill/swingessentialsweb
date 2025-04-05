import React, { useState, useEffect, JSX } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import {
    Button,
    Typography,
    IconButton,
    useMediaQuery,
    Card,
    CardHeader,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Skeleton,
    Stack,
    CardProps,
    Box,
    Tooltip,
    BoxProps,
} from '@mui/material';
import {
    AddCircle,
    Edit,
    ChevronRight,
    ChevronLeft,
    Subscriptions,
    FilterList,
    Update,
    Person,
} from '@mui/icons-material';
import bg from '../../../assets/images/banners/lessons2.jpg';
import { format } from 'date-fns';
import { ROUTES } from '../../../constants/routes';
import {
    LessonBasicDetails,
    FullLessonDetails,
    useMarkLessonViewedMutation,
    useGetCompletedLessonsQuery,
    useGetPendingLessonsQuery,
    useGetLessonByIdQuery,
    lessonsApi,
} from '../../../redux/apiServices/lessonsService';
import { AppDispatch, RootState } from '../../../redux/store';
import { splitDatabaseText } from '../../../utilities/text';
import { EmptyState } from '../../common/EmptyState';
import { FancyHeadline } from '../../common/FancyHeadline';
import { SectionBlurb } from '../../common/SectionBlurb';
import { Banner } from '../../layout/Banner';
import { Section } from '../../layout/Section';
import { EditLessonDialog } from './EditLessonDialog';
import { FilterLessonsDialog } from './FilterLessonsDialog';
import { NewLessonDialog } from './NewLessonDialog';
import { UserDetailsDialog } from './UserDetailsDialog';
import { AdminActionToolbar } from '../../common/AdminActionToolbar';
import { BASE_URL } from '../../../constants';
import { useGetWelcomeVideoQuery } from '../../../redux/apiServices/configurationService';

type LessonsCardProps = CardProps & {
    lessons: LessonBasicDetails[];
    title: string;
    showBadges?: boolean;

    selectedLesson?: string;
    onLessonSelected: (id: string) => void;

    page?: number;
    totalPages?: number;

    onNextPage?: () => void;
    onPreviousPage?: () => void;

    loading?: boolean;
    placeholderCount?: number;

    slots?: {
        emptyPlaceholder?: JSX.Element;
        adminEmptyPlaceholder?: JSX.Element;
    };
};
const LessonsCard: React.FC<LessonsCardProps> = (props): JSX.Element => {
    const {
        lessons,
        title,
        showBadges,
        selectedLesson,
        onLessonSelected,
        page = 1,
        totalPages = 1,
        loading,
        placeholderCount = 8,
        onNextPage,
        onPreviousPage,
        slots,
        ...cardProps
    } = props;

    const admin = useSelector((state: RootState) => state.auth.admin);

    const handleLessonSelect = (id: string) => {
        onLessonSelected(id);
    };
    const handlePreviousPage = () => {
        if (hasPreviousPage) {
            onPreviousPage?.();
        }
    };
    const handleNextPage = () => {
        if (hasNextPage) {
            onNextPage?.();
        }
    };

    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return (
        <Card {...cardProps}>
            <CardHeader
                title={title}
                slotProps={{
                    title: { variant: 'subtitle2' },
                }}
                action={
                    totalPages > 1 && (
                        <Stack direction={'row'} alignItems={'center'} spacing={1}>
                            {page > 1 && (
                                <ChevronLeft
                                    sx={{
                                        cursor: hasPreviousPage ? 'pointer' : 'default',
                                        opacity: hasPreviousPage ? 1 : 0.5,
                                    }}
                                    onClick={hasPreviousPage ? handlePreviousPage : undefined}
                                />
                            )}
                            <Typography variant={'caption'}>{`${page} of ${totalPages}`}</Typography>
                            {page < totalPages && (
                                <ChevronRight
                                    sx={{
                                        ml: 1,
                                        cursor: hasNextPage ? 'pointer' : 'default',
                                        opacity: hasNextPage ? 1 : 0.5,
                                    }}
                                    onClick={hasNextPage ? handleNextPage : undefined}
                                />
                            )}
                        </Stack>
                    )
                }
            />
            <List disablePadding sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
                {lessons.map((lesson) => {
                    return (
                        <ListItem key={`tip_${lesson.request_url}`} dense disablePadding divider>
                            <ListItemButton
                                selected={selectedLesson === lesson.request_url}
                                onClick={() => handleLessonSelect(lesson.request_url)}
                            >
                                <ListItemText
                                    primary={
                                        admin ? lesson.username : format(new Date(lesson.request_date), 'MMMM d, yyyy')
                                    }
                                    secondary={
                                        admin
                                            ? format(new Date(lesson.request_date), 'MMMM d, yyyy')
                                            : lesson.type === 'in-person'
                                              ? 'In-Person Lesson'
                                              : 'Remote Lesson'
                                    }
                                />
                                <Stack direction={'row'} spacing={1} alignItems={'center'}>
                                    {!lesson.viewed && showBadges && (
                                        <Typography
                                            variant={'overline'}
                                            sx={{
                                                fontSize: 10,
                                                display: 'block',
                                                lineHeight: 1,
                                                p: 0.75,
                                                backgroundColor: 'primary.main',
                                                color: 'primary.contrastText',
                                                fontWeight: 900,
                                            }}
                                        >
                                            NEW
                                        </Typography>
                                    )}
                                    <ChevronRight sx={{ mr: -1 }} />
                                </Stack>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
                {loading &&
                    lessons.length === 0 &&
                    Array.from({ length: placeholderCount }).map((_, i) => (
                        <ListItem key={i} dense divider>
                            <Skeleton sx={{ width: '100%', height: 64 }}></Skeleton>{' '}
                        </ListItem>
                    ))}
                {!loading &&
                    lessons.length === 0 &&
                    admin &&
                    (slots?.adminEmptyPlaceholder ?? (
                        <ListItem dense>
                            <ListItemText primary={'No pending lessons'} secondary={`You're all caught up!`} />
                        </ListItem>
                    ))}
                {!loading &&
                    lessons.length === 0 &&
                    !admin &&
                    (slots?.emptyPlaceholder ?? (
                        <ListItem dense>
                            <ListItemText primary={'No pending lessons'} secondary={`Check back soon!`} />
                        </ListItem>
                    ))}
            </List>
        </Card>
    );
};

type LessonDetailsPanelProps = BoxProps & {
    lesson?: FullLessonDetails;
    hasNext?: boolean;
    hasPrevious?: boolean;
    onNext?: () => void;
    onPrevious?: () => void;
    showNavigation?: boolean;
    loading?: boolean;
};
const LessonDetailsPanel: React.FC<LessonDetailsPanelProps> = (props): JSX.Element => {
    const { lesson, hasNext, hasPrevious, onNext, onPrevious, showNavigation, loading, ...boxProps } = props;
    const isAdmin = useSelector((state: RootState) => state.auth.admin);
    const [videoLoading, setVideoLoading] = useState(true);

    const [showUserDialog, setShowUserDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);

    const [markLessonViewed] = useMarkLessonViewedMutation();

    useEffect(() => {
        if (!isAdmin && lesson && lesson.response_video && !lesson.viewed) {
            markLessonViewed(lesson.request_id);
        }
    }, [isAdmin, lesson, markLessonViewed]);

    const adminPanel = isAdmin ? (
        <>
            <UserDetailsDialog
                username={lesson?.username}
                open={showUserDialog}
                onClose={(): void => setShowUserDialog(false)}
            />
            <EditLessonDialog
                open={showEditDialog}
                onClose={(): void => setShowEditDialog(false)}
                lesson={lesson as FullLessonDetails}
            />
        </>
    ) : null;

    if (!lesson && loading) {
        return (
            <Box {...boxProps}>
                <Box
                    sx={{
                        width: '100%',
                        paddingTop: '56.25%',
                        position: 'relative',
                        mb: 4,
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            height: '100%',
                        }}
                    />
                </Box>
                <>
                    <Skeleton
                        variant="text"
                        sx={{
                            transform: 'none',
                            height: 64,
                            fontSize: 64,
                            mb: 2,
                            width: '50%',
                        }}
                    />
                    <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                    <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                    <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                    <Skeleton variant="text" sx={{ width: '100%', height: 32 }} />
                </>
            </Box>
        );
    } else if (!lesson) {
        return (
            <Box {...boxProps}>
                <EmptyState
                    icon={<Update fontSize={'inherit'} />}
                    title={'No Lesson Selected'}
                    description={`Select a lesson from the list to view details.`}
                />
            </Box>
        );
    }

    const submissionStack = (
        <>
            {lesson.type !== 'in-person' && (
                <Stack spacing={2} sx={{ mt: 8 }}>
                    <Typography variant={'h6'} sx={{ lineHeight: 1.2 }}>
                        Your Submission
                    </Typography>
                    {lesson.fo_swing !== '' && lesson.dtl_swing !== '' && (
                        <Stack direction={'row'} spacing={2}>
                            <Box sx={{ flex: '1 1 0px', background: 'black' }}>
                                <Box
                                    component={'video'}
                                    width="100%"
                                    controls
                                    sx={{ outline: 'none' }}
                                    src={`${BASE_URL}/video_links/${lesson.request_url}/${lesson.fo_swing}`}
                                >
                                    Your browser does not support the video tag.
                                </Box>
                            </Box>
                            <Box sx={{ flex: '1 1 0px', background: 'black' }}>
                                <Box
                                    component={'video'}
                                    width="100%"
                                    controls
                                    sx={{ outline: 'none' }}
                                    src={`${BASE_URL}/video_links/${lesson.request_url}/${lesson.dtl_swing}`}
                                >
                                    Your browser does not support the video tag.
                                </Box>
                            </Box>
                        </Stack>
                    )}
                    {lesson.request_notes && (
                        <Stack spacing={2}>
                            {splitDatabaseText(lesson.request_notes).map((par, pInd) => (
                                <Typography key={`par_${pInd}`} sx={{ lineHeight: 1.8 }}>
                                    {par}
                                </Typography>
                            ))}
                        </Stack>
                    )}
                </Stack>
            )}
        </>
    );

    // Lesson is still pending
    if (lesson && !lesson.response_video) {
        return (
            <Box {...boxProps}>
                <EmptyState
                    icon={<Update fontSize={'inherit'} />}
                    title={'Swing Analysis In Progress'}
                    description={`We're working on your lesson now. Check back soon!`}
                    actions={
                        isAdmin ? (
                            <Stack
                                sx={{ flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'center', gap: 2 }}
                            >
                                <Button
                                    style={{ flex: '1 1 0px', maxWidth: 200 }}
                                    variant={'outlined'}
                                    color={'secondary'}
                                    onClick={(): void => {
                                        setShowUserDialog(true);
                                    }}
                                    startIcon={<Person />}
                                >
                                    View Profile
                                </Button>
                                <Button
                                    style={{ flex: '1 1 0px', maxWidth: 200 }}
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={(): void => {
                                        setShowEditDialog(true);
                                    }}
                                    startIcon={<AddCircle />}
                                >
                                    Add Response
                                </Button>
                            </Stack>
                        ) : undefined
                    }
                />
                {adminPanel}
                {submissionStack}
            </Box>
        );
    }
    return (
        <>
            <Box {...boxProps}>
                {/* Response Video */}
                <Box
                    sx={{
                        width: '100%',
                        paddingTop: '56.25%',
                        position: 'relative',
                        mb: 4,
                    }}
                >
                    <Box
                        component={YouTube}
                        videoId={lesson.response_video}
                        onReady={() => {
                            setVideoLoading(false);
                        }}
                        sx={{
                            position: 'absolute',
                            inset: 0,
                            width: '100%',
                            height: '100%',
                        }}
                        opts={{
                            height: '100%',
                            width: '100%',
                            playerVars: {
                                showinfo: 0,
                                origin: 'www.swingessentials.com',
                                playsinline: 1,
                                rel: 0,
                            },
                        }}
                    />
                    {videoLoading && (
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                height: '100%',
                            }}
                        />
                    )}
                    {/* Navigation buttons */}
                    {showNavigation && (
                        <>
                            <IconButton
                                disabled={!hasNext}
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    left: -32,
                                    padding: 0,
                                    fontSize: 32,
                                }}
                                onClick={(): void => {
                                    onNext?.();
                                }}
                            >
                                <ChevronLeft fontSize={'inherit'} />
                            </IconButton>
                            <IconButton
                                disabled={!hasPrevious}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    right: -32,
                                    padding: 0,
                                    fontSize: 32,
                                }}
                                onClick={(): void => {
                                    onPrevious?.();
                                }}
                            >
                                <ChevronRight fontSize={'inherit'} />
                            </IconButton>
                        </>
                    )}
                </Box>

                {/* Response Details */}
                <Stack spacing={2}>
                    <Stack
                        sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 0, md: 2 }, alignItems: 'center' }}
                    >
                        <FancyHeadline
                            icon={isAdmin ? <Edit fontSize={'inherit'} /> : undefined}
                            headline={
                                isAdmin ? lesson.username || '' : format(new Date(lesson.request_date), 'MMMM d, yyyy')
                            }
                            subheading={
                                isAdmin
                                    ? format(new Date(lesson.request_date), 'MMMM d, yyyy')
                                    : lesson.type === 'in-person'
                                      ? 'In-Person Lesson'
                                      : 'Remote Lesson'
                            }
                            sx={{ flex: '1 1 0px', cursor: isAdmin ? 'pointer' : 'initial' }}
                            onClick={
                                isAdmin
                                    ? (): void => {
                                          setShowEditDialog(true);
                                      }
                                    : undefined
                            }
                            slotProps={{
                                headline: {
                                    variant: 'h6',
                                },
                                subheading: {
                                    variant: 'caption',
                                },
                            }}
                        />
                        {isAdmin && (
                            <Tooltip title={'View User Details'}>
                                <IconButton
                                    color="inherit"
                                    onClick={(): void => {
                                        setShowUserDialog(true);
                                    }}
                                >
                                    <Person />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Stack>
                    <Stack spacing={2}>
                        {splitDatabaseText(lesson.response_notes).map((par, pInd) => (
                            <Typography key={`par_${pInd}`} sx={{ lineHeight: 1.8 }}>
                                {par}
                            </Typography>
                        ))}
                    </Stack>
                </Stack>
                {submissionStack}
            </Box>
            {adminPanel}
        </>
    );
};

const PlaceholderLessonPanel: React.FC<BoxProps> = (props): JSX.Element => {
    const { ...boxProps } = props;
    const [videoLoading, setVideoLoading] = useState(true);

    const { data: lesson, isLoading } = useGetWelcomeVideoQuery();

    return (
        <>
            <Box {...boxProps}>
                {/* Response Video */}
                <Box
                    sx={{
                        width: '100%',
                        paddingTop: '56.25%',
                        position: 'relative',
                        mb: 4,
                    }}
                >
                    {lesson && (
                        <Box
                            component={YouTube}
                            videoId={lesson.video}
                            onReady={() => {
                                setVideoLoading(false);
                            }}
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                            }}
                            opts={{
                                height: '100%',
                                width: '100%',
                                playerVars: {
                                    showinfo: 0,
                                    origin: 'www.swingessentials.com',
                                    playsinline: 1,
                                    rel: 0,
                                },
                            }}
                        />
                    )}
                    {(isLoading || videoLoading) && (
                        <Skeleton
                            variant="rectangular"
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                height: '100%',
                            }}
                        />
                    )}
                </Box>

                {/* Response Details */}
                <Stack spacing={2}>
                    <Stack
                        sx={{ flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 0, md: 2 }, alignItems: 'center' }}
                    >
                        <FancyHeadline
                            headline={format(new Date(), 'MMMM d, yyyy')}
                            subheading={'Getting started with Swing Essentials'}
                            sx={{ flex: '1 1 0px' }}
                            slotProps={{
                                headline: {
                                    variant: 'h6',
                                },
                                subheading: {
                                    variant: 'caption',
                                },
                            }}
                        />
                    </Stack>
                    {lesson && (
                        <Stack spacing={2}>
                            {splitDatabaseText(lesson.description).map((par, pInd) => (
                                <Typography key={`par_${pInd}`} sx={{ lineHeight: 1.8 }}>
                                    {par}
                                </Typography>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Box>
        </>
    );
};

export const LessonsPage: React.FC = (): JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const admin = useSelector((state: RootState) => state.auth.admin);
    const isSmall = useMediaQuery((t) => t.breakpoints.down('md'));
    const [page, setPage] = useState(1);
    const [userFilter, setUserFilter] = useState('');
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [showNewDialog, setShowNewDialog] = useState(false);
    // const [showWelcome, setShowWelcome] = false;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // useGoogleAnalyticsPageView();

    // Lesson Data
    const {
        data: { data: completedLessons = [], totalPages = 0 } = {},
        isFetching: loadingCompleted,
        isUninitialized,
    } = useGetCompletedLessonsQuery({ page, users: userFilter });
    const { data: { data: nextLessons = [] } = {} } = useGetCompletedLessonsQuery({
        page: page + 1,
        users: userFilter,
    });
    const { data: { data: previousLessons = [] } = {} } = useGetCompletedLessonsQuery({
        page: page - 1,
        users: userFilter,
    });

    const { data: { data: pendingLessons = [] } = {}, isFetching: loadingPending } =
        useGetPendingLessonsQuery(userFilter);

    const selectedLessonId = id || (!loadingCompleted && completedLessons[0]?.request_url) || '';
    const selectedLessonIndex = completedLessons.findIndex((l) => l.request_url === selectedLessonId);

    const { data: { details: selectedLessonDetails, page: selectedPage } = {}, isError } = useGetLessonByIdQuery(
        { id: selectedLessonId, users: userFilter },
        {
            skip: !(id || completedLessons.length > 0),
        }
    );

    useEffect(() => {
        // If we can't find the lesson details, redirect to unselected lessons page
        if (isError) {
            navigate(ROUTES.LESSONS, { replace: true });
        }
    }, [isError, useGetLessonByIdQuery, navigate]);

    useEffect(() => {
        // set the page number when we learn the page from the details response
        setPage(selectedPage ?? 1);
    }, [selectedPage]);

    useEffect(() => {
        // auto select the first lesson if none is selected
        if (!id && completedLessons.length > 0) {
            navigate(`${ROUTES.LESSONS}/${completedLessons[0].request_url}`, { replace: true });
        }
    }, [id, completedLessons]);

    const showWelcomeLesson =
        !isUninitialized &&
        !loadingCompleted &&
        !loadingPending &&
        completedLessons.length === 0 &&
        pendingLessons.length === 0 &&
        selectedLessonId === '';

    return (
        <>
            <Banner background={{ src: bg, position: 'right center' }}>
                <SectionBlurb
                    icon={<Subscriptions fontSize={'inherit'} />}
                    headline={'Your Lessons'}
                    subheading={`See how far you've come`}
                    body={`Here, you can view all of the lessons that you have taken with Swing Essentials. Each lesson includes a detailed video analysis as well as written comments and tips to try the next time you're on the range. Submit your swing for a new lesson today!`}
                    sx={{ color: 'primary.contrastText', zIndex: 100 }}
                />
            </Banner>
            <AdminActionToolbar show={admin}>
                <Button
                    color={'secondary'}
                    startIcon={<AddCircle />}
                    variant={'text'}
                    onClick={(): void => setShowNewDialog(true)}
                >
                    New In-Person Lesson
                </Button>
                <Button
                    color={'secondary'}
                    startIcon={<FilterList />}
                    variant={'text'}
                    onClick={(): void => setShowFilterDialog(true)}
                    sx={{ ml: 2 }}
                >
                    Filter By User
                </Button>
            </AdminActionToolbar>

            <Section
                sx={{
                    alignItems: { xs: 'stretch', md: 'flex-start' },
                    gap: 8,
                }}
            >
                {!isSmall && (
                    <Stack spacing={4} sx={{ flex: '1 1 0px', maxWidth: 512 }}>
                        <LessonsCard
                            lessons={pendingLessons}
                            title={'Pending Lessons'}
                            loading={loadingPending}
                            selectedLesson={selectedLessonId}
                            onLessonSelected={(newId) => {
                                navigate(`${ROUTES.LESSONS}/${newId}`, { replace: true });
                            }}
                            placeholderCount={1}
                            sx={{ flex: ' 0 0 auto' }}
                            slots={{
                                emptyPlaceholder: (
                                    <ListItem dense disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(`${ROUTES.SUBMIT}`);
                                            }}
                                        >
                                            <ListItemText
                                                primary={'No pending lessons'}
                                                secondary={`Submit your swing videos today!`}
                                            />
                                            <ChevronRight sx={{ mr: -1 }} />
                                        </ListItemButton>
                                    </ListItem>
                                ),
                                adminEmptyPlaceholder: (
                                    <ListItem dense>
                                        <ListItemText
                                            primary={'No pending lessons'}
                                            secondary={`You're all caught up!`}
                                        />
                                    </ListItem>
                                ),
                            }}
                        />

                        <LessonsCard
                            lessons={completedLessons}
                            title={'Completed Lessons'}
                            showBadges
                            loading={loadingCompleted}
                            selectedLesson={isError ? undefined : selectedLessonId}
                            onLessonSelected={(newId) => {
                                navigate(`${ROUTES.LESSONS}/${newId}`, { replace: true });
                            }}
                            page={page}
                            totalPages={totalPages}
                            onNextPage={() => setPage((p) => p + 1)}
                            onPreviousPage={() => setPage((p) => p - 1)}
                            slots={{
                                emptyPlaceholder: (
                                    <ListItem dense disablePadding>
                                        <ListItemButton
                                            onClick={
                                                pendingLessons.length < 1
                                                    ? () => {
                                                          navigate(`${ROUTES.SUBMIT}`);
                                                      }
                                                    : undefined
                                            }
                                        >
                                            <ListItemText
                                                primary={'No completed lessons'}
                                                secondary={
                                                    pendingLessons.length < 1
                                                        ? `What are you waiting for?`
                                                        : `We're working on it!`
                                                }
                                            />
                                            {pendingLessons.length < 1 && <ChevronRight sx={{ mr: -1 }} />}
                                        </ListItemButton>
                                    </ListItem>
                                ),
                                adminEmptyPlaceholder: (
                                    <ListItem dense>
                                        <ListItemText
                                            primary={'No completed lessons'}
                                            secondary={`You're all caught up!`}
                                        />
                                    </ListItem>
                                ),
                            }}
                        />
                    </Stack>
                )}
                {/* Show the selected lesson details */}
                {!showWelcomeLesson && (
                    <LessonDetailsPanel
                        lesson={isError ? undefined : selectedLessonDetails}
                        showNavigation={isSmall}
                        hasNext={
                            (selectedLessonIndex >= 0 && selectedLessonIndex < completedLessons.length - 1) ||
                            (selectedLessonIndex === completedLessons.length - 1 && page < totalPages)
                        }
                        hasPrevious={selectedLessonIndex > 0 || (selectedLessonIndex === 0 && page > 1)}
                        onNext={() => {
                            if (selectedLessonIndex >= 0 && selectedLessonIndex < completedLessons.length - 1) {
                                navigate(`${ROUTES.LESSONS}/${completedLessons[selectedLessonIndex + 1].request_url}`);
                            } else if (selectedLessonIndex === completedLessons.length - 1 && page < totalPages) {
                                navigate(`${ROUTES.LESSONS}/${nextLessons[0].request_url}`);
                            }
                        }}
                        onPrevious={() => {
                            if (selectedLessonIndex > 0) {
                                navigate(`${ROUTES.LESSONS}/${completedLessons[selectedLessonIndex - 1].request_url}`);
                            } else if (selectedLessonIndex === 0 && page > 1) {
                                navigate(
                                    `${ROUTES.LESSONS}/${previousLessons[previousLessons.length - 1].request_url}`
                                );
                            }
                        }}
                        sx={{ flex: '2 2 0px', maxWidth: 1080 }}
                    />
                )}
                {showWelcomeLesson && <PlaceholderLessonPanel sx={{ flex: '2 2 0px', maxWidth: 1080 }} />}
            </Section>

            {admin && (
                <>
                    <FilterLessonsDialog
                        open={showFilterDialog}
                        onFilterChange={async (username: string): Promise<void> => {
                            setUserFilter(username);
                            setPage(1);
                            lessonsApi.util.resetApiState();
                            try {
                                const response = await (dispatch as AppDispatch)(
                                    lessonsApi.endpoints.getCompletedLessons.initiate({
                                        page: 1,
                                        users: username,
                                    })
                                ).unwrap();
                                const data = response.data;

                                const firstLesson = data[0];
                                if (firstLesson) {
                                    navigate(`${ROUTES.LESSONS}/${firstLesson.request_url}`, { replace: true });
                                }
                            } catch (error) {
                                console.error('Error filtering lessons:', error);
                            }
                        }}
                        onClose={(): void => setShowFilterDialog(false)}
                    />
                    <NewLessonDialog open={showNewDialog} onClose={(): void => setShowNewDialog(false)} />
                </>
            )}
        </>
    );
};
