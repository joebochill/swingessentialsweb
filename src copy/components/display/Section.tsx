import React, { JSX } from "react";
import { Theme, SxProps, BoxProps, Box } from "@mui/material";

type TextAlign = "left" | "right" | "center";

const styles: { [key: string]: SxProps<Theme> } = {
  section: {
    background: "background.paper",
    p: 8,
    display: "flex",
    // textAlign: (props): TextAlign => props.textAlign || "left",
    // alignItems: (props): string => props.align || "center",
    // justifyContent: (props): string => props.justify || "center",
    "&:nth-of-type(even)": {
      background: "background.default",
    },
    xs: {
      py: 8,
      px: "10%",
      justifyContent: "stretch",
      flexDirection: "column",
      //   textAlign: (props): TextAlign => props.textAlign || "center",
    },
  },
};
type SectionProps = BoxProps & {
  background?: {
    color?: string;
    src?: string;
  };
  justify?: "flex-start" | "center" | "stretch";
  align?: "flex-start" | "center" | "stretch";
  textAlign?: TextAlign;
  dark?: boolean;
  light?: boolean;
};
export const Section: React.FC<SectionProps> = (props): JSX.Element => {
  const { background = {}, sx, textAlign, ...other } = props;

  return (
    <Box
      sx={[
        styles.section,
        { backgroundColor: background.color, textAlign: textAlign },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {props.children}
    </Box>
  );
};
