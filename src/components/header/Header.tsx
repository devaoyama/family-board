import React, {useState} from "react";
import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GroupIcon from "@material-ui/icons/Group";
import Drawer from "@material-ui/core/Drawer";

export const Header: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
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
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        リスト
      </Drawer>
    </React.Fragment>
  );
};
