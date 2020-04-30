import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, Lesson } from '../../__types__';
import { Card, CardHeader, CardProps, useTheme } from '@material-ui/core';
import { InfoListItem } from '@pxblue/react-components';
import { prettyDate } from '../../utilities/date';
import { Videocam } from '@material-ui/icons';
import { ROUTES } from '../../constants/routes';
import { useHistory } from 'react-router-dom';

type PendingLessonsCardProps = CardProps & {
    hidden?: boolean;
    lessons: Lesson[];
};
export const PendingLessonsCard: React.FC<PendingLessonsCardProps> = (props) => {
    const { hidden, lessons, ...cardProps } = props;

    const theme = useTheme();
    const history = useHistory();
    const dispatch = useDispatch();
    const selected = useSelector((state: AppState) => state.lessons.selected);

    const admin = useSelector((state: AppState) => state.auth.admin);
    const role = useSelector((state: AppState) => state.auth.role);

    if (role === 'anonymous') return null;

    if (hidden) return null;

    return (
        <Card {...cardProps}>
            <CardHeader
                title={'Pending Lessons'}
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
                        dispatch({ type: 'SET_SELECTED_LESSON', payload: lesson });
                    }}
                    statusColor={
                        selected && selected.request_id === lesson.request_id ? theme.palette.primary.main : ''
                    }
                    backgroundColor={
                        selected && selected.request_id === lesson.request_id ? theme.palette.primary.light : undefined
                    }
                />
            ))}
            {admin && lessons.length === 0 && (
                <InfoListItem
                    dense
                    hidePadding
                    wrapTitle
                    title={'No pending lessons'}
                    subtitle={`You're all caught up`}
                />
            )}
            {!admin && lessons.length === 0 && (
                <InfoListItem
                    dense
                    hidePadding
                    wrapTitle
                    chevron
                    icon={<Videocam />}
                    title={'No pending lessons'}
                    subtitle={`Submit your swing videos today!`}
                    onClick={(): void => {
                        history.push(ROUTES.SUBMIT);
                    }}
                />
            )}
        </Card>
    );
};
