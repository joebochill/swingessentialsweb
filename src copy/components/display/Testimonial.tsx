import React from "react";
import {
  Typography,
  Avatar,
  Theme,
  SxProps,
  BoxProps,
  Box,
} from "@mui/material";
import { Headline, SubHeading } from "../text/Typography";

const styles: { [key: string]: SxProps<Theme> } = {
  root: {
    border: `1px solid primary.main`,
    borderRadius: 4,
    borderBottomLeftRadius: 0,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    maxWidth: 512,
  },
  avatar: {
    height: 80,
    width: 80,
    // backgroundColor: (props: TestimonialProps): string =>
    // props.src ? 'transparent' : theme.palette.background.paper,
    color: "text.primary",
    fontSize: 32,
    position: "absolute",
    top: -40,
    left: "50%",
    transform: "translateX(-50%)",
    // border: (props): string =>
    //     `${theme.spacing(0.5)}px solid ${props.src ? 'rgba(255,255,255,0.25)' : theme.palette.primary.main}`,
  },
  quoteWrapper: {
    background: "primary.light",
    p: 4,
    pb: 6,
    display: "flex",
    flex: "1 1 auto",
  },
  punctuation: {
    fontSize: "5em",
    lineHeight: 1,
    mr: 2,
    display: "inline-block",
    marginTop: -10,
    float: "left",
  },
  right: { ml: 2, mr: 0, float: "right" },
  attributionWrapper: {
    p: 4,
    pt: 6,
    background: "primary.main",
    color: "white",
    position: "relative",
  },
};

type TestimonialProps = BoxProps & {
  initials: string;
  src?: string;
  name: string;
  testimonial: string;
  location: string;
  joined: string;
};
export const Testimonial: React.FC<TestimonialProps> = (props) => {
  const { initials, src, name, testimonial, location, joined, ...boxProps } =
    props;

  return (
    <Box sx={styles.root} {...boxProps}>
      <Box sx={styles.quoteWrapper}>
        <Typography style={{ width: "100%" }}>
          <Typography component={"span"} variant={"h5"} sx={styles.punctuation}>
            “
          </Typography>
          <Typography
            component={"span"}
            variant={"h5"}
            sx={[styles.punctuation, styles.right] as SxProps<Theme>}
          >
            ”
          </Typography>
          {testimonial}
        </Typography>
      </Box>
      <Box sx={styles.attributionWrapper}>
        <Avatar src={src} sx={styles.avatar}>
          {initials}
        </Avatar>
        <Headline noWrap>{name}</Headline>
        <SubHeading noWrap display={"block"}>
          {location}
        </SubHeading>
        <Typography
          noWrap
          variant={"caption"}
        >{`Member since ${joined}`}</Typography>
      </Box>
    </Box>
  );
};
