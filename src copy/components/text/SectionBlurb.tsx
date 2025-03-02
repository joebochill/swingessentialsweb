import React, { CSSProperties, HTMLAttributes, JSX } from "react";
import { Body } from "./Typography";
import { FancyHeadline } from "./FancyHeadline";
import { Box, SxProps, Theme, Typography } from "@mui/material";

const myr: CSSProperties['color'] = 'primary.main';
const styles: { [key: string]: SxProps<Theme> } = {
  blurb: {
    maxWidth: 512,
    xs: {
      mb: 6,
      maxWidth: "initial",
    },
  },
};

type SectionBlurbProps = HTMLAttributes<HTMLDivElement> & {
  headline: string;
  subheading?: string;
  body: React.ReactNode;
  icon?: JSX.Element;
  jumbo?: boolean;
};
export const SectionBlurb: React.FC<SectionBlurbProps> = (props) => {
  const { headline, subheading, body, icon, jumbo, ...other } = props;

  // const classes = useStyles();

  return (
    <Box sx={{color: 'primary.main'}} {...other}>
      <FancyHeadline
        icon={icon}
        headline={headline}
        subheading={subheading}
        jumbo={jumbo}
      />
      {jumbo && <Body>{body}</Body>}
      {!jumbo && (
        <Typography variant={"h6"} style={{ lineHeight: 1.6, fontWeight: 400 }}>
          {body}
        </Typography>
      )}
    </Box>
  );
};
