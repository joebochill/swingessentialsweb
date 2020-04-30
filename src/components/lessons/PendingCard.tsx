import React from 'react';
import { useSelector } from 'react-redux';
import { AppState, Lesson } from '../../__types__';
import { Card, CardHeader, CardProps, useTheme } from '@material-ui/core';
import { InfoListItem } from '@pxblue/react-components';
import { prettyDate } from '../../utilities/date';
import { Videocam } from '@material-ui/icons';
import { ROUTES } from '../../constants/routes';
import { useHistory } from 'react-router-dom';

type PendingLessonsCardProps = CardProps & {
    onSelected: (item: Lesson, index: number) => void;
    selected: number | null;
};
export const PendingLessonsCard: React.FC<PendingLessonsCardProps> = (props) => {
    const { onSelected, selected, ...cardProps } = props;
    const theme = useTheme();
    const history = useHistory();
    const lessons = useSelector((state: AppState) => state.lessons.pending);
    const admin = useSelector((state: AppState) => state.auth.admin);
    const role = useSelector((state: AppState) => state.auth.role);

    if (role === 'anonymous') return null;

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
                    onClick={(): void => onSelected(lesson, index)}
                    statusColor={selected === index ? theme.palette.primary.main : ''}
                    backgroundColor={selected === index ? theme.palette.primary.light : undefined}
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
