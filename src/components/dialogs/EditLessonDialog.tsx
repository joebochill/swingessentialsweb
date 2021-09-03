/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Lesson } from '../../__types__';
import { putLessonResponse } from '../../redux/actions/lessons-actions';
import { convertDatabaseTextToMultiline, convertMultilineToDatabaseText } from '../../utilities/text';
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
    DialogActions,
    Button,
    TextField,
    makeStyles,
    Theme,
    createStyles,
    InputAdornment,
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            '&:not(:last-child)': {
                marginBottom: theme.spacing(2),
            },
        },
    })
);

type EditLessonDialogProps = DialogProps & {
    lesson: Lesson;
};
export const EditLessonDialog: React.FC<EditLessonDialogProps> = (props) => {
    const { lesson, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();
    const classes = useStyles();

    const [video, setVideo] = useState(lesson.response_video);
    const [videoValid, setVideoValid] = useState(false);
    const [comments, setComments] = useState(convertDatabaseTextToMultiline(lesson.response_notes));
    const [status, setStatus] = useState(lesson.response_status);

    const resetLesson = useCallback(() => {
        setVideo(lesson.response_video);
        setComments(convertDatabaseTextToMultiline(lesson.response_notes));
        setStatus(lesson.response_status);
    }, [lesson]);

    useEffect(() => {
        resetLesson();
    }, [lesson, resetLesson]);

    useEffect((): void => {
        // Check if the video code is valid/reachable
        if (video.length !== 11) return;
        fetch(`https://www.youtube.com/oembed?format=json&url=http://www.youtube.com/watch?v=${video}`, {
            method: 'GET',
        })
            .then((response: Response) => {
                switch (response.status) {
                    case 404:
                    case 400: {
                        setVideoValid(false);
                        break;
                    }
                    default:
                        setVideoValid(true);
                        break;
                }
            })
            .catch((error: Error) => {
                console.error('Unable to determine video validity', error);
            });
    }, [video]);

    if (!lesson) return null;
    return (
        <Dialog
            {...dialogProps}
            onBackdropClick={(e): void => {
                if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                resetLesson();
            }}
        >
            <DialogTitle>Edit Lesson</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Enter the lesson information for ${
                    lesson.username || '<ERROR>'
                } below:`}</DialogContentText>
                <TextField
                    fullWidth
                    variant={'filled'}
                    label={'Response Video ID'}
                    placeholder={'Youtube ID'}
                    name={'video'}
                    value={video}
                    error={!videoValid || (video.length !== 11 && video.length > 0)}
                    helperText={
                        video && video.length !== 11
                            ? 'Video id must be 11 characters'
                            : video && !videoValid
                            ? 'Video id is invalid or private'
                            : undefined
                    }
                    inputProps={{ maxLength: 11 }}
                    InputProps={{
                        endAdornment: videoValid ? (
                            <InputAdornment position="end">
                                <CheckCircle style={{ color: Colors.green[500] }} />
                            </InputAdornment>
                        ) : undefined,
                    }}
                    onChange={(e): void => {
                        setVideo(e.target.value);
                    }}
                    className={classes.field}
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
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="status-label">{`Response Status`}</InputLabel>
                    <Select
                        labelId="status-label"
                        value={status}
                        onChange={(e): void => setStatus(e.target.value as 'good' | 'bad')}
                    >
                        <MenuItem value="good">Accepted</MenuItem>
                        <MenuItem value="bad">Rejected</MenuItem>
                    </Select>
                </FormControl>
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
                    disabled={!video || !comments || !status}
                    onClick={(e): void => {
                        dispatch(
                            putLessonResponse({
                                lesson_id: lesson.request_id,
                                username: lesson.username || '',
                                response_video: video,
                                response_notes: convertMultilineToDatabaseText(comments),
                                response_status: status,
                            })
                        );
                        onClose(e, 'escapeKeyDown');
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
