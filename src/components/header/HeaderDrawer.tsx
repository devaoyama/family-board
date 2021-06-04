import React from "react";
import { useRouter } from "next/router";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { FamilyListItem } from "src/components/header/FamilyListItem";
import { CreateFamilyListItem } from "src/components/header/CreateFamilyListItem";
import { FetchFamiliesQuery_families } from "src/hooks/families/__generated__/FetchFamiliesQuery";
import { JoinFamilyListItem } from "src/components/header/JoinFamilyListItem";

type Props = {
  families: FetchFamiliesQuery_families[];
  currentFamilyId: number;
  isOpen: boolean;
  onClose: () => void;
  onClickFamily: (familyId: number) => void;
};

const useStyles = makeStyles({
  list: {
    width: "300px",
  },
});

export const HeaderDrawer: React.FC<Props> = ({
  families,
  currentFamilyId,
  isOpen,
  onClose,
  onClickFamily,
}) => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <Drawer anchor={"left"} open={isOpen} onClose={onClose}>
      <List
        component={"nav"}
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            ファミリー
          </ListSubheader>
        }
        className={classes.list}
      >
        {families.map((family) => (
          <FamilyListItem
            key={family.id}
            name={family.name}
            imageSrc={"https://picsum.photos/300/200"}
            memberCount={2}
            selected={family.id === currentFamilyId}
            onClickFamily={() => onClickFamily(family.id)}
          />
        ))}
        <CreateFamilyListItem
          onClickCreateFamilyListItem={() => {
            onClose();
            router.push("/families/create");
          }}
        />
        <JoinFamilyListItem
          onClickJoinFamilyListItem={() => {
            onClose();
            router.push("/families/join");
          }}
        />
      </List>
    </Drawer>
  );
};
