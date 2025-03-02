import React, { JSX } from "react";
import { FancyHeadline } from "./FancyHeadline";
import { Box, BoxProps, Typography } from "@mui/material";

type SectionBlurbProps = BoxProps & {
  headline: string;
  subheading?: string;
  body: React.ReactNode;
  icon?: JSX.Element;
};
export const SectionBlurb: React.FC<SectionBlurbProps> = (props) => {
  const { headline, sx, subheading, body, icon, ...other } = props;

  return (
    <Box
      sx={[
        { maxWidth: { xs: "initial", sm: 512 }, color: "text.primary", mb: 6 },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <FancyHeadline icon={icon} headline={headline} subheading={subheading} />
      <Typography variant={'h5'} fontWeight={400} lineHeight={1.6}>{body}</Typography>
    </Box>
  );
};
