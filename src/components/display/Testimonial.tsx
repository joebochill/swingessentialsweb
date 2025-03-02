import React from "react";
import {
  Typography,
  Avatar,
  Theme,
  SxProps,
  BoxProps,
  Box,
} from "@mui/material";
import { Headline, SubHeading } from "../text/_Typography";

type TestimonialProps = BoxProps & {
  initials: string;
  src?: string;
  name: string;
  testimonial: string;
  location: string;
  joined: string;
};
export const Testimonial: React.FC<TestimonialProps> = (props) => {
  const {
    initials,
    sx,
    src,
    name,
    testimonial,
    location,
    joined,
    ...boxProps
  } = props;

  const quoteStyle: SxProps = {
    fontSize: "5em",
    lineHeight: 1,
    display: "inline-block",
    marginTop: -2,
  };

  return (
    <Box
      sx={[
        {
          borderWidth: (t) => t.spacing(0.25),
          borderStyle: "solid",
          borderColor: "primary.main",
          borderRadius: (t) => t.spacing(4),
          borderBottomLeftRadius: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          maxWidth: 512,
        },
        (theme) =>
          theme.applyStyles("dark", {
            borderWidth: theme.spacing(0.5),
          }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...boxProps}
    >
      <Box
        sx={[
          {
            backgroundColor: "primary.light",
            p: 4,
            pb: 6,
            display: "flex",
            flex: "1 1 auto",
          },
          (theme) =>
            theme.applyStyles("dark", {
              backgroundColor: "background.paper",
            }),
        ]}
      >
        <Typography style={{ width: "100%" }}>
          <Typography
            component={"span"}
            variant={"h5"}
            sx={[
              quoteStyle,
              {
                mr: 2,
                ml: 0,
                float: "left",
              },
            ]}
          >
            “
          </Typography>
          <Typography
            component={"span"}
            variant={"h5"}
            sx={
              [
                quoteStyle,
                {
                  ml: 2,
                  mr: 0,
                  float: "right",
                },
              ] as SxProps<Theme>
            }
          >
            ”
          </Typography>
          {testimonial}
        </Typography>
      </Box>
      <Box
        sx={{
          p: 4,
          pt: 6,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          position: "relative",
        }}
      >
        <Avatar
          src={src}
          sx={{
            height: 80,
            width: 80,
            backgroundColor: src ? "transparent" : "background.paper",
            color: "text.primary",
            fontSize: 32,
            position: "absolute",
            top: -40,
            left: "50%",
            transform: "translateX(-50%)",
            borderWidth: (t) => t.spacing(0.5),
            borderStyle: "solid",
            borderColor: src ? "rgba(255,255,255,0.25)" : "primary.main",
          }}
        >
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
