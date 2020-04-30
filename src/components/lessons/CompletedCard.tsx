import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Lesson } from '../../__types__';
import { Card, CardHeader, CardProps, useTheme } from '@material-ui/core';
import { InfoListItem, ListItemTag } from '@pxblue/react-components';
import { prettyDate } from '../../utilities/date';
import { PlaceholderLesson } from '../../constants/lessons';
import { ChevronRight } from '@material-ui/icons';
import { markLessonViewed } from '../../redux/actions/lesons-actions';
import { useCompare } from '../../hooks';

type CompletedLessonsCardProps = CardProps & {
    onSelected: (item: Lesson | null, index: number) => void;
    selected: number | null;
    filter?: string;
};
export const CompletedLessonsCard: React.FC<CompletedLessonsCardProps> = (props) => {
    const { onSelected, selected, filter, ...cardProps } = props;
    const theme = useTheme();
    const dispatch = useDispatch();
    const completedLessons = useSelector((state: AppState) => state.lessons.closed);
    const admin = useSelector((state: AppState) => state.auth.admin);
    const filterChanged = useCompare(filter);

    let lessons = completedLessons;
    if (admin && filter) lessons = lessons.filter((lesson) => lesson.username === filter);

    if (filterChanged) {
        onSelected(lessons.length > 0 ? lessons[0] : null, 0);
    }

    return (
        <Card {...cardProps}>
            <CardHeader
                title={'Completed Lessons'}
                titleTypographyProps={{ variant: 'subtitle2' }}
                style={{ background: theme.palette.primary.main, color: 'white' }}
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
                        props.onSelected(lesson, index);
                        if (!admin && selected !== null && lessons[selected] && !lessons[selected].viewed) {
                            dispatch(markLessonViewed(lessons[selected].request_id));
                        }
                    }}
                    statusColor={selected === index ? theme.palette.primary.main : ''}
                    backgroundColor={selected === index ? theme.palette.primary.light : undefined}
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
                    onClick={(): void => props.onSelected(PlaceholderLesson, -1)}
                    statusColor={selected === -1 ? theme.palette.primary.main : ''}
                    backgroundColor={selected === -1 ? theme.palette.primary.light : undefined}
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

// <Card>
//     <CardHeader
//         title={activeYear}
//         titleTypographyProps={{ variant: 'subtitle2' }}
//         action={
//             <>
//                 <ChevronLeft
//                     className={!isLastYear ? classes.chevron : classes.disabled}
//                     onClick={
//                         !isLastYear ? (): void => setActiveYear(activeYear + 1) : undefined
//                     }
//                 />
//                 <ChevronRight
//                     className={!isFirstYear ? classes.chevron : classes.disabled}
//                     style={{ marginLeft: 8 }}
//                     onClick={
//                         !isFirstYear ? (): void => setActiveYear(activeYear - 1) : undefined
//                     }
//                 />
//             </>
//         }
//         classes={{ action: classes.actionPanel }}
//         style={{ background: theme.palette.primary.main, color: 'white' }}
//     />
//     {lessonsList.map((lesson, index) => {
//         if (!lesson.request_date.startsWith(activeYear.toString())) {
//             return null;
//         }
//         return (
//             <InfoListItem
//                 key={`lesson_${lesson.request_id}`}
//                 dense
//                 // chevron
//                 hidePadding
//                 wrapTitle
//                 divider={'full'}
//                 title={admin ? lesson.username : prettyDate(lesson.request_date)}
//                 subtitle={admin ? prettyDate(lesson.request_date) : lesson.type === 'in-person' ? 'In-Person Lesson' : 'Remote Lesson'}
//                 onClick={(): void => {
//                     setActiveLesson(lesson);
//                     setActiveIndex(index);
//                 }}
//                 statusColor={
//                     activeLesson && lesson.request_id === activeLesson.request_id ? theme.palette.primary.main : ''
//                 }
//                 backgroundColor={
//                     activeLesson && lesson.request_id === activeLesson.request_id
//                         ? theme.palette.primary.light
//                         : undefined
//                 }
//                 fontColor={admin && !lesson.viewed ? 'red' : 'inherit'}
//                 rightComponent={
//                     <>
//                         {admin && !lesson.response_video && <ListItemTag label={'PENDING'} />}
//                         {!admin && !lesson.viewed && <ListItemTag label={'NEW'} />}
//                         <ChevronRight />
//                     </>
//                 }
//             />
//         );
//     })}
// </Card>