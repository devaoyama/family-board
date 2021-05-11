import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

type Props = {
  name: string;
};

export const MemberListItem: React.FC<Props> = ({ name }) => {
  return (
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon fontSize={"large"} />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
};
