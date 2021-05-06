import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import GroupIcon from "@material-ui/icons/Group";
import AppBar from "@material-ui/core/AppBar";

type Props = {
  onOpenDrawer: () => void;
};

export const MyAppBar: React.FC<Props> = ({ onOpenDrawer }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onOpenDrawer}>
          <MenuIcon />
        </IconButton>
        <Box mx={"auto"}>
          <Typography variant="h6">ファミリーボード</Typography>
        </Box>
        <IconButton edge="end" color="inherit" aria-label="menu">
          <GroupIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
