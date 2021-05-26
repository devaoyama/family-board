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
import { DoneHouseworkArgs } from "src/hooks/houseworks/useDoneHousework";
import { HouseworksFragment } from "src/components/home/__generated__/HouseworksFragment";
import { FetchFamiliesQuery_families_family_members } from "src/hooks/families/__generated__/FetchFamiliesQuery";
import { UpdateHouseworkArgs } from "src/hooks/houseworks/useUpdateHousework";

export const HOUSEWORKS_FRAGMENT = gql`
  fragment HouseworksFragment on houseworks {
    id
    title
    description
    status
    point
    housework_members {
      member {
        id
        name
      }
    }
  }
`;

type Props = {
  housework: HouseworksFragment;
  members: FetchFamiliesQuery_families_family_members[];
  updateHousework: (args: UpdateHouseworkArgs) => void;
  deleteHousework: (id: number) => void;
  doneHousework: (args: DoneHouseworkArgs) => void;
};

export const HouseworkListItem: React.FC<Props> = ({
  housework,
  members,
  updateHousework,
  deleteHousework,
  doneHousework,
}) => {
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
        members={members}
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
        onClickUpdateButton={async (data) => {
          await updateHousework({
            id: housework.id,
            title: data.title,
            description: data.description,
            point: parseFloat(String(data.point)),
          });
          updateDialog.close();
        }}
        onClickDeleteButton={() => {
          deleteHousework(housework.id);
          updateDialog.close();
        }}
      />
    </>
  );
};
