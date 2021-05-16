import React from "react";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { AddHouseworkListItem } from "src/components/home/AddHouseworkListItem";
import { HouseworksFragment } from "src/components/home/__generated__/HouseworksFragment";
import { HouseworkListItem } from "src/components/home/HouseworkListItem";

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
};

export const HouseworkList: React.FC<Props> = ({ houseworks, onClickAddHouseworkListItem }) => {
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
            onClickCheckbox={() => {
              // todo チェックボタンを押した時の処理
              console.log("チェックボックスを押した");
            }}
            onClickDeleteButton={() => {
              // todo 削除ボタンを押したときの処理
              console.log("削除");
            }}
          />
        ))}
        <AddHouseworkListItem onClickAddHouseworkListItem={onClickAddHouseworkListItem} />
      </List>
    </>
  );
};
