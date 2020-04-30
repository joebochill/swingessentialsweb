import React, { useState, useEffect } from 'react';
import {
    DialogProps,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    capitalize,
    DialogActions,
    Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../__types__';
import { getUsers } from '../../redux/actions/user-data-actions';
import { sortUsers } from '../../utilities/user';

type FilterLessonsDialogProps = DialogProps & {
    onFilterChange: (username: string) => void;
};
export const FilterLessonsDialog: React.FC<FilterLessonsDialogProps> = (props) => {
    const { onFilterChange, ...dialogProps } = props;
    const {
        onClose = (): void => {
            /* do nothing */
        },
    } = dialogProps;
    const users = useSelector((state: AppState) => state.users.list);
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<string>('-');

    useEffect(() => {
        dispatch(getUsers());
    }, [props.open, dispatch]);

    const usersByName = [...users].sort(sortUsers('last'));
    const usersByUsername = [...users].sort(sortUsers('username'));

    return (
        <Dialog {...dialogProps}>
            <DialogTitle>Filter Lessons</DialogTitle>
            <DialogContent>
                <DialogContentText>Select the user you want to filter by:</DialogContentText>
                <FormControl variant="filled" fullWidth>
                    <InputLabel id="username-label">{`Username`}</InputLabel>
                    <Select
                        labelId="username-label"
                        value={selected}
                        onChange={(e): void => setSelected(e.target.value as string)}
                    >
                        <MenuItem value="-">All Users</MenuItem>
                        {usersByUsername.map((user) => (
                            <MenuItem key={user.username} value={user.username}>{`${user.username}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="filled" fullWidth style={{ marginTop: 16 }}>
                    <InputLabel id="fullname-label">{`Human Name`}</InputLabel>
                    <Select
                        labelId="fullname-label"
                        value={selected}
                        onChange={(e): void => setSelected(e.target.value as string)}
                    >
                        <MenuItem value="-">All Users</MenuItem>
                        {usersByName.map((user) => (
                            <MenuItem key={user.username} value={user.username}>{`${capitalize(
                                user.last
                            )}, ${capitalize(user.first)}`}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant={'outlined'} onClick={(e): void => onClose(e, 'backdropClick')}>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant={'contained'}
                    onClick={(e): void => {
                        onFilterChange(selected === '-' ? '' : selected);
                        onClose(e, 'backdropClick');
                    }}
                >
                    Done
                </Button>
            </DialogActions>
        </Dialog>
    );
};
