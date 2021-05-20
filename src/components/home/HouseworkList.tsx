import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { AddHouseworkListItem } from "src/components/home/AddHouseworkListItem";
import { HouseworkListItem } from "src/components/home/HouseworkListItem";
import { HouseworksFragment } from "src/hooks/houseworks/__generated__/HouseworksFragment";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: theme.spacing(2, 0, 0),
    textAlign: "center",
    fontWeight: "bold",
  },
  list: {
    paddingTop: "0",
  },
}));

type Props = {
  houseworks: HouseworksFragment[];
  onClickAddHouseworkListItem: () => void;
  deleteHousework: (id: number) => void;
  doneHousework: (id: number, status: boolean, memberIds: number[]) => void;
};

export const HouseworkList: React.FC<Props> = ({
  houseworks,
  onClickAddHouseworkListItem,
  deleteHousework,
  doneHousework,
}) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" className={classes.title}>
        今日の家事リスト
      </Typography>
      <List className={classes.list}>
        {houseworks.map((housework) => (
          <HouseworkListItem
            key={housework.id}
            housework={housework}
            deleteHousework={deleteHousework}
            doneHousework={doneHousework}
          />
        ))}
        <AddHouseworkListItem onClickAddHouseworkListItem={onClickAddHouseworkListItem} />
      </List>
    </>
  );
};
