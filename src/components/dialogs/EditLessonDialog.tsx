import React, { useState, useEffect, useCallback } from 'react';
import { convertDatabaseTextToMultiline, convertMultilineToDatabaseText } from '../../utilities/text';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    MenuItem,
    DialogActions,
    Button,
    InputAdornment,
    Stack,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { useVideoValid } from '../../hooks';
import { getYoutubeVideoErrorMessage } from '../../utilities/video';
import {
    FullLessonDetails,
    useAddLessonResponseMutation,
    useUpdateLessonResponseMutation,
} from '../../redux/apiServices/lessonsService';
import { YoutubeVideoStatus } from '../../__types__';
import { StyledTextField } from '../text/StyledInputs';

type EditLessonDialogProps = DialogProps & {
    lesson: FullLessonDetails;
};
export const EditLessonDialog: React.FC<EditLessonDialogProps> = (props) => {
    const { lesson, ...dialogProps } = props;
    const { onClose = (): void => {} } = dialogProps;

    const [updateLesson] = useUpdateLessonResponseMutation();
    const [addLessonResponse] = useAddLessonResponseMutation();

    const [video, setVideo] = useState(lesson.response_video);
    const [videoStatus, setVideoStatus] = useState<YoutubeVideoStatus>('invalid');
    const videoValid = videoStatus === 'valid';

    useVideoValid(video, setVideoStatus);

    const [comments, setComments] = useState(convertDatabaseTextToMultiline(lesson.response_notes));
    const [status, setStatus] = useState(lesson.response_status || 'good');

    const resetLesson = useCallback(() => {
        setVideo(lesson.response_video);
        setComments(convertDatabaseTextToMultiline(lesson.response_notes));
        setStatus(lesson.response_status || 'good');
    }, [lesson]);

    useEffect(() => {
        resetLesson();
    }, [lesson, resetLesson]);

    if (!lesson) return null;

    return (
        <Dialog
            {...dialogProps}
            onClose={(e, reason): void => {
                onClose(e, reason);
                resetLesson();
            }}
        >
            <DialogTitle>Edit Lesson</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Enter the lesson information for ${
                    lesson.username || '<ERROR>'
                } below:`}</DialogContentText>
                <Stack spacing={2}>
                    <StyledTextField
                        fullWidth
                        label={'Response Video ID'}
                        placeholder={'Youtube ID'}
                        name={'video'}
                        value={video || ''}
                        error={!videoValid || (!!video && video.length !== 11 && video.length > 0)}
                        helperText={getYoutubeVideoErrorMessage(video, videoStatus)}
                        slotProps={{
                            htmlInput: { maxLength: 11 },
                            input: {
                                endAdornment: videoValid ? (
                                    <InputAdornment position="end">
                                        <CheckCircle sx={{ color: 'success.main' }} />
                                    </InputAdornment>
                                ) : undefined,
                            },
                        }}
                        onChange={(e): void => {
                            setVideo(e.target.value);
                        }}
                    />
                    <StyledTextField
                        fullWidth
                        multiline
                        label={'Response Notes'}
                        placeholder={'Add any comments here...'}
                        name={'comments'}
                        value={comments}
                        onChange={(e): void => {
                            setComments(e.target.value);
                        }}
                        slotProps={{
                            htmlInput: { maxLength: 500, style: { minHeight: 64 } },
                            formHelperText: { sx: { color: 'text.primary' } },
                        }}
                        helperText={`${500 - comments.length} characters left`}
                    />
                    <StyledTextField
                        fullWidth
                        select
                        label="Response Status"
                        value={status}
                        onChange={(e): void => setStatus(e.target.value as 'good' | 'rejected')}
                    >
                        <MenuItem value="good">Accepted</MenuItem>
                        <MenuItem value="bad">Rejected</MenuItem>
                    </StyledTextField>
                </Stack>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between', gap: 2 }}>
                <Button
                    color="secondary"
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
                    disabled={!video || !comments || !status || !videoValid}
                    onClick={(e): void => {
                        if (!lesson.response_video) {
                            addLessonResponse({
                                lesson_id: lesson.request_id,
                                response_video: video,
                                response_notes: convertMultilineToDatabaseText(comments),
                                response_status: status ?? '',
                            });
                        } else {
                            updateLesson({
                                lesson_id: lesson.request_id,
                                response_video: video,
                                response_notes: convertMultilineToDatabaseText(comments),
                                response_status: status ?? '',
                            });
                        }
                        onClose(e, 'escapeKeyDown');
                    }}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};
