/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Tip, YoutubeVideoStatus } from '../../__types__';
import { updateTip, addTip, removeTip } from '../../redux/actions/tip-actions';
import { DATE_REGEX } from '../../../src/constants';
import { convertDatabaseTextToMultiline, convertMultilineToDatabaseText } from '../../utilities/text';
import { Spacer } from '@pxblue/react-components';
import { ConfirmationDialog } from './ConfirmationDialog';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    makeStyles,
    Theme,
    createStyles,
    InputAdornment,
} from '@material-ui/core';
import { useVideoValid } from '../../../src/hooks';
import { CheckCircle } from '@material-ui/icons';
import * as Colors from '@pxblue/colors';
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

type EditTipDialogProps = DialogProps & {
    tip: Tip;
    isNew?: boolean;
};
export const EditTipDialog: React.FC<EditTipDialogProps> = (props) => {
    const { isNew, tip, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();
    const classes = useStyles();

    const [date, setDate] = useState(tip.date);
    const [title, setTitle] = useState(tip.title);
    const [video, setVideo] = useState(tip.video);
    const [videoStatus, setVideoStatus] = useState<YoutubeVideoStatus>('invalid');
    const videoValid = videoStatus === 'valid';
    // const [videoValid, setVideoValid] = useState(false);
    useVideoValid(video, setVideoStatus);
    const [comments, setComments] = useState(convertDatabaseTextToMultiline(tip.comments));

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const resetTip = useCallback(() => {
        setDate(tip.date);
        setTitle(tip.title);
        setVideo(tip.video);
        setComments(convertDatabaseTextToMultiline(tip.comments));
    }, [tip]);

    useEffect(() => {
        resetTip();
    }, [tip, resetTip]);

    if (!tip) return null;
    return (
        <>
            <Dialog
                {...dialogProps}
                onBackdropClick={(e): void => {
                    if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                    resetTip();
                }}
            >
                <DialogTitle>{`${isNew ? 'New' : 'Edit'} Tip`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Enter the tip information below:`}</DialogContentText>
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
                        label={'Title'}
                        placeholder={''}
                        name={'title'}
                        value={title}
                        onChange={(e): void => {
                            setTitle(e.target.value);
                        }}
                        className={classes.field}
                    />
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Video ID'}
                        name={'video'}
                        value={video}
                        placeholder={'Youtube ID'}
                        error={!videoValid || (!!video && video.length !== 11 && video.length > 0)}
                        helperText={getYoutubeVideoErrorMessage(video, videoStatus)}
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
                        label={'Description'}
                        placeholder={'Add a brief description here...'}
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
                    {!isNew && (
                        <Button
                            color={'secondary'}
                            variant={'contained'}
                            onClick={(): void => {
                                setShowConfirmationDialog(true);
                            }}
                        >
                            Delete
                        </Button>
                    )}
                    <Spacer classes={{}} />
                    <Button
                        color="primary"
                        variant={'outlined'}
                        onClick={(e): void => {
                            onClose(e, 'backdropClick');
                            resetTip();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant={'contained'}
                        disabled={!title || !date || !video || !comments || !DATE_REGEX.test(date)}
                        onClick={(e): void => {
                            if (isNew) {
                                dispatch(
                                    addTip({
                                        title: title,
                                        date: date,
                                        video: video,
                                        comments: convertMultilineToDatabaseText(comments),
                                    })
                                );
                            } else {
                                dispatch(
                                    updateTip({
                                        id: tip.id,
                                        title: title,
                                        date: date,
                                        video: video,
                                        comments: convertMultilineToDatabaseText(comments),
                                    })
                                );
                            }
                            onClose(e, 'escapeKeyDown');
                        }}
                    >
                        {`${isNew ? 'Add' : 'Save'}`}
                    </Button>
                </DialogActions>
            </Dialog>
            {showConfirmationDialog && (
                <ConfirmationDialog
                    title={'Delete Tip of the Month'}
                    message={'Are you sure you want to delete this Tip of the Month? This action cannot be undone.'}
                    onOkay={(e): void => {
                        setShowConfirmationDialog(false);
                        dispatch(removeTip(tip));
                        onClose(e, 'escapeKeyDown');
                    }}
                    onCancel={(): void => {
                        setShowConfirmationDialog(false);
                    }}
                />
            )}
        </>
    );
};
