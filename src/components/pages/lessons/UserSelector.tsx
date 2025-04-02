import React, { useMemo } from 'react';
import { capitalize, Autocomplete, AutocompleteProps } from '@mui/material';
import debounce from 'lodash.debounce';
import { BasicUserDetailsApiResponse, useSearchUsersMutation } from '../../../redux/apiServices/userDetailsService';
import { StyledTextField } from '../../common/StyledInputs';

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
