import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, LinkProps } from "@mui/material";

type SimpleRouterLinkProps = LinkProps & {
  label: string;
  to: string;
};
export const SimpleRouterLink: React.FC<SimpleRouterLinkProps> = (props) => {
  const { label, to, ...other } = props;
  // const classes = useStyles();
  return (
    <Link
      component={RouterLink}
      to={to}
      color={"inherit"}
      sx={{
        fontWeight: 400,
        cursor: "pointer",
        textDecoration: "none",
        userSelect: "none",
        "&:not(:nth-of-type(1))": {
          ml: 2,
        },
      }}
      {...other}
    >
      {label}
    </Link>
  );
};
type SimpleLinkProps = LinkProps & {
  label: string;
};
export const SimpleLink: React.FC<SimpleLinkProps> = (props) => {
  const { label, ...other } = props;
  return (
    <Link
      color={"inherit"}
      sx={{
        fontWeight: 400,
        cursor: "pointer",
        textDecoration: "none",
        userSelect: "none",
        "&:not(:nth-of-type(1))": {
          ml: 2,
        },
      }}
      {...other}
    >
      {label}
    </Link>
  );
};
