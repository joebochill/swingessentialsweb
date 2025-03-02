/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Blog } from '../../__types__';
import { addBlog, updateBlog, removeBlog } from '../../redux/actions/blog-actions';
import { convertDatabaseTextToMultiline, convertMultilineToDatabaseText } from '../../utilities/text';
import { DATE_REGEX } from '../../../src/constants';
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
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            '&:not(:last-child)': {
                marginBottom: theme.spacing(2),
            },
        },
    })
);

type EditBlogDialogProps = DialogProps & {
    blog: Blog;
    isNew?: boolean;
};
export const EditBlogDialog: React.FC<EditBlogDialogProps> = (props) => {
    const { isNew, blog, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const dispatch = useDispatch();
    const classes = useStyles();

    const [date, setDate] = useState(blog.date);
    const [title, setTitle] = useState(blog.title);
    const [body, setBody] = useState(convertDatabaseTextToMultiline(blog.body));

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const resetBlog = useCallback(() => {
        setDate(blog.date);
        setTitle(blog.title);
        setBody(convertDatabaseTextToMultiline(blog.body));
    }, [blog]);

    useEffect(() => {
        resetBlog();
    }, [blog, resetBlog]);

    if (!blog) return null;
    return (
        <>
            <Dialog
                {...dialogProps}
                onBackdropClick={(e): void => {
                    if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                    resetBlog();
                }}
            >
                <DialogTitle>{`${isNew ? 'New' : 'Edit'} 19th Hole Post`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Enter the blog post information below:`}</DialogContentText>
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
                        multiline
                        variant={'filled'}
                        label={'Post'}
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
                            resetBlog();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant={'contained'}
                        disabled={!title || !date || !body || !DATE_REGEX.test(date)}
                        onClick={(e): void => {
                            if (isNew) {
                                dispatch(
                                    addBlog({
                                        title: title,
                                        date: date,
                                        body: convertMultilineToDatabaseText(body),
                                    })
                                );
                            } else {
                                dispatch(
                                    updateBlog({
                                        id: blog.id,
                                        title: title,
                                        date: date,
                                        body: convertMultilineToDatabaseText(body),
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
                    title={'Delete Blog Post'}
                    message={'Are you sure you want to delete this 19th Hole post? This action cannot be undone.'}
                    onOkay={(e): void => {
                        setShowConfirmationDialog(false);
                        dispatch(removeBlog(blog));
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
