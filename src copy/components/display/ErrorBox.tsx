import React, { HTMLAttributes } from "react";
import { Theme, Typography } from "@mui/material";
import { Box, SxProps } from "@mui/material";

const styles: { [key: string]: SxProps<Theme> } = {
  errorBox: {
    p: 2,
    background: "error.main",
    color: "error.contrastText",
    textAlign: "center",
    mb: 2,
  },
};
type ErrorBoxProps = HTMLAttributes<HTMLDivElement> & {
  show?: boolean;
  message?: string;
};
export const ErrorBox: React.FC<ErrorBoxProps> = (props) => {
  const { show = true, message, ...other } = props;

  if (!message || message === "" || !show) return null;
  return (
    <Box sx={styles.errorBox} {...other}>
      <Typography>{message}</Typography>
    </Box>
  );
};
