import React from "react";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  THREADS_URL,
} from "../../constants";
import { ROUTES } from "../../constants/routes";
import { SimpleRouterLink } from "../navigation/SimpleLinks";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Stack,
  SvgIcon,
} from "@mui/material";
import { Instagram, Facebook, Email } from "@mui/icons-material";
import packageJSON from "../../../package.json";

export const Footer: React.FC = () => {
  return (
    <AppBar
      position={"static"}
      sx={{
        position: "relative",
        py: 8,
        px: { xs: "5%", sm: 8 },
        backgroundColor: "primary.main",
        color: "primary.contrastText",
      }}
      // enableColorOnDark
      elevation={0}
    >
      <Toolbar
        variant={"dense"}
        sx={{ position: "static", display: "block", textAlign: "center" }}
      >
        <Typography variant={"subtitle1"} align={"center"} sx={{ flex: 1 }}>
          {`Copyright © ${new Date().getFullYear()} Swing Essentials, LLC.`}
        </Typography>
        <Box sx={{ my: 0.5 }}>
          <IconButton
            title={"swingessentials"}
            color={"inherit"}
            onClick={(): void => {
              window.open(FACEBOOK_URL, "_blank");
            }}
          >
            <Facebook fontSize="inherit" />
          </IconButton>
          <IconButton
            title={"@swingessentials"}
            color={"inherit"}
            onClick={(): void => {
              window.open(INSTAGRAM_URL, "_blank");
            }}
          >
            <Instagram fontSize="inherit" />
          </IconButton>
          <IconButton
            title={"@swingessentials"}
            color={"inherit"}
            onClick={(): void => {
              window.open(THREADS_URL, "_blank");
            }}
          >
            <SvgIcon fontSize="inherit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16.307,11.343c-.078-.037-.156-.073-.236-.107-.139-2.56-1.538-4.026-3.887-4.041-.011,0-.021,0-.032,0-1.405,0-2.573.6-3.292,1.691l1.292.886c.537-.815,1.38-.989,2.001-.989.007,0,.014,0,.021,0,.773.005,1.357.23,1.735.668.275.319.459.76.55,1.317-.686-.117-1.427-.152-2.22-.107-2.233.129-3.669,1.431-3.572,3.241.049.918.506,1.708,1.288,2.224.661.436,1.512.649,2.396.601,1.168-.064,2.084-.51,2.723-1.324.485-.619.792-1.421.928-2.431.557.336.969.778,1.197,1.309.387.903.41,2.388-.801,3.598-1.061,1.06-2.337,1.519-4.264,1.533-2.138-.016-3.756-.702-4.807-2.038-.985-1.252-1.493-3.06-1.512-5.373.019-2.314.528-4.122,1.512-5.373,1.051-1.337,2.669-2.022,4.807-2.038,2.154.016,3.799.705,4.891,2.048.535.659.939,1.487,1.205,2.453l1.514-.404c-.323-1.189-.83-2.213-1.521-3.063-1.4-1.722-3.447-2.604-6.084-2.623h-.011c-2.632.018-4.656.904-6.016,2.632-1.21,1.538-1.834,3.678-1.855,6.361v.006s0,.006,0,.006c.021,2.683.645,4.823,1.855,6.361,1.36,1.728,3.384,2.614,6.016,2.632h.011c2.34-.016,3.989-.629,5.348-1.986,1.778-1.776,1.724-4.002,1.138-5.369-.42-.98-1.222-1.776-2.318-2.302ZM12.267,15.141c-.979.055-1.996-.384-2.046-1.325-.037-.698.497-1.476,2.106-1.569.184-.011.365-.016.543-.016.585,0,1.131.057,1.629.165-.185,2.316-1.273,2.692-2.231,2.744Z" />
              </svg>
            </SvgIcon>
          </IconButton>
          <IconButton
            title={"info@swingessentials.com"}
            color={"inherit"}
            onClick={(): void => {
              window.open(`mailto: ${CONTACT_EMAIL}`, "_blank");
            }}
          >
            <Email fontSize="inherit" />
          </IconButton>
        </Box>
        <Stack direction={"row"} justifyContent={"center"} gap={2}>
          <SimpleRouterLink
            to={ROUTES.PRIVACY}
            label={"Privacy Policy"}
          ></SimpleRouterLink>
          <SimpleRouterLink
            to={ROUTES.TERMS}
            label={"Terms of Use"}
          ></SimpleRouterLink>
        </Stack>

        <Typography
          variant={"caption"}
          sx={{
            position: "absolute",
            bottom: (t) => t.spacing(2),
            left: 0,
            width: "100%",
            fontSize: 10,
          }}
        >{`v${packageJSON.version}`}</Typography>
      </Toolbar>
    </AppBar>
  );
};
