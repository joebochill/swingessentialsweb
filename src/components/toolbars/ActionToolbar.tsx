import React from "react";
import { Toolbar, AppBar, AppBarProps } from "@mui/material";

type ActionToolbarProps = AppBarProps & {
  show: boolean;
};
export const ActionToolbar: React.FC<ActionToolbarProps> = (props) => {
  const { show, ...barProps } = props;

  if (!show) return null;

  return (
    <AppBar
      position={"sticky"}
      color={"default"}
      sx={{
        top: { xs: (t) => t.spacing(7), md: (t) => t.spacing(8) },
      }}
      {...barProps}
    >
      <Toolbar sx={{ justifyContent: "center", color: 'text.primary' }}>{props.children}</Toolbar>
    </AppBar>
  );
};
