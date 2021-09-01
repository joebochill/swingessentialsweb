/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { AppState } from '../../__types__';
// import { convertMultilineToDatabaseText } from '../../utilities/text';
// import { sortUsers } from '../../utilities/user';
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
    // useTheme,
} from '@material-ui/core';
import { Spacer } from '@pxblue/react-components';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            '&:not(:last-child)': {
                marginBottom: theme.spacing(2),
            },
        },
    })
);

type NewEmailBlastDialogProps = DialogProps;
export const NewEmailBlastDialog: React.FC<NewEmailBlastDialogProps> = (props) => {
    const { ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    // const theme = useTheme();
    // const dispatch = useDispatch();
    const classes = useStyles();

    // const users = useSelector((state: AppState) => state.users.list);
    // const usersByName = [...users].sort(sortUsers('last'));

    // Form fields
    const [subject, setSubject] = useState('');
    const [headline, setHeadline] = useState('');
    const [body, setBody] = useState('');

    const resetEmail = useCallback(() => {
        setSubject('');
        setHeadline('');
        setBody('');
    }, []);

    return (
        <Dialog
            {...dialogProps}
            onBackdropClick={(e): void => {
                if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                resetEmail();
            }}
        >
            <DialogTitle>New Email Blast</DialogTitle>
            <DialogContent>
                <DialogContentText>{`Enter the marketing email details below:`}</DialogContentText>

                <TextField
                    fullWidth
                    variant={'filled'}
                    label={'Email Subject'}
                    placeholder={'Check this out!'}
                    name={'subject'}
                    value={subject}
                    onChange={(e): void => {
                        setSubject(e.target.value);
                    }}
                    className={classes.field}
                />
                <TextField
                    fullWidth
                    variant={'filled'}
                    label={'Body Headline'}
                    placeholder={'Add the title to show in the message body here...'}
                    name={'headline'}
                    value={headline}
                    onChange={(e): void => {
                        setHeadline(e.target.value);
                    }}
                    className={classes.field}
                />
                <TextField
                    fullWidth
                    multiline
                    variant={'filled'}
                    label={'Body Content'}
                    placeholder={'Add the content here...'}
                    name={'body'}
                    value={body}
                    onChange={(e): void => {
                        setBody(e.target.value);
                    }}
                    inputProps={{ maxLength: 65000, style: { minHeight: 128 } }}
                    helperText={`${65000 - body.length} characters left`}
                    className={classes.field}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    color="primary"
                    variant={'outlined'}
                    disabled={!subject || !headline || !body}
                    onClick={(e): void => {
                        // dispatch(
                        //     putLessonResponse({
                        //         lesson_id: -1,
                        //         username: user,
                        //         date: date,
                        //         response_video: video,
                        //         response_notes: convertMultilineToDatabaseText(comments),
                        //         response_status: 'good',
                        //     })
                        // );
                        onClose(e, 'escapeKeyDown');
                        resetEmail();
                    }}
                >
                    Test
                </Button>
                <Spacer />
                <Button
                    color="primary"
                    variant={'outlined'}
                    onClick={(e): void => {
                        onClose(e, 'backdropClick');
                        resetEmail();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant={'contained'}
                    disabled={!subject || !headline || !body}
                    onClick={(e): void => {
                        // dispatch(
                        //     putLessonResponse({
                        //         lesson_id: -1,
                        //         username: user,
                        //         date: date,
                        //         response_video: video,
                        //         response_notes: convertMultilineToDatabaseText(comments),
                        //         response_status: 'good',
                        //     })
                        // );
                        onClose(e, 'escapeKeyDown');
                        resetEmail();
                    }}
                >
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
};
