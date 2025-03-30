import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

type ConfirmationDialogProps = {
    title: string;
    message: string;
    onOkay: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onCancel: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    negativeButtonLabel?: string;
    positiveButtonLabel?: string;
};
export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = (props) => {
    const {
        title,
        message,
        onOkay,
        onCancel,
        negativeButtonLabel = 'Cancel',
        positiveButtonLabel = 'Continue',
    } = props;
    return (
        <Dialog open={true} maxWidth={'sm'} fullWidth={false}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    color="inherit"
                    variant={'outlined'}
                    onClick={(e): void => {
                        onCancel(e);
                    }}
                >
                    {negativeButtonLabel}
                </Button>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={(e): void => {
                        onOkay(e);
                    }}
                >
                    {positiveButtonLabel}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
