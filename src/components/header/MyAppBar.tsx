import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import GroupIcon from "@material-ui/icons/Group";
import AppBar from "@material-ui/core/AppBar";
import Link from "next/link";

type Props = {
  name: string | undefined;
  onOpenDrawer: () => void;
  onOpenMemberDrawer: () => void;
};

export const MyAppBar: React.FC<Props> = ({ name, onOpenDrawer, onOpenMemberDrawer }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={onOpenDrawer}>
          <MenuIcon />
        </IconButton>
        <Box mx={"auto"}>
          <Link href={"/"}>
            <Typography variant="h6">{name || "ファミリーボード"}</Typography>
          </Link>
        </Box>
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={onOpenMemberDrawer}>
          <GroupIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
