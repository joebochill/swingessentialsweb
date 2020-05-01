/* eslint-disable @typescript-eslint/camelcase */
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
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Pro } from '../../__types__';
import { convertDatabaseTextToMultiline, convertMultilineToDatabaseText } from '../../utilities/text';
import { Spacer } from '@pxblue/react-components';
import { ConfirmationDialog } from './ConfirmationDialog';
import { addPro, updatePro, removePro } from '../../redux/actions/pro-actions';

type EditProDialogProps = DialogProps & {
    pro: Pro;
    isNew?: boolean;
};
export const EditProDialog: React.FC<EditProDialogProps> = (props) => {
    const { isNew, pro, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;

    const [name, setName] = useState(pro.name);
    const [title, setTitle] = useState(pro.title);
    const [bio, setBio] = useState(convertDatabaseTextToMultiline(pro.bio));
    const [image, setImage] = useState(pro.image);

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    const dispatch = useDispatch();

    const resetPro = useCallback(() => {
        setName(pro.name);
        setTitle(pro.title);
        setBio(convertDatabaseTextToMultiline(pro.bio));
        setImage(pro.image);
    }, [pro]);

    useEffect(() => {
        resetPro();
    }, [pro, resetPro]);

    if (!pro) return null;
    return (
        <>
            <Dialog
                {...dialogProps}
                onBackdropClick={(e): void => {
                    if (dialogProps.onBackdropClick) dialogProps.onBackdropClick(e);
                    resetPro();
                }}
            >
                <DialogTitle>{`${isNew ? 'New' : 'Edit'} Pro Bio`}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{`Enter the instructor information below:`}</DialogContentText>
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Name'}
                        placeholder={''}
                        name={'name'}
                        value={name}
                        onChange={(e): void => {
                            setName(e.target.value);
                        }}
                        style={{ marginBottom: 16 }}
                    />
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Title'}
                        placeholder={'e.g., Associate Instructor'}
                        name={'title'}
                        value={title}
                        onChange={(e): void => {
                            setTitle(e.target.value);
                        }}
                        style={{ marginBottom: 16 }}
                    />
                    <TextField
                        fullWidth
                        variant={'filled'}
                        label={'Headshot Filename'}
                        placeholder={'e.g., YourName.png'}
                        name={'image'}
                        value={image}
                        onChange={(e): void => {
                            setImage(e.target.value);
                        }}
                        style={{ marginBottom: 16 }}
                    />
                    <TextField
                        fullWidth
                        multiline
                        variant={'filled'}
                        label={'Bio'}
                        placeholder={'Describe yourself...'}
                        name={'bio'}
                        value={bio}
                        onChange={(e): void => {
                            setBio(e.target.value);
                        }}
                        inputProps={{ maxLength: 65000, style: { minHeight: 64 } }}
                        helperText={`${65000 - bio.length} characters left`}
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
                    <Spacer />
                    <Button
                        color="primary"
                        variant={'outlined'}
                        onClick={(e): void => {
                            onClose(e, 'backdropClick');
                            resetPro();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        variant={'contained'}
                        disabled={!name || !title || !image || !bio}
                        onClick={(e): void => {
                            if (isNew) {
                                dispatch(
                                    addPro({
                                        name: name,
                                        title: title,
                                        image: image,
                                        bio: convertMultilineToDatabaseText(bio),
                                    })
                                );
                            } else {
                                dispatch(
                                    updatePro({
                                        id: pro.id,
                                        name: name,
                                        title: title,
                                        image: image,
                                        bio: convertMultilineToDatabaseText(bio),
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
                    title={'Delete Pro'}
                    message={'Are you sure you want to delete this pro? This action cannot be undone.'}
                    onOkay={(e): void => {
                        setShowConfirmationDialog(false);
                        dispatch(removePro({ id: pro.id }));
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
