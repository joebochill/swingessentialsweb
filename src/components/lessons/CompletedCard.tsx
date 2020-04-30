import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Lesson } from '../../__types__';
import { Card, CardHeader, CardProps, useTheme, makeStyles, createStyles, Typography } from '@material-ui/core';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';
import { prettyDate } from '../../utilities/date';
import { PlaceholderLesson } from '../../constants/lessons';
import { ChevronRight, ChevronLeft } from '@material-ui/icons';
import { markLessonViewed } from '../../redux/actions/lesons-actions';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const useStyles = makeStyles(() =>
    createStyles({
        actionPanel: {
            alignSelf: 'center',
            marginTop: 0,
            display: 'flex',
            alignItems: 'center',
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

type CompletedLessonsCardProps = CardProps & {
    filter?: string;
    hidden?: boolean;
    lessons: Lesson[];
};
export const CompletedLessonsCard: React.FC<CompletedLessonsCardProps> = (props) => {
    const { filter, hidden, lessons: _lessons, ...cardProps } = props;

    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    const admin = useSelector((state: AppState) => state.auth.admin);
    const [page, setPage] = useState(3);

    const selected = useSelector((state: AppState) => state.lessons.selected);
    const lessonsPerPage = 10;

    // Paginate the final lessons list
    let lessons = _lessons;
    if (lessons.length > lessonsPerPage) {
        lessons = _lessons.slice(page * lessonsPerPage, (page + 1) * lessonsPerPage);
    }

    // Determine page navigation capabilities
    const numPages = Math.ceil(_lessons.length / lessonsPerPage);
    const canGoForward = page < numPages - 1;
    const canGoBack = page > 0;

    useEffect(() => {
        setPage(0);
        dispatch({ type: 'SET_SELECTED_LESSON', payload: lessons.length > 0 ? lessons[0] : PlaceholderLesson });
    }, [filter, setPage]);

    if (hidden) return null;
    return (
        <Card {...cardProps}>
            <CardHeader
                title={'Completed Lessons'}
                titleTypographyProps={{ variant: 'subtitle2' }}
                classes={{ action: classes.actionPanel }}
                style={{ background: theme.palette.primary.main, color: 'white' }}
                action={
                    numPages > 1 ? (
                        <>
                            <ChevronLeft
                                className={canGoBack ? classes.chevron : classes.disabled}
                                onClick={
                                    canGoBack
                                        ? (): void => {
                                              setPage(page - 1);
                                              dispatch({
                                                  type: 'SET_SELECTED_LESSON',
                                                  payload: _lessons[(page - 1) * lessonsPerPage],
                                              });
                                          }
                                        : undefined
                                }
                            />
                            <Typography variant={'caption'}>{`${page + 1} of ${numPages}`}</Typography>
                            <ChevronRight
                                className={canGoForward ? classes.chevron : classes.disabled}
                                onClick={
                                    canGoForward
                                        ? (): void => {
                                              setPage(page + 1);
                                              dispatch({
                                                  type: 'SET_SELECTED_LESSON',
                                                  payload: _lessons[(page + 1) * lessonsPerPage],
                                              });
                                          }
                                        : undefined
                                }
                            />
                        </>
                    ) : undefined
                }
            />
            {lessons.map((lesson, index) => (
                <InfoListItem
                    key={`lesson_${lesson.request_id}`}
                    dense
                    chevron
                    hidePadding
                    wrapTitle
                    divider={index < lessons.length - 1 ? 'full' : undefined}
                    title={admin ? lesson.username : prettyDate(lesson.request_date)}
                    subtitle={
                        admin
                            ? prettyDate(lesson.request_date)
                            : lesson.type === 'in-person'
                            ? 'In-Person Lesson'
                            : 'Remote Lesson'
                    }
                    onClick={(): void => {
                        history.replace(`${ROUTES.LESSONS}/${lesson.request_url}`);
                        dispatch({ type: 'SET_SELECTED_LESSON', payload: lesson });
                        if (!admin && selected !== null && !selected.viewed) {
                            dispatch(markLessonViewed(selected.request_id));
                        }
                    }}
                    statusColor={
                        selected && selected.request_id === lesson.request_id ? theme.palette.primary.main : ''
                    }
                    backgroundColor={
                        selected && selected.request_id === lesson.request_id ? theme.palette.primary.light : undefined
                    }
                    fontColor={admin && !lesson.viewed ? '#ca3c3d' : 'inherit'}
                    rightComponent={
                        <>
                            {!admin && !lesson.viewed && <ListItemTag label={'NEW'} />}
                            <ChevronRight />
                        </>
                    }
                />
            ))}
            {admin && lessons.length === 0 && (
                <InfoListItem
                    dense
                    hidePadding
                    wrapTitle
                    title={'No Lessons Yet'}
                    subtitle={`Tell them to send their swing!`}
                />
            )}
            {!admin && lessons.length === 0 && (
                <InfoListItem
                    dense
                    chevron
                    hidePadding
                    wrapTitle
                    title={'Welcome to Swing Essentials'}
                    subtitle={'Introduction'}
                    onClick={(): void => {
                        history.replace(`${ROUTES.LESSONS}/${PlaceholderLesson.request_url}`);
                        dispatch({ type: 'SET_SELECTED_LESSON', payload: PlaceholderLesson });
                    }}
                    statusColor={selected && selected.request_id === -1 ? theme.palette.primary.main : ''}
                    backgroundColor={selected && selected.request_id === -1 ? theme.palette.primary.light : undefined}
                    rightComponent={
                        <>
                            <ListItemTag label={'NEW'} />
                            <ChevronRight />
                        </>
                    }
                />
            )}
        </Card>
    );
};
