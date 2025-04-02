import React, { useState } from 'react';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Stack,
} from '@mui/material';
import { BasicUserDetailsApiResponse } from '../../../redux/apiServices/userDetailsService';
import { UserSelector } from './UserSelector';

type FilterLessonsDialogProps = DialogProps & {
    onFilterChange: (username: string) => void;
};
export const FilterLessonsDialog: React.FC<FilterLessonsDialogProps> = (props) => {
    const { onFilterChange, ...dialogProps } = props;
    const { onClose = (): void => {} } = dialogProps;

    const [selectedUser, setSelectedUser] = useState<Omit<BasicUserDetailsApiResponse, 'avatar'> | null>(null);

    return (
        <Dialog {...dialogProps}>
            <DialogTitle>Filter Lessons By User</DialogTitle>
            <DialogContent>
                <DialogContentText>Search for a user:</DialogContentText>
                <UserSelector value={selectedUser} onChange={(e, newValue): void => setSelectedUser(newValue)} />
            </DialogContent>
            <DialogActions>
                <Stack direction={'row'} spacing={2}>
                    <Button
                        color={'inherit'}
                        variant={'outlined'}
                        onClick={(e): void => {
                            setSelectedUser(null);
                            onFilterChange('');
                            onClose(e, 'backdropClick');
                        }}
                    >
                        Clear Filter
                    </Button>

                    <Button color="inherit" variant={'outlined'} onClick={(e): void => onClose(e, 'backdropClick')}>
                        Cancel
                    </Button>
                </Stack>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={(e): void => {
                        onFilterChange(selectedUser?.username ?? '');
                        onClose(e, 'backdropClick');
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
};
