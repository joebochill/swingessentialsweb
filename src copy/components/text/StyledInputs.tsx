import React, { useState } from "react";
import {
  TextFieldProps,
  TextField,
  SelectProps,
  Select,
  FilledInput,
  InputAdornment,
  IconButton,
  useTheme,
  SxProps,
  Theme,
} from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const styles: { [key: string]: SxProps<Theme> } = {
  input: {
    background: "rgba(255,255,255,0.6)",
    "&:hover": {
      background: "rgba(255,255,255,0.8)",
    },
    "&$focused": {
      background: "rgba(255,255,255,1)",
    },
  },
  focused: {
    background: "rgba(255,255,255,1)",
    "&:hover": {
      background: "rgba(255,255,255,1)",
    },
    "&$focused": {
      background: "rgba(255,255,255,1)",
    },
  },
  selectRoot: {
    background: "rgba(255,255,255,0.6)",
    "&:hover": {
      background: "rgba(255,255,255,0.8)",
    },
    "&$focused": {
      background: "rgba(255,255,255,1)",
    },
  },
};

type StyledTextFieldProps = TextFieldProps & {
  last?: boolean;
  onDark?: boolean;
};
export const StyledTextField: React.FC<StyledTextFieldProps> = (props) => {
  const {
    last,
    sx,
    slotProps = {},
    onDark = true,
    variant = "filled",
    ...other
  } = props;

  return (
    <TextField
      fullWidth
      variant={variant}
      // @ts-ignore
      slotProps={
        onDark
          ? {
              ...slotProps,
              input: {
                ...slotProps.input,
                sx: {
                  ...(props.value ? styles.focused : styles.input),
                  "&.Mui-focused": styles.focused,
                },
              },
            }
          : slotProps
      }
      sx={[{ mb: last ? 0 : 2 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    />
  );
};

type StyledSelectProps = SelectProps & {
  last?: boolean;
};
export const StyledSelect: React.FC<StyledSelectProps> = (props) => {
  const { last, sx, ...other } = props;

  return (
    <Select
      fullWidth
      variant={"filled"}
      input={
        <FilledInput
          slotProps={{
            input: {
              sx: {
                ...(props.value ? styles.focused : styles.input),
                // @ts-ignore
                "&.Mui-focused": styles.focused,
              },
            },
          }}
        />
      }
      sx={[
        { textAlign: "left", mb: last ? 0 : 2 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
};

export const StyledPassword: React.FC<StyledTextFieldProps> = (props) => {
  const { type, slotProps, ...textFieldProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledTextField
      type={type ? type : showPassword ? "text" : "password"}
      slotProps={{
        input: {
          ...slotProps?.input,
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
      }}
      {...textFieldProps}
    />
  );
};

type StyledDatePickerProps<TDate extends Date> = DatePickerProps<TDate> & {
  last?: boolean;
  onDark?: boolean;
};
export const StyledDatePicker: React.FC<StyledDatePickerProps<any>> = (
  props
) => {
  const { last, sx, slotProps, onDark = true, ...other } = props;

  return (
    <DatePicker
      //     slotProps={{
      //         input: onDark ?  {

      //         } : slotProps.input
      //     }}
      //   InputProps={Object.assign(
      //     onDark
      //       ? {
      //           classes: {
      //             root: props.value ? classes.focused : classes.input,
      //             focused: classes.focused,
      //           },
      //         }
      //       : {},
      //     InputProps
      //   )}
      sx={[{ mb: last ? 0 : 2 }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...other}
    />
  );
};
// StyledDatePicker.defaultProps = {
//   inputVariant: "filled",
//   onDark: true,
// };
