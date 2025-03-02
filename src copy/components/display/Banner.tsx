import React, { JSX, PropsWithChildren } from "react";
import { Box, SxProps, Theme } from "@mui/material";

const styles: { [key: string]: SxProps<Theme> } = {
  bannerWrapper: {
    minHeight: 540,
    width: "100%",
    position: "relative",
    backgroundColor: "primary.main",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  maintainRatio: {
    xs: {
      minHeight: "initial",
      pt: "56.25%",
    },
  },
  maintainRation2: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  coloredBackdrop: {
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    position: "absolute",
    backgroundColor: "primary.main",
  },
  imageBackdrop: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    opacity: 0.5,
  },
  contentWrapper: {
    zIndex: 100,
    height: "100%",
    width: "100%",
    p: 8,
    xs: {
      py: 1,
      px: "10%",
      textAlign: "center",
    },
  },
  content: {
    position: "relative",
    height: "100%",
    width: "100%",
    display: "flex",
    // alignItems: (props): string => props.align || "center",
    // justifyContent: (props): string => props.justify || "flex-start",
  },
};
type BannerProps = {
  background: {
    src: string;
    color?: string;
    opacity?: number;
    position?: string;
    size?: string;
    maintainAspectRatio?: boolean;
  };
  align?: "flex-start" | "center" | "stretch";
  justify?: "flex-start" | "center" | "stretch";
  noPadding?: boolean;
};
export const Banner: React.FC<PropsWithChildren<BannerProps>> = (
  props
): JSX.Element => {
  const { background } = props;

  return (
    <Box
      sx={{
        ...styles.bannerWrapper, 
        ...(background.maintainAspectRatio ? styles.maintainRatio : {}),
        ...{ backgroundColor: background.color }
      } as SxProps<Theme>}
    >
      <Box
        sx={{
          ...styles.imageBackdrop,
          backgroundImage: `url(${background.src})`,
          backgroundSize: background.size,
          backgroundPosition: background.position,
          opacity: background.opacity,
        }}
      />
      <Box
        sx={{
          ...styles.contentWrapper, 
          ...(props.noPadding ? { p: 0 } : {}),
          ...(background.maintainAspectRatio ? styles.maintainRation2 : {}),
        } as SxProps<Theme>}
      >
        <Box
          sx={{
            ...styles.content, 
            ...background.maintainAspectRatio ? styles.content : {}
          } as SxProps<Theme>}
        >
          {props.children}
        </Box>
      </Box>
    </Box>
  );
};
