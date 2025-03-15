import React, { useState, useCallback, useEffect } from 'react';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    InputAdornment,
    Stack,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { format } from 'date-fns';
import { useVideoValid } from '../../../hooks';
import { YoutubeVideoStatus } from '../../../__types__';
import { DATE_REGEX } from '../../../constants';
import { useAddInPersonLessonMutation } from '../../../redux/apiServices/lessonsService';
import { BasicUserDetailsApiResponse } from '../../../redux/apiServices/userDetailsService';
import { convertMultilineToDatabaseText } from '../../../utilities/text';
import { getYoutubeVideoErrorMessage } from '../../../utilities/video';
import { StyledTextField } from '../../common/StyledInputs';
import { UserSelector } from './FilterLessonsDialog';

type NewLessonDialogProps = DialogProps;
export const NewLessonDialog: React.FC<NewLessonDialogProps> = (props) => {
    const { ...dialogProps } = props;
    const { onClose = (): void => {} } = dialogProps;

    const [selectedUser, setSelectedUser] = useState<Omit<BasicUserDetailsApiResponse, 'avatar'> | null>(null);

    const [addInPersonLesson] = useAddInPersonLessonMutation();

    const [user, setUser] = useState('');
    const [date, setDate] = useState('');
    const [video, setVideo] = useState('');
    const [videoStatus, setVideoStatus] = useState<YoutubeVideoStatus>('invalid');
    const videoValid = videoStatus === 'valid';
    const [comments, setComments] = useState('');

    useVideoValid(video, setVideoStatus);

    const resetLesson = useCallback(() => {
        setUser('');
        setSelectedUser(null);
        setDate(format(new Date(), 'yyyy-MM-dd'));
        setVideo('');
        setVideoStatus('invalid');
        setComments('');
    }, []);

    useEffect(() => {
        resetLesson();
    }, [resetLesson]);

    return (
        <Dialog
            {...dialogProps}
            onClose={(e, reason): void => {
                onClose(e, reason);
                resetLesson();
            }}
        >
            <DialogTitle>New In-Person Lesson</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Enter the new lesson information below:`}</DialogContentText>
                <Stack spacing={2}>
                    <UserSelector
                        // @ts-expect-error label does exist on Autocomplete component
                        label={'Hello'}
                        inputValue={user}
                        onInputChange={(e, newValue): void => {
                            setUser(newValue);
                        }}
                        value={selectedUser}
                        onChange={(e, newValue): void => setSelectedUser(newValue)}
                    />
                    {/* TODO Switch for a data picker */}
                    <StyledTextField
                        fullWidth
                        label={'Date'}
                        placeholder={'YYYY-MM-DD'}
                        name={'date'}
                        error={!DATE_REGEX.test(date)}
                        value={date}
                        onChange={(e): void => {
                            setDate(e.target.value);
                        }}
                    />
                    <StyledTextField
                        fullWidth
                        label={'Response Video ID'}
                        placeholder={'Youtube ID'}
                        name={'video'}
                        error={!videoValid || (!!video && video.length !== 11 && video.length > 0)}
                        helperText={getYoutubeVideoErrorMessage(video, videoStatus)}
                        value={video}
                        onChange={(e): void => {
                            setVideo(e.target.value);
                        }}
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
                </Stack>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-between' }}>
                <Button
                    color="inherit"
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
                    disabled={
                        !selectedUser?.username || !date || !video || !videoValid || !comments || !DATE_REGEX.test(date)
                    }
                    onClick={(e): void => {
                        addInPersonLesson({
                            username: selectedUser?.username ?? '',
                            request_date: date,
                            response_video: video,
                            response_notes: convertMultilineToDatabaseText(comments),
                            response_status: 'good',
                        });
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
