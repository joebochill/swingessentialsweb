import React from 'react';
import {
    makeStyles,
    createStyles,
    TextFieldProps,
    TextField,
    SelectProps,
    Select,
    FilledInput,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
    createStyles({
        input: {
            background: 'rgba(255,255,255,0.6)',
            '&:hover': {
                background: 'rgba(255,255,255,0.8)',
            },
            '&$focused': {
                background: 'rgba(255,255,255,1)',
            },
        },
        focused: {
            background: 'rgba(255,255,255,1)',
            '&:hover': {
                background: 'rgba(255,255,255,1)',
            },
            '&$focused': {
                background: 'rgba(255,255,255,1)',
            },
        },
        selectRoot: {
            background: 'rgba(255,255,255,0.6)',
            '&:hover': {
                background: 'rgba(255,255,255,0.8)',
            },
            '&$focused': {
                background: 'rgba(255,255,255,1)',
            },
        },
    })
);

type StyledTextFieldProps = TextFieldProps & {
    last?: boolean;
};
export const StyledTextField: React.FC<StyledTextFieldProps> = (props) => {
    const { last, style, InputProps, ...other } = props;
    const classes = useStyles();
    return (
        <TextField
            fullWidth
            InputProps={Object.assign(
                {
                    classes: {
                        root: props.value ? classes.focused : classes.input,
                        focused: classes.focused,
                    },
                },
                InputProps
            )}
            style={Object.assign({ marginBottom: last ? 0 : 16 }, style)}
            {...other}
        />
    );
};
StyledTextField.defaultProps = {
    variant: 'filled',
};

type StyledSelectProps = SelectProps & {
    last?: boolean;
};
export const StyledSelect: React.FC<StyledSelectProps> = (props) => {
    const { last, style, ...other } = props;
    const classes = useStyles();
    return (
        <Select
            fullWidth
            variant={'filled'}
            input={
                <FilledInput
                    classes={{ root: props.value ? classes.focused : classes.input, focused: classes.focused }}
                />
            }
            style={Object.assign({ textAlign: 'left', marginBottom: last ? 0 : 16 }, style)}
            {...other}
        />
    );
};
