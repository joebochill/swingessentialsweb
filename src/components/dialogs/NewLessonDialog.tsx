/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppState, YoutubeVideoStatus } from '../../__types__';
import { putLessonResponse } from '../../redux/actions/lessons-actions';
import { DATE_REGEX } from '../../constants';
import { convertMultilineToDatabaseText } from '../../utilities/text';
import { getDate } from '../../utilities/date';
import { sortUsers } from '../../utilities/user';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    capitalize,
    DialogActions,
    Button,
    TextField,
    makeStyles,
    Theme,
    createStyles,
    useTheme,
    InputAdornment,
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';
import { useVideoValid } from '../../hooks';
import { getYoutubeVideoErrorMessage } from '../../utilities/video';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            '&:not(:last-child)': {
                marginBottom: theme.spacing(2),
            },
        },
    })
);

type NewLessonDialogProps = DialogProps;
export const NewLessonDialog: React.FC<NewLessonDialogProps> = (props) => {
    const { ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const theme = useTheme();
    const dispatch = useDispatch();
    const classes = useStyles();

    const users = useSelector((state: AppState) => state.users.list);
    const usersByName = [...users].sort(sortUsers('last'));

    // Form fields
    const [user, setUser] = useState('');
    const [date, setDate] = useState('');
    const [video, setVideo] = useState('');
    const [videoStatus, setVideoStatus] = useState<YoutubeVideoStatus>('invalid');
    const videoValid = videoStatus === 'valid';
    // const [videoValid, setVideoValid] = useState(false);
    useVideoValid(video, setVideoStatus);
    const [comments, setComments] = useState('');

    const resetLesson = useCallback(() => {
        setUser('');
        setDate(getDate(Date.now()));
        setVideo('');
        setVideoStatus('invalid');
        setComments('');
    }, []);

    return (
        <Dialog
            {...dialogProps}
            onBackdropClick={(e): void => {
                if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                resetLesson();
            }}
        >
            <DialogTitle>New In-Person Lesson</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Enter the new lesson information below:`}</DialogContentText>
                <FormControl variant="filled" fullWidth className={classes.field}>
                    <InputLabel id="username-label">{`User`}</InputLabel>
                    <Select
                        labelId="username-label"
                        placeholder="Choose a User"
                        value={user}
                        onChange={(e): void => setUser(e.target.value as string)}
                    >
                        {usersByName.map((_user) => (
                            <MenuItem
                                key={_user.username}
                                value={_user.username}
                                style={{ color: _user.role === 'pending' ? theme.palette.error.main : 'inherit' }}
                            >
                                {_user.first && _user.last
                                    ? `${capitalize(_user.last)}, ${capitalize(_user.first)} (${_user.username})`
                                    : _user.username}
                                {_user.role === 'pending' ? ' (unconfirmed)' : ''}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    variant={'filled'}
                    label={'Date'}
                    placeholder={'YYYY-MM-DD'}
                    name={'date'}
                    error={!DATE_REGEX.test(date)}
                    value={date}
                    onChange={(e): void => {
                        setDate(e.target.value);
                    }}
                    className={classes.field}
                />
                <TextField
                    fullWidth
                    variant={'filled'}
                    label={'Response Video ID'}
                    placeholder={'Youtube ID'}
                    name={'video'}
                    error={!videoValid || (!!video && video.length !== 11 && video.length > 0)}
                    helperText={getYoutubeVideoErrorMessage(video, videoStatus)}
                    value={video}
                    inputProps={{ maxLength: 11 }}
                    onChange={(e): void => {
                        setVideo(e.target.value);
                    }}
                    className={classes.field}
                    InputProps={{
                        endAdornment: videoValid ? (
                            <InputAdornment position="end">
                                <CheckCircle style={{ color: Colors.green[500] }} />
                            </InputAdornment>
                        ) : undefined,
                    }}
                />
                <TextField
                    fullWidth
                    multiline
                    variant={'filled'}
                    label={'Response Notes'}
                    placeholder={'Add any comments here...'}
                    name={'comments'}
                    value={comments}
                    onChange={(e): void => {
                        setComments(e.target.value);
                    }}
                    inputProps={{ maxLength: 500, style: { minHeight: 64 } }}
                    helperText={`${500 - comments.length} characters left`}
                    className={classes.field}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant={'outlined'}
                    onClick={(e): void => {
                        onClose(e, 'backdropClick');
                        resetLesson();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant={'contained'}
                    disabled={!user || !date || !video || !videoValid || !comments || !DATE_REGEX.test(date)}
                    onClick={(e): void => {
                        dispatch(
                            putLessonResponse({
                                lesson_id: -1,
                                username: user,
                                date: date,
                                response_video: video,
                                response_notes: convertMultilineToDatabaseText(comments),
                                response_status: 'good',
                            })
                        );
                        onClose(e, 'escapeKeyDown');
                        resetLesson();
                    }}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};
