import React, { useState } from 'react';
import {
    makeStyles,
    createStyles,
    TextFieldProps,
    TextField,
    SelectProps,
    Select,
    FilledInput,
    InputAdornment,
    IconButton,
    useTheme,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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
    onDark?: boolean;
};
export const StyledTextField: React.FC<StyledTextFieldProps> = (props) => {
    const { last, style, InputProps, onDark, ...other } = props;

    const classes = useStyles();
    const theme = useTheme();

    return (
        <TextField
            fullWidth
            InputProps={Object.assign(
                onDark
                    ? {
                          classes: {
                              root: props.value ? classes.focused : classes.input,
                              focused: classes.focused,
                          },
                      }
                    : {},
                InputProps
            )}
            style={Object.assign({ marginBottom: last ? 0 : theme.spacing(2) }, style)}
            {...other}
        />
    );
};
StyledTextField.defaultProps = {
    variant: 'filled',
    onDark: true,
};

type StyledSelectProps = SelectProps & {
    last?: boolean;
};
export const StyledSelect: React.FC<StyledSelectProps> = (props) => {
    const { last, style, ...other } = props;

    const classes = useStyles();
    const theme = useTheme();

    return (
        <Select
            fullWidth
            variant={'filled'}
            input={
                <FilledInput
                    classes={{ root: props.value ? classes.focused : classes.input, focused: classes.focused }}
                />
            }
            style={Object.assign({ textAlign: 'left', marginBottom: last ? 0 : theme.spacing(2) }, style)}
            {...other}
        />
    );
};

export const StyledPassword: React.FC<StyledTextFieldProps> = (props) => {
    const { type, InputProps, ...textFieldProps } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <StyledTextField
            type={type ? type : showPassword ? 'text' : 'password'}
            InputProps={Object.assign(
                {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={(): void => setShowPassword(!showPassword)}
                                onMouseDown={(e): void => e.preventDefault()}
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
                InputProps
            )}
            {...textFieldProps}
        />
    );
};
