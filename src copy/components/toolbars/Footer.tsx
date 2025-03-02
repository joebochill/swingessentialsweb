import React from "react";
import {
  TWITTER_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
} from "../../../src/constants";
import { ROUTES } from "../../../src/constants/routes";
import { SimpleRouterLink } from "../navigation/SimpleLink";
import {
  AppBar,
  Toolbar,
  Typography,
  Theme,
  IconButton,
  SxProps,
} from "@mui/material";
import { Twitter, Instagram, Facebook, Email } from "@mui/icons-material";
import packageJSON from "../../../package.json";

const styles: { [key: string]: SxProps<Theme> } = {
  footer: {
    position: "relative",
    p: 8,
    background: "primary.main",
    color: "primary.contrastText",
    xs: {
      py: 8,
      px: "5%",
      flexDirection: "column",
      textAlign: "center",
    },
  },
  toolbar: {
    position: "static",
    display: "block",
    textAlign: "center",
  },
  copyright: {
    flex: "1 1 0px",
  },
  version: {
    position: "absolute",
    bottom: (t) => t.spacing(2),
    left: 0,
    width: "100%",
    fontSize: 10,
  },
};

export const Footer: React.FC = () => {
  return (
    <AppBar position={"static"} sx={styles.footer} elevation={0}>
      <Toolbar variant={"dense"} sx={styles.toolbar}>
        <Typography
          variant={"subtitle1"}
          align={"center"}
          sx={styles.copyright}
        >
          {`Copyright © ${new Date().getFullYear()} Swing Essentials, LLC.`}
        </Typography>
        <div>
          <IconButton
            title={"@swingessentials"}
            color={"inherit"}
            onClick={(): void => {
              window.open(TWITTER_URL, "_blank");
            }}
          >
            <Twitter />
          </IconButton>
          <IconButton
            title={"swingessentials"}
            color={"inherit"}
            onClick={(): void => {
              window.open(FACEBOOK_URL, "_blank");
            }}
          >
            <Facebook />
          </IconButton>
          <IconButton
            title={"@swingessentials"}
            color={"inherit"}
            onClick={(): void => {
              window.open(INSTAGRAM_URL, "_blank");
            }}
          >
            <Instagram />
          </IconButton>
          <IconButton
            title={"info@swingessentials.com"}
            color={"inherit"}
            onClick={(): void => {
              window.open(`mailto: ${CONTACT_EMAIL}`, "_blank");
            }}
          >
            <Email />
          </IconButton>
        </div>
        <SimpleRouterLink
          to={ROUTES.PRIVACY}
          label={"Privacy Policy"}
        ></SimpleRouterLink>
        <SimpleRouterLink
          to={ROUTES.TERMS}
          label={"Terms of Use"}
        ></SimpleRouterLink>
        <Typography
          variant={"caption"}
          sx={styles.version}
        >{`v${packageJSON.version}`}</Typography>
      </Toolbar>
    </AppBar>
  );
};
