import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AddIcon from "@material-ui/icons/Add";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  listItemAdd: {
    color: "gray",
  },
});

type Props = {
  onClickAddHouseworkListItem: () => void;
};

export const AddHouseworkListItem: React.FC<Props> = ({ onClickAddHouseworkListItem }) => {
  const classes = useStyles();

  return (
    <ListItem button onClick={onClickAddHouseworkListItem}>
      <ListItemIcon>
        <AddIcon fontSize={"large"} />
      </ListItemIcon>
      <ListItemText className={classes.listItemAdd} primary={"家事を追加"} />
    </ListItem>
  );
};
