import React, { JSX, MouseEvent } from "react";
import {
  useTheme,
  makeStyles,
  Theme,
  createStyles,
  Typography,
  SxProps,
  Box,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import * as Colors from "@brightlayer-ui/colors";

const getTopPaddingForAspectRatio = (
  ratio: AspectRatio | undefined
): string => {
  switch (ratio) {
    case "1x1":
      return "100%";
    case "2x1":
      return "50%";
    case "3x2":
      return "66.67%";
    case "4x3":
      return "75%";
    case "16x9":
    default:
      return "56.25%";
  }
};
type AspectRatio = "16x9" | "4x3" | "3x2" | "2x1" | "1x1";
type InfoCardProps = {
  source: string;
  onClick?: (event: MouseEvent) => void;
  aspectRatio?: AspectRatio;
  backgroundPosition?: string;
  title: string;
  description: string;
  spacing: number;
};

const styles: { [key: string]: SxProps<Theme> } = {
  image: {
    width: "100%",
    position: "relative",
    backgroundSize: "cover",
    mb: 2,
    border: `1px solid ${Colors.black[50]}`,
    fontSize: 48,
  },
  card: {
    "&:hover": {
      backgroundColor: Colors.black[50],
    },
  },
  chevron: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    color: "white",
    opacity: 0.7,
  },
};

export const InfoCard: React.FC<InfoCardProps> = (props): JSX.Element => {
  const { aspectRatio = "2x1" } = props;
  return (
    <Box
      sx={
        {
          cursor: props.onClick ? "pointer" : "default",
          m: (-1 * props.spacing) / 2,
          p: props.spacing / 2,
          ...(props.onClick ? styles.card : {}),
        } as SxProps<Theme>
      }
      onClick={props.onClick}
    >
      <Box
        sx={{
          backgroundImage: `url(${props.source})`,
          pt: getTopPaddingForAspectRatio(aspectRatio),
          backgroundPosition: props.backgroundPosition,
          ...styles.image,
        }}
      >
        <ChevronRight sx={styles.chevron} fontSize={"inherit"} />
      </Box>
      <Typography variant={"h5"} sx={{ fontWeight: 600 }} noWrap>
        {props.title}
      </Typography>
      <Typography variant={"h6"} sx={{ fontWeight: 400, mt: 1 }}>
        {props.description}
      </Typography>
    </Box>
  );
};
InfoCard.displayName = "InfoCard";
