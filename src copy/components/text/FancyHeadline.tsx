import React, { HTMLAttributes, JSX } from "react";
import { Spacer } from "@brightlayer-ui/react-components";
import { Headline, SubHeading } from "./Typography";
import { Box, SxProps, Theme, Typography } from "@mui/material";
// import clsx from 'clsx';

const styles: { [key: string]: SxProps<Theme> } = {
  headline: {
    xs: {
      textAlign: "center",
      display: "block",
    },
    display: "inline-flex",
    alignItems: "center",
    textAlign: "left",
    mb: 2,
  },
  headlineIcon: {
    fontSize: 48,
    display: "inline-flex",
  },
  smallHeadlineIcon: {
    display: "inline-flex",
    mr: 0.5,
    fontSize: 24,
  },
  jumbo: {
    xs: {
      textAlign: "center",
    },
  },
};

type FancyHeadlineProps = HTMLAttributes<HTMLDivElement> & {
  headline: string;
  subheading?: string;
  icon?: JSX.Element;
  jumbo?: boolean;
};
export const FancyHeadline: React.FC<FancyHeadlineProps> = (props) => {
  const { jumbo, headline, subheading, icon, ...other } = props;

  // const classes = useStyles();
  // const theme = useTheme();

  return !jumbo ? (
    <Box sx={styles.headline} {...other}>
      {icon && <Box sx={styles.smallHeadlineIcon}>{icon}</Box>}
      <div>
        <Typography variant={"h6"}>{headline}</Typography>
        {subheading && (
          <Typography variant={"caption"}>{subheading}</Typography>
        )}
      </div>
    </Box>
  ) : (
    <Box
      sx={
        {
          ...styles.headline,
          ...(!icon ? styles.jumbo : {}),
        } as SxProps<Theme>
      }
      {...other}
    >
      {icon && (
        <>
          <Box sx={styles.headlineIcon}>{icon}</Box>
          <Spacer
            classes={{}}
            flex={0}
            height={0}
            /*width={theme.spacing(2)}*/ sx={{ width: (t) => t.spacing(2) }}
          />
        </>
      )}
      <div>
        <Headline>{headline}</Headline>
        {subheading && <SubHeading>{subheading}</SubHeading>}
      </div>
    </Box>
  );
};
