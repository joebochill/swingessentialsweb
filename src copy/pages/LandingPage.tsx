import React, { HTMLAttributes, JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useGoogleAnalyticsPageView } from "../hooks";

import { AppState } from "../__types__/redux";
import { ROUTES } from "../constants/routes";
import { APP_STORE_LINK, PLAY_STORE_LINK } from "../constants";

import { SectionBlurb } from "../components/text/SectionBlurb";
import { InfoCard } from "../components/display/InfoCard";
import { ScreenShot } from "../components/display/ScreenShot";
import { Headline } from "../components/text/Typography";
import { Testimonial } from "../components/display/Testimonial";
import { Banner } from "../components/display/Banner";
import { Section } from "../components/display/Section";

import { Spacer } from "@brightlayer-ui/react-components";
import {
  Theme,
  Typography,
  useTheme,
  Button,
  ButtonProps,
  useMediaQuery,
  Fab,
  FabProps,
  SxProps,
  Box,
  Grid2,
} from "@mui/material";
import { GetApp } from "@mui/icons-material";

import bg from "../assets/images/banners/landing.jpg";
import fullLogo from "../assets/images/logos/logo-full-white.svg";
import pga from "../assets/images/logos/pga_sp.svg";
import post1 from "../assets/icons/post-01.svg";
import post2 from "../assets/icons/post-02.svg";
import post3 from "../assets/icons/post-03.svg";
import tips from "../assets/images/banners/tips.jpg";
import nineteen from "../assets/images/banners/19th.jpg";
import pros from "../assets/images/banners/nelson.jpeg";
import cart from "../assets/images/banners/download.jpg";
import screenshot from "../assets/images/screenshot/home.png";
import appstore from "../assets/images/logos/app-store.svg";
import playstore from "../assets/images/logos/google-play.svg";

const getAbbreviatedName = (
  username: string,
  first: string,
  last: string
): string => {
  if (!first) return username;

  const firstInitial = first.charAt(0).toUpperCase() + first.substr(1);
  const lastInitial = last ? last.charAt(0).toUpperCase() : "";

  return `${firstInitial} ${lastInitial}.`;
};

const getInitials = (username: string, first: string, last: string): string => {
  if (!first) return username.charAt(0).toUpperCase();

  const firstInitial = first.charAt(0).toUpperCase();
  const lastInitial = last ? last.charAt(0).toUpperCase() : "";

  return `${firstInitial}${lastInitial}`;
};

const styles: { [key: string]: SxProps<Theme> } = {
  seLogo: {
    width: "60%",
    maxWidth: 600,
  },
  pgaLogo: {
    position: "absolute",
    top: (t) => t.spacing(2),
    right: (t) => t.spacing(2),
    maxWidth: 180,
    width: "15%",
  },
  stores: {
    xs: {
      mt: 0,
      position: "absolute",
      left: 0,
      width: "100%",
    },
    sm: {
      mt: 2,
      textAlign: "center",
    },
  },
  signUpButton: {
    display: "flex",
    color: "white",
    border: "1px solid white",
    borderRadius: 1,
    margin: "0 auto",
    minWidth: 270,
  },
  signUpFab: {
    position: "fixed",
    bottom: (t) => t.spacing(4),
    right: (t) => t.spacing(4),
    color: "white",
    border: "1px solid white",
    borderRadius: 1,
    zIndex: 2000,
  },
  stepsWrapper: {
    xs: {
      ml: 0,
    },
    md: {
      ml: 8,
      maxWidth: 512,
    },
  },
  stepIcon: {
    xs: {
      mr: 0,
      mb: 1,
      width: (t) => t.spacing(8),
    },
    md: {
      mr: 4,
      flex: "0 0 auto",
    },
  },
  step: {
    xs: {
      flexDirection: "column",
    },
    md: {
      display: "flex",
      alignItems: "center",
      // "&:not(:first-child)": {
      //   mt: 2,
      // },
    },
  },
  cartBackground: {
    position: "absolute",
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    opacity: 0.3,
  },
  testimonialWrapper: {
    xs: {
      display: "block",
    },
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    mt: 4,
  },
};

const AppleStoreIcon: React.FC<HTMLAttributes<HTMLImageElement>> = (props) => (
  <img
    src={appstore}
    alt={"Apple App Store Icon"}
    onClick={(): void => {
      window.open(APP_STORE_LINK, "blank");
    }}
    {...props}
  />
);

const GoogleStoreIcon: React.FC<HTMLAttributes<HTMLImageElement>> = (props) => (
  <img
    src={playstore}
    alt={"Google Play Store Icon"}
    onClick={(): void => {
      window.open(PLAY_STORE_LINK, "blank");
    }}
    {...props}
  />
);

const RegisterButton: React.FC<ButtonProps> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = ""; //useSelector((state: AppState) => state.auth.token);

  return !token ? (
    <Button
      variant={"contained"}
      color={"primary"}
      sx={styles.signUpButton}
      onClick={(): void => {
        navigate(ROUTES.LOGIN, {
          state: {
            from: { pathname: location.pathname },
            initialPage: "register",
          },
        });
      }}
      {...props}
    >
      Sign Up Today
    </Button>
  ) : null;
};
const RegisterFab: React.FC<Omit<FabProps, "children">> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = ""; //useSelector((state: AppState) => state.auth.token);

  return !token ? (
    <Fab
      variant={"extended"}
      color={"primary"}
      sx={styles.signUpFab}
      onClick={(): void => {
        navigate(ROUTES.LOGIN, {
          state: {
            from: { pathname: location.pathname },
            initialPage: "register",
          },
        });
      }}
      {...props}
    >
      Sign Up Today
    </Fab>
  ) : null;
};

export const LandingPage: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.down("xs"));
  //   useGoogleAnalyticsPageView();

  const token = '';//useSelector((state: AppState) => state.auth.token);
  const testimonials = [];//useSelector(
  //   (state: AppState) => state.testimonials.list
  // );

  return (
    <>
      <Banner
        background={{
          src: bg,
          position: "center 70%",
          maintainAspectRatio: true,
        }}
        noPadding
        justify={"center"}
      >
        <Box component={"img"} src={pga} alt={"PGA Logo"} sx={styles.pgaLogo} />
        <Box sx={styles.seLogo}>
          <img
            src={fullLogo}
            alt={"Swing Essentials banner logo"}
            style={{ width: "100%" }}
          />
          <Box sx={styles.stores}>
            <AppleStoreIcon style={{ cursor: "pointer" }} />
            <GoogleStoreIcon style={{ cursor: "pointer" }} />
            {!xs && <RegisterButton />}
          </Box>
        </Box>
      </Banner>
      {xs && <RegisterFab />}
      <div />
      <Section>
        <SectionBlurb
          jumbo
          headline={"Lessons on your schedule"}
          body={
            <span>
              Swing Essentials<sup>®</sup> provides you with affordable,
              individualized one-on-one lessons from a PGA-certified golf
              professional from the comfort and convenience of your home.
            </span>
          }
        />
        <Box sx={styles.stepsWrapper}>
          <Box sx={styles.step}>
            <Box
              component={"img"}
              src={post1}
              alt={"Step one icon"}
              sx={styles.stepIcon}
            />
            <Typography>
              Pull out your smart phone and snap a short video of your swing
              using your camera.
            </Typography>
          </Box>
          <Box sx={styles.step}>
            <Box
              component={"img"}
              src={post2}
              alt={"Step two icon"}
              sx={styles.stepIcon}
            />
            <Typography>
              Preview your swing and when you’re ready, submit your videos for
              professional analysis.
            </Typography>
          </Box>
          <Box sx={styles.step}>
            <Box
              component={"img"}
              src={post3}
              alt={"Step three icon"}
              sx={styles.stepIcon}
            />
            <Typography>
              Within 48 hours, you will receive a personalized video
              highlighting what you’re doing well plus areas of your swing that
              could be improved.
            </Typography>
          </Box>
        </Box>
      </Section>
      <Section>
        <Grid2 container spacing={10} justifyContent={"center"}>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <InfoCard
              spacing={10}
              source={tips}
              title={"Tip of the Month"}
              aspectRatio={"16x9"}
              description={
                "Each month we bring you a new video to help you bring your golf game to the next level."
              }
              onClick={(): void => {
                navigate(ROUTES.TIPS);
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <InfoCard
              spacing={10}
              source={nineteen}
              title={"The 19th Hole"}
              aspectRatio={"16x9"}
              description={
                "Check out our golf blog where we share stories from the field and talk about all things golf."
              }
              onClick={(): void => {
                navigate(ROUTES.BLOG);
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4 }}>
            <InfoCard
              spacing={10}
              source={pros}
              title={"Meet the Pros"}
              aspectRatio={"16x9"}
              backgroundPosition={"center 25%"}
              description={
                "Get to know the folks behind the lessons and the experience they bring to the table."
              }
              onClick={(): void => {
                navigate(ROUTES.PROS);
              }}
            />
          </Grid2>
        </Grid2>
      </Section>
      <Section background={{ color: "black" }} style={{ position: "relative" }}>
        <Box
          sx={{ ...styles.cartBackground, backgroundImage: `url(${cart})` }}
        />
        <Box sx={{ zIndex: 100 }}>
          <SectionBlurb
            jumbo
            icon={<GetApp fontSize={"inherit"} />}
            headline={"Download our app!"}
            subheading={"Available from the App Store and Google Play"}
            body={
              <>
                <span>
                  Our mobile app lets you take Swing Essentials on the go. Use
                  it to record your swing, view your lessons, and keep up to
                  date with the latest news and tips from Swing Essentials.
                </span>
                <br />
                <br />
                <span>Sign up and get your first lesson free!</span>
              </>
            }
            style={{ color: "white" }}
          />
          <Box sx={{ mt: 2, display: "inline-flex" }}>
            <AppleStoreIcon style={{ cursor: "pointer" }} />
            <GoogleStoreIcon
              style={{ cursor: "pointer", marginLeft: theme.spacing(2) }}
            />
          </Box>
        </Box>

        <Spacer
          classes={{}}
          flex={0}
          width={theme.spacing(8)}
          height={theme.spacing(8)}
        />

        <ScreenShot
          src={screenshot}
          alt={"Swing Essentials app screenshot"}
          style={{ flex: "0 0 auto" }}
        />
      </Section>

      {testimonials.length > 0 && (
        <Section style={{ display: "block", textAlign: "center" }}>
          <Headline>{`Here's what our customers are saying`}</Headline>
          <Box sx={styles.testimonialWrapper}>
            {testimonials.slice(0, 3).map((testimonial, ind) => (
              <React.Fragment key={`testimonial_${ind}`}>
                <Testimonial
                  name={getAbbreviatedName(
                    testimonial.username,
                    testimonial.first,
                    testimonial.last
                  )}
                  initials={getInitials(
                    testimonial.username,
                    testimonial.first,
                    testimonial.last
                  )}
                  location={testimonial.location}
                  joined={
                    parseInt(testimonial.joined, 10) > 0
                      ? new Date(parseInt(testimonial.joined, 10) * 1000)
                          .getFullYear()
                          .toString()
                      : ""
                  }
                  testimonial={testimonial.review}
                  style={{ flex: "1 1 0", margin: "0 auto" }}
                />
                {ind < testimonials.length - 1 && ind < 2 && (
                  <Spacer classes={{}} flex={0} height={64} width={64} />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Section>
      )}

      {!token && !xs && (
        <Section style={{ display: "block", textAlign: "center" }}>
          <Headline>{`Let's get started!`}</Headline>
          <RegisterButton
            style={{ marginTop: theme.spacing(6), border: "none" }}
          />
        </Section>
      )}
    </>
  );
};
