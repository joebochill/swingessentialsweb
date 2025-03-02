import React from "react";
import { Box, BoxProps } from "@mui/material";
import iphone from "../../assets/images/screenshot/iphone16-pro-frame.svg";

type ScreenShotProps = BoxProps & {
  src: string;
  alt: string;
};
export const ScreenShot: React.FC<ScreenShotProps> = (props) => {
  const { src, alt, sx, ...other } = props;
  return (
    <Box
      sx={[
        {
          position: "relative",
          width: 240,
          height: 511.03,
          overflow: "hidden",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        component={"img"}
        src={src}
        alt={alt}
        sx={{
          position: "absolute",
          left: 9,
          top: 8,
          width: 222,
          zIndex: 99,
          borderRadius: (t) => t.spacing(4),
        }}
      />
      <Box
        component={"img"}
        src={iphone}
        alt={"Iphone device frame"}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 100,
        }}
        width={240}
      />
    </Box>
  );
};
