import React from "react";
import { Toolbar, AppBar, AppBarProps, SxProps, Theme } from "@mui/material";

const styles: { [key: string]: SxProps<Theme> } = {
  actionBar: {
    top: (t) => t.spacing(8),
    xs: {
      top: (t) => t.spacing(7),
    },
  },
};
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
      sx={styles.actionBar}
      {...barProps}
    >
      <Toolbar style={{ justifyContent: "center" }}>{props.children}</Toolbar>
    </AppBar>
  );
};
