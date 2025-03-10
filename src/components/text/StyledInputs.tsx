import React, { useState } from 'react';
import { TextFieldProps, TextField, InputAdornment, IconButton, Theme, Tooltip } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const styles = {
    input: {
        background: 'rgba(var(--inputBackgroundColor),0.6)',
        '&:hover': {
            background: 'rgba(var(--inputBackgroundColor),0.8)',
        },
        '&:focus-visible': {
            background: 'rgba(var(--inputBackgroundColor),1)',
        },
        '&.Mui-disabled': {
            pointerEvents: 'none',
            background: 'rgba(var(--inputBackgroundColor),0.3)',
        },
    },
    focused: {
        background: 'rgba(var(--inputBackgroundColor),1)',
        '&:hover': {
            background: 'rgba(var(--inputBackgroundColor),1)',
        },
        '&:focus-visible': {
            background: 'rgba(var(--inputBackgroundColor),1)',
        },
    },
};

type StyledTextFieldProps = TextFieldProps & { darkStyle?: boolean };
export const StyledTextField: React.FC<StyledTextFieldProps> = (props) => {
    const { slotProps = {}, InputProps, darkStyle = true, variant = 'filled', color = 'secondary', ...other } = props;

    const { input: inputSlotProps, ...otherSlotProps } = slotProps;

    return (
        <TextField
            fullWidth
            variant={variant}
            color={color}
            slotProps={{
                input: {
                    ...inputSlotProps,
                    ...InputProps,
                    sx: darkStyle
                        ? (theme: Theme) => ({
                              // ...(InputProps?.sx ?? {}),
                              textAlign: 'left',
                              '--inputBackgroundColor': '255,255,255',
                              ...styles.input,
                              '&.Mui-focused': styles.focused,
                              ...(theme.applyStyles &&
                                  theme.applyStyles('dark', {
                                      '--inputBackgroundColor': '0,0,0',
                                  })),
                          })
                        : {},
                },
                ...otherSlotProps,
            }}
            {...other}
        />
    );
};

export const StyledPassword: React.FC<StyledTextFieldProps> = (props) => {
    const { type, ...textFieldProps } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <StyledTextField
            type={type ? type : showPassword ? 'text' : 'password'}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <Tooltip placement="right" title={showPassword ? 'Hide Password' : 'Show Password'}>
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={(): void => setShowPassword(!showPassword)}
                                    onMouseDown={(e): void => e.preventDefault()}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    ),
                },
            }}
            {...textFieldProps}
        />
    );
};

type StyledDatePickerProps<TDate extends Date> = DatePickerProps<TDate>;
export const StyledDatePicker: React.FC<StyledDatePickerProps<Date>> = (props) => {
    return (
        <DatePicker
            slots={{
                textField: StyledTextField,
            }}
            {...props}
        />
    );
};
