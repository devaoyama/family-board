import React from "react";
import { useRouter } from "next/router";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { FamilyListItem } from "src/components/header/FamilyListItem";
import { CreateFamilyListItem } from "src/components/header/CreateFamilyListItem";

type Props = {
  families: any[];
  isOpen: boolean;
  onClose: () => void;
};

const useStyles = makeStyles({
  list: {
    width: "300px",
  },
});

export const HeaderDrawer: React.FC<Props> = ({ families, isOpen, onClose }) => {
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
          />
        ))}
        <CreateFamilyListItem
          onClickCreateFamilyListItem={() => {
            onClose();
            router.push("/families/create");
          }}
        />
      </List>
    </Drawer>
  );
};
