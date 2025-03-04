import React, { JSX, PropsWithChildren } from "react";
import {
  Box,
  Stack,
  StackProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useDarkMode } from "../../hooks";

type BannerProps = StackProps & {
  overlayColor?: string;
  overlayOpacity?: number;
  lockAspectRatio?: boolean;
  background?: {
    src: string;
    position?: string;
    size?: string;
  };
  noPadding?: boolean;
  contentPosition?: 'static' | 'absolute'
};

export const Banner: React.FC<PropsWithChildren<BannerProps>> = (
  props
): JSX.Element => {
  const { isDarkMode: dark } = useDarkMode();
  const {
    background: { src = "", position = "center center", size = "cover" } = {},
    sx,
    overlayColor = dark ? "primary.dark" : "primary.main",
    overlayOpacity = dark ? 0.35 : 0.5,
    lockAspectRatio,
    noPadding,
    alignItems = "center",
    justifyContent = "flex-start",
    contentPosition = 'absolute',
    ...other
  } = props;

  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));

  return (
    <Stack
      sx={[
        {
          minHeight: 506,
          width: "100%",
          position: "relative",
          backgroundColor: overlayColor,
        },
        lockAspectRatio && mdDown ? { minHeight: "initial", pt: "56.25%" } : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: size,
          backgroundPosition: position,
          backgroundRepeat: "no-repeat",
          opacity: overlayOpacity,
        }}
      />
      <Box
        sx={{
          zIndex: 100,
          position: contentPosition,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          px: noPadding ? 0 : { xs: "10%", md: 8 },
          py: noPadding ? 0 : { xs: 1, md: 8 },
          textAlign: { xs: "center", md: "inherit" },
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={justifyContent}
          alignItems={alignItems}
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          {props.children}
        </Stack>
      </Box>
    </Stack>
  );
};
