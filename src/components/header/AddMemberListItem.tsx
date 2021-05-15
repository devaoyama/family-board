import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import AddIcon from "@material-ui/icons/Add";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  listItemAdd: {
    color: "gray",
  },
});

type Props = {
  onClickAddMemberListItem: () => void;
};

export const AddMemberListItem: React.FC<Props> = ({ onClickAddMemberListItem }) => {
  const classes = useStyles();

  return (
    <ListItem button onClick={onClickAddMemberListItem}>
      <ListItemIcon>
        <AddIcon fontSize={"large"} />
      </ListItemIcon>
      <ListItemText className={classes.listItemAdd} primary={"メンバーを追加する"} />
    </ListItem>
  );
};
