import React, { useState, useMemo } from 'react';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    capitalize,
    DialogActions,
    Button,
    Autocomplete,
    Stack,
    AutocompleteProps,
} from '@mui/material';
import debounce from 'lodash.debounce';
import { BasicUserDetailsApiResponse, useSearchUsersMutation } from '../../../redux/apiServices/userDetailsService';
import { StyledTextField } from '../../common/StyledInputs';

// TODO Move to a separate file
export const UserSelector: React.FC<
    Partial<AutocompleteProps<Omit<BasicUserDetailsApiResponse, 'avatar'>, false, false, false>>
> = (props) => {
    const { inputValue, onInputChange, ...other } = props;
    const [searchUsers, { data: searchResults = [] }] = useSearchUsersMutation();

    // Debounced search function
    const debouncedSearch = useMemo(
        () =>
            debounce((query) => {
                searchUsers(query);
            }, 300),
        [searchUsers]
    );
    return (
        <Autocomplete
            options={searchResults}
            noOptionsText={inputValue ? 'No matching users found' : 'Start typing to search'}
            getOptionLabel={(option) =>
                `${option.username} ${option.first || option.last ? `(${capitalize(option.first)} ${capitalize(option.last)})` : ''}`
            }
            isOptionEqualToValue={(option, value) => option.username === value.username}
            inputValue={inputValue}
            onInputChange={(e, newValue, reason): void => {
                onInputChange?.(e, newValue, reason);
                debouncedSearch(newValue);
            }}
            renderInput={(params) => <StyledTextField {...params} label="Search" />}
            {...other}
        />
    );
};

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
