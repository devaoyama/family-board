import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  listItemAdd: {
    color: "gray",
  },
});

type Props = {
  onClickInviteMemberListItem: () => void;
};

export const InviteMemberListItem: React.FC<Props> = ({ onClickInviteMemberListItem }) => {
  const classes = useStyles();

  return (
    <ListItem button onClick={onClickInviteMemberListItem}>
      <ListItemIcon>
        <ContactMailIcon fontSize={"large"} />
      </ListItemIcon>
      <ListItemText className={classes.listItemAdd} primary={"メンバーを招待する"} />
    </ListItem>
  );
};
