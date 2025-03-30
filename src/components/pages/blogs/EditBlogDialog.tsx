import React, { useState, useEffect, useCallback } from 'react';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    TextField,
    Stack,
} from '@mui/material';
import { format, isValid, parseISO } from 'date-fns';
import { DATE_REGEX } from '../../../constants';
import {
    BlogDetails,
    useAddBlogMutation,
    useUpdateBlogMutation,
    useRemoveBlogMutation,
} from '../../../redux/apiServices/blogsService';
import { convertDatabaseTextToMultiline, convertMultilineToDatabaseText } from '../../../utilities/text';
import { ConfirmationDialog } from '../../common/ConfirmationDialog';

type EditBlogDialogProps = DialogProps & {
    blog: BlogDetails;
    isNew?: boolean;
};
export const EditBlogDialog: React.FC<EditBlogDialogProps> = (props) => {
    const { isNew, blog, ...dialogProps } = props;
    const { onClose = (): void => {} } = dialogProps;

    const [addBlog] = useAddBlogMutation();
    const [updateBlog] = useUpdateBlogMutation();
    const [removeBlog] = useRemoveBlogMutation();

    const [date, setDate] = useState(blog.date);
    const [title, setTitle] = useState(blog.title);
    const [body, setBody] = useState(convertDatabaseTextToMultiline(blog.body));

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const resetBlog = useCallback(() => {
        const parsedDate = parseISO(blog.date);
        setDate(isValid(parsedDate) ? format(new Date(blog.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'));
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
                onClose={(e, r) => {
                    onClose(e, r);
                    resetBlog();
                }}
            >
                <DialogTitle>{`${isNew ? 'New' : 'Edit'} 19th Hole Post`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Enter the blog post information below:`}</DialogContentText>
                    <Stack spacing={2}>
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
                            slotProps={{
                                htmlInput: { maxLength: 65000, style: { minHeight: 128 } },
                            }}
                            helperText={`${65000 - body.length} characters left`}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Stack direction={'row'} spacing={2}>
                        {!isNew && (
                            <Button
                                color={'error'}
                                variant={'contained'}
                                onClick={(): void => {
                                    setShowConfirmationDialog(true);
                                }}
                            >
                                Delete
                            </Button>
                        )}

                        <Button
                            color="inherit"
                            variant={'outlined'}
                            onClick={(e): void => {
                                onClose(e, 'backdropClick');
                                resetBlog();
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                    <Button
                        color="primary"
                        variant={'contained'}
                        disabled={!title || !date || !body || !DATE_REGEX.test(date)}
                        onClick={(e): void => {
                            if (isNew) {
                                addBlog({
                                    title: title,
                                    date: date,
                                    body: convertMultilineToDatabaseText(body),
                                });
                            } else {
                                updateBlog({
                                    id: blog.id,
                                    title: title,
                                    date: date,
                                    body: convertMultilineToDatabaseText(body),
                                });
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
                        removeBlog(blog);
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
