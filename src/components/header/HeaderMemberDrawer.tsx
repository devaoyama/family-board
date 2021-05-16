import React, { useMemo } from "react";
import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useActiveView } from "src/hooks/common/useActiveView";
import { MemberList } from "src/components/header/MemberList";
import { AddMemberContainer } from "src/components/header/AddMemberContainer";
import {
  HeaderQuery_get_current_user,
  HeaderQuery_get_current_user_current_family_family_members,
} from "src/components/header/__generated__/HeaderQuery";

type Props = {
  currentUser?: HeaderQuery_get_current_user;
  isOpen: boolean;
  onClose: () => void;
};

const useStyles = makeStyles({
  box: {
    height: "95vh",
  },
});

export const HeaderMemberDrawer: React.FC<Props> = ({ currentUser, isOpen, onClose }) => {
  const activeView = useActiveView<"members" | "addMember">({ view: "members" });
  const classes = useStyles();

  const me = useMemo((): HeaderQuery_get_current_user_current_family_family_members | undefined => {
    const me = currentUser?.current_family?.family_members.filter((familyMembers) => {
      return familyMembers.member.user_id === currentUser?.id;
    });
    return me ? me[0] : undefined;
  }, [currentUser]);

  const familyMembers = useMemo(():
    | HeaderQuery_get_current_user_current_family_family_members[]
    | undefined => {
    return currentUser?.current_family?.family_members.filter((familyMembers) => {
      return familyMembers.member.user_id !== currentUser.id;
    });
  }, [currentUser]);

  const toggle = () => {
    switch (activeView.activeView) {
      case "addMember":
        return (
          <AddMemberContainer
            onClickBackButton={() => {
              activeView.toggle("members");
            }}
          />
        );
      default:
        if (currentUser !== undefined) {
          return (
            <MemberList
              me={me}
              familyMembers={familyMembers}
              onClickAddMemberListItem={() => {
                activeView.toggle("addMember");
              }}
            />
          );
        }
    }
  };

  return (
    <Drawer
      anchor={"bottom"}
      open={isOpen}
      onClose={() => {
        onClose();
        activeView.toggle("members");
      }}
    >
      <div className={classes.box}>{toggle()}</div>
    </Drawer>
  );
};
