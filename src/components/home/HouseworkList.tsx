import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { AddHouseworkListItem } from "src/components/home/AddHouseworkListItem";
import { HouseworkListItem } from "src/components/home/HouseworkListItem";
import { DoneHouseworkArgs } from "src/hooks/houseworks/useDoneHousework";
import { HouseworksFragment } from "src/components/home/__generated__/HouseworksFragment";
import { FetchFamiliesQuery_families_family_members } from "src/hooks/families/__generated__/FetchFamiliesQuery";

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
  members: FetchFamiliesQuery_families_family_members[];
  onClickAddHouseworkListItem: () => void;
  deleteHousework: (id: number) => void;
  doneHousework: (args: DoneHouseworkArgs) => void;
};

export const HouseworkList: React.FC<Props> = ({
  houseworks,
  members,
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
            members={members}
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
