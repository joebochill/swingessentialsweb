import React, { HTMLAttributes } from "react";
import { SxProps, Theme, Box } from "@mui/material";
import iphone from "../../assets/images/screenshot/iphone.png";

const styles: { [key: string]: SxProps<Theme> } = {
  wrapper: {
    position: "relative",
    width: 260,
    height: 511.03,
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    left: 21,
    top: 20,
    width: 218,
    zIndex: 99,
  },
  frame: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
};

type ScreenShotProps = HTMLAttributes<HTMLDivElement> & {
  src: string;
  alt: string;
};
export const ScreenShot: React.FC<ScreenShotProps> = (props) => {
  const { src, alt, ...other } = props;
  return (
    <Box sx={styles.wrapper} {...other}>
      <Box component={"img"} src={src} alt={alt} sx={styles.image} />
      <Box
        component={"img"}
        src={iphone}
        alt={"Iphone device frame"}
        sx={styles.frame}
        width={260}
      />
    </Box>
  );
};
