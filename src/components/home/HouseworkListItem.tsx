import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import ListItem from "@material-ui/core/ListItem";
import { gql } from "@apollo/client/core";
import { HouseworksFragment } from "src/components/home/__generated__/HouseworksFragment";
import { HouseworkDetailDialog } from "src/components/home/HouseworkDetailDialog";
import { useDialog } from "src/hooks/common/useDialog";

export const HOUSEWORKS_FRAGMENT = gql`
  fragment HouseworksFragment on houseworks {
    id
    title
    description
    status
    point
  }
`;

type Props = {
  housework: HouseworksFragment;
  onClickCheckbox: () => void;
  deleteHousework: (id: number) => void;
};

export const HouseworkListItem: React.FC<Props> = ({
  housework,
  onClickCheckbox,
  deleteHousework,
}) => {
  const { isOpen, open, close } = useDialog();

  return (
    <>
      <ListItem key={housework.id}>
        <ListItemIcon>
          <Checkbox checked={housework.status} onClick={onClickCheckbox} />
        </ListItemIcon>
        <ListItemText primary={housework.title} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments" onClick={open}>
            <CommentIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <HouseworkDetailDialog
        housework={housework}
        isOpen={isOpen}
        onClose={close}
        onClickDeleteButton={() => {
          deleteHousework(housework.id);
          close();
        }}
      />
    </>
  );
};
