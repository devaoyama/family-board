import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import ListItem from "@material-ui/core/ListItem";
import { gql } from "@apollo/client/core";
import { HouseworkDetailDialog } from "src/components/home/HouseworkDetailDialog";
import { useDialog } from "src/hooks/common/useDialog";
import { UpdateHouseworkFormContainer } from "src/components/home/UpdateHouseworkFormContainer";
import { DoneHouseworkFormContainer } from "src/components/home/DoneHouseworkFormContainer";
import { HouseworksFragment } from "src/hooks/houseworks/__generated__/HouseworksFragment";

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
  deleteHousework: (id: number) => void;
  doneHousework: (id: number, status: boolean, memberIds: number[]) => void;
};

export const HouseworkListItem: React.FC<Props> = ({ housework, deleteHousework, doneHousework }) => {
  const doneDialog = useDialog();
  const detailDialog = useDialog();
  const updateDialog = useDialog();

  return (
    <>
      <ListItem key={housework.id}>
        <ListItemIcon>
          <Checkbox checked={housework.status} onClick={doneDialog.open} />
        </ListItemIcon>
        <ListItemText primary={housework.title} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="comments" onClick={detailDialog.open}>
            <CommentIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <DoneHouseworkFormContainer
        housework={housework}
        isOpen={doneDialog.isOpen}
        onClose={doneDialog.close}
        doneHousework={doneHousework}
      />
      <HouseworkDetailDialog
        housework={housework}
        isOpen={detailDialog.isOpen}
        onClose={detailDialog.close}
        onClickUpdateDialogButton={() => {
          detailDialog.close();
          updateDialog.open();
        }}
      />
      <UpdateHouseworkFormContainer
        housework={housework}
        isOpen={updateDialog.isOpen}
        onClose={updateDialog.close}
        onClickDeleteButton={() => {
          deleteHousework(housework.id);
          updateDialog.close();
        }}
      />
    </>
  );
};
