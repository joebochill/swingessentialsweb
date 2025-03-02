import React, { JSX } from "react";
import { Box, Stack, StackProps, Typography } from "@mui/material";

type FancyHeadlineProps = StackProps & {
  headline: string;
  subheading?: string;
  icon?: JSX.Element;
};
export const FancyHeadline: React.FC<FancyHeadlineProps> = (props) => {
  const { headline, subheading, icon, ...other } = props;

  return (
    <Stack
      alignItems={"center"}
      // gap={2}
      sx={[
        {
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          textAlign: { xs: "center", md: "left" },
          mb: 2,
          gap: 2,
        },
      ]}
      {...other}
    >
      {icon && (
        <Box
          sx={{
            fontSize: 48,
            display: "inline-block",
            lineHeight: 1
          }}
        >
          {icon}
        </Box>
      )}

      <Stack>
        <Typography variant={"h4"} fontWeight={600}>
          {headline}
        </Typography>
        {subheading && (
          <Typography variant={"subtitle2"} fontWeight={400}>
            {subheading}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
