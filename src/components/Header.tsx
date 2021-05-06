import React from "react";
import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GroupIcon from "@material-ui/icons/Group";

export const Header: React.FC = () => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
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
    </React.Fragment>
  );
};
