import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  listItemAdd: {
    color: "gray",
  },
});

type Props = {
  onClickJoinFamilyListItem: () => void;
};

export const JoinFamilyListItem: React.FC<Props> = ({ onClickJoinFamilyListItem }) => {
  const classes = useStyles();

  return (
    <ListItem button onClick={onClickJoinFamilyListItem}>
      <ListItemIcon>
        <EmojiPeopleIcon fontSize={"large"} />
      </ListItemIcon>
      <ListItemText className={classes.listItemAdd} primary="ファミリーに参加する" />
    </ListItem>
  );
};
