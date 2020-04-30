import React, { useState, useEffect } from 'react';
import bg from '../assets/images/banners/lessons.jpg';
import {
    makeStyles,
    createStyles,
    Toolbar,
    AppBar,
    Button,
    Typography,
    IconButton,
    useMediaQuery,
    CircularProgress,
    DialogProps,
    Dialog,
    Select,
    MenuItem,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    FormControl,
    InputLabel,
    capitalize,
} from '@material-ui/core';
import { SectionBlurb } from '../components/text/SectionBlurb';
import { AddCircle, Edit, ChevronRight, ChevronLeft, Subscriptions, FilterList, Warning } from '@material-ui/icons';
import YouTube from 'react-youtube';

import { Spacer, EmptyState } from '@pxblue/react-components';
import { prettyDate } from '../utilities/date';
import { splitParagraphText } from '../utilities/text';
import { FancyHeadline } from '../components/text/FancyHeadline';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Lesson } from '../__types__';
import { Banner } from '../components/display/Banner';
import { Section } from '../components/display/Section';
import { PendingLessonsCard } from '../components/lessons/PendingCard';
import { CompletedLessonsCard } from '../components/lessons/CompletedCard';
import { PlaceholderLesson } from '../constants/lessons';
import { getUsers } from '../redux/actions/user-data-actions';
import { sortUsers } from '../utilities/user';

const useStyles = makeStyles(() =>
    createStyles({
        cardContainer: {
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

export const LessonsPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const lessons = useSelector((state: AppState) => state.lessons);
    const admin = useSelector((state: AppState) => state.auth.admin);

    const [activeLesson, setActiveLesson] = useState<Lesson | null>(PlaceholderLesson);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [activePanel, setActivePanel] = useState<'pending' | 'completed'>('completed');
    const [showFilterDialog, setShowFilterDialog] = useState(false);
    const [filter, setFilter] = useState('');

    const isSmall = useMediaQuery('(max-width:959px)');

    useEffect(() => {
        if (activeLesson && activeLesson.request_id === -1) {
            setActiveLesson(lessons.closed.length > 0 ? lessons.closed[0] : PlaceholderLesson);
            setActiveIndex(lessons.closed.length > 0 ? 0 : -1);
        }
    }, [lessons, activeLesson, setActiveLesson, setActiveIndex]);

    const description = activeLesson ? splitParagraphText(activeLesson.response_notes) : [];
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
            {admin && (
                <AppBar position={'static'} color={'default'}>
                    <Toolbar style={{ justifyContent: 'center' }}>
                        <Button variant={'text'}>
                            <AddCircle style={{ marginRight: 4 }} />
                            New In-Person Lesson
                        </Button>
                        <Button variant={'text'} onClick={(): void => setShowFilterDialog(true)}>
                            <FilterList style={{ marginRight: 4 }} />
                            Filter By User
                        </Button>
                    </Toolbar>
                </AppBar>
            )}
            {lessons.pending.length < 1 && lessons.closed.length < 1 && lessons.loading && (
                <Section>
                    <CircularProgress />
                </Section>
            )}
            <Section align={'flex-start'}>
                {!isSmall && (
                    <div className={classes.cardContainer}>
                        <PendingLessonsCard
                            style={{ marginBottom: 32 }}
                            onSelected={(item, index): void => {
                                setActivePanel('pending');
                                setActiveIndex(index);
                                setActiveLesson(item);
                            }}
                            selected={activePanel === 'pending' ? activeIndex : null}
                        />
                        <CompletedLessonsCard
                            onSelected={(item, index): void => {
                                setActivePanel('completed');
                                setActiveIndex(index);
                                setActiveLesson(item);
                            }}
                            selected={activePanel === 'completed' ? activeIndex : null}
                            filter={filter}
                        />
                    </div>
                )}
                <UserFilterDialog
                    open={showFilterDialog}
                    onFilterChange={(username): void => {
                        setFilter(username);
                    }}
                    onClose={(): void => setShowFilterDialog(false)}
                />
                <Spacer flex={0} width={100} />
                {activeLesson && (
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
                                videoId={activeLesson.response_video}
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
                                        disabled={
                                            (activePanel === 'pending' && activeIndex < 1) ||
                                            (activePanel === 'completed' &&
                                                activeIndex < 1 &&
                                                lessons.pending.length < 1)
                                        }
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            left: -32,
                                            padding: 0,
                                            fontSize: 32,
                                        }}
                                        onClick={(): void => {
                                            if (activeIndex < 1) {
                                                if (activePanel === 'completed' && lessons.pending.length > 0) {
                                                    setActivePanel('pending');
                                                    setActiveIndex(lessons.pending.length - 1);
                                                    setActiveLesson(lessons.pending[lessons.pending.length - 1]);
                                                }
                                            } else {
                                                setActiveIndex(activeIndex - 1);
                                                setActiveLesson(
                                                    activePanel === 'pending'
                                                        ? lessons.pending[activeIndex - 1]
                                                        : lessons.closed[activeIndex - 1]
                                                );
                                            }
                                        }}
                                    >
                                        <ChevronLeft fontSize={'inherit'} />
                                    </IconButton>
                                    <IconButton
                                        disabled={
                                            activePanel === 'completed' && activeIndex >= lessons.closed.length - 1
                                        }
                                        style={{
                                            position: 'absolute',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            right: -32,
                                            padding: 0,
                                            fontSize: 32,
                                        }}
                                        onClick={(): void => {
                                            if (
                                                activePanel === 'pending' &&
                                                activeIndex >= lessons.pending.length - 1
                                            ) {
                                                setActivePanel('completed');
                                                setActiveIndex(lessons.closed.length > 0 ? 0 : -1);
                                                setActiveLesson(
                                                    lessons.closed.length > 0 ? lessons.closed[0] : PlaceholderLesson
                                                );
                                            } else {
                                                setActiveIndex(activeIndex + 1);
                                                setActiveLesson(
                                                    activePanel === 'pending'
                                                        ? lessons.pending[activeIndex + 1]
                                                        : lessons.closed[activeIndex + 1]
                                                );
                                            }
                                        }}
                                    >
                                        <ChevronRight fontSize={'inherit'} />
                                    </IconButton>
                                </>
                            )}
                        </div>
                        <FancyHeadline
                            icon={admin ? <Edit fontSize={'inherit'} /> : undefined}
                            headline={prettyDate(activeLesson.request_date)}
                            subheading={activeLesson.type === 'in-person' ? 'In-Person Lesson' : 'Remote Lesson'}
                            style={admin ? { cursor: 'pointer' } : {}}
                            onClick={
                                admin
                                    ? (): void => {
                                          /* do nothing */
                                      }
                                    : undefined
                            }
                        />
                        {description.map((par, pInd) => (
                            <Typography key={`par_${pInd}`} paragraph style={{ lineHeight: 1.8 }}>
                                {par}
                            </Typography>
                        ))}
                        <Typography variant={'h6'} style={{ marginBottom: 16, marginTop: 32, lineHeight: 1.2 }}>
                            Your Submission
                        </Typography>
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
                        {splitParagraphText(activeLesson.request_notes).map((par, pInd) => (
                            <Typography key={`par_${pInd}`} paragraph style={{ lineHeight: 1.8 }}>
                                {par}
                            </Typography>
                        ))}
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

type UserFilterDialogProps = DialogProps & {
    onFilterChange: (username: string) => void;
};
const UserFilterDialog: React.FC<UserFilterDialogProps> = (props) => {
    const { onFilterChange, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;
    const users = useSelector((state: AppState) => state.users.list);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<string>('-');

    useEffect(() => {
        dispatch(getUsers());
    }, [props.open, dispatch]);

    const usersByName = [...users].sort(sortUsers('last'));
    const usersByUsername = [...users].sort(sortUsers('username'));

    return (
        <Dialog {...dialogProps}>
            <DialogTitle>Filter Lessons</DialogTitle>
            <DialogContent>
                <DialogContentText>Select the user you want to filter by:</DialogContentText>
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="username-label">{`Username`}</InputLabel>
                    <Select
                        labelId="username-label"
                        value={selected}
                        onChange={(e): void => setSelected(e.target.value as string)}
                    >
                        <MenuItem value="-">All Users</MenuItem>
                        {usersByUsername.map((user) => (
                            <MenuItem key={user.username} value={user.username}>{`${user.username}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth style={{ marginTop: 16 }}>
                    <InputLabel id="fullname-label">{`Human Name`}</InputLabel>
                    <Select
                        labelId="fullname-label"
                        value={selected}
                        onChange={(e): void => setSelected(e.target.value as string)}
                    >
                        <MenuItem value="-">All Users</MenuItem>
                        {usersByName.map((user) => (
                            <MenuItem key={user.username} value={user.username}>{`${capitalize(
                                user.last
                            )}, ${capitalize(user.first)}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant={'outlined'} onClick={(e): void => onClose(e, 'backdropClick')}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={(e): void => {
                        onFilterChange(selected === '-' ? '' : selected);
                        onClose(e, 'backdropClick');
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
};
