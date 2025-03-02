import React, { useState } from "react";
import {
  TextFieldProps,
  TextField,
  SelectProps,
  Select,
  FilledInput,
  InputAdornment,
  IconButton,
  SxProps,
  Theme,
  Tooltip,
} from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const styles = {
  input: {
    background: "rgba(var(--inputBackgroundColor),0.6)",
    "&:hover": {
      background: "rgba(var(--inputBackgroundColor),0.8)",
    },
    "&:focus-visible": {
      background: "rgba(var(--inputBackgroundColor),1)",
    },
  },
  focused: {
    background: "rgba(var(--inputBackgroundColor),1)",
    "&:hover": {
      background: "rgba(var(--inputBackgroundColor),1)",
    },
    "&:focus-visible": {
      background: "rgba(var(--inputBackgroundColor),1)",
    },
  },
};

type StyledTextFieldProps = TextFieldProps;
export const StyledTextField: React.FC<StyledTextFieldProps> = (props) => {
  const { sx, slotProps = {}, variant = "filled", ...other } = props;

  return (
    <TextField
      fullWidth
      variant={variant}
      slotProps={{
        input: {
          ...slotProps.input,
          sx: (theme) => ({
            textAlign: "left",
            "--inputBackgroundColor": "255,255,255",
            ...styles.input,
            "&.Mui-focused": styles.focused,
            ...theme.applyStyles("dark", {
              "--inputBackgroundColor": "0,0,0",
            }),
          }),
        },
      }}
      {...other}
    />
  );
};

// TODO We don't need this anymore because of select=true on textfield
// type StyledSelectProps = SelectProps & {
//   last?: boolean;
// };
// export const StyledSelect: React.FC<StyledSelectProps> = (props) => {
//   const { last, sx, ...other } = props;

//   return (
//     <Select
//       fullWidth
//       variant={"filled"}
//       input={
//         <StyledTextField
//           // slotProps={{
//           //   input: {
//           //     sx: {
//           //       ...(props.value ? styles.focused : styles.input),
//           //       // @ts-ignore
//           //       "&.Mui-focused": styles.focused,
//           //     },
//           //   },
//           // }}
//         />
//       }
//       {...other}
//     />
//   );
// };

export const StyledPassword: React.FC<StyledTextFieldProps> = (props) => {
  const { type, ...textFieldProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <StyledTextField
      type={type ? type : showPassword ? "text" : "password"}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title={showPassword ? "Hide Password" : "Show Password"}>
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
