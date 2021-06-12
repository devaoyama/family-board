import React, { useMemo } from "react";
import Drawer from "@material-ui/core/Drawer";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useActiveView } from "src/hooks/common/useActiveView";
import { MemberList } from "src/components/header/MemberList";
import { AddMemberContainer } from "src/components/header/AddMemberContainer";
import { InviteMemberCode } from "src/components/header/InviteMemberCode";
import { FetchCurrentUserQuery_get_current_user } from "src/hooks/users/__generated__/FetchCurrentUserQuery";
import {
  FetchFamiliesQuery_families,
  FetchFamiliesQuery_families_family_members,
} from "src/hooks/families/__generated__/FetchFamiliesQuery";

type Props = {
  currentUser?: FetchCurrentUserQuery_get_current_user;
  currentFamily?: FetchFamiliesQuery_families;
  me?: FetchFamiliesQuery_families_family_members;
  isOpen: boolean;
  onClose: () => void;
};

const useStyles = makeStyles({
  box: {
    height: "95vh",
  },
});

export const HeaderMemberDrawer: React.FC<Props> = ({
  currentUser,
  currentFamily,
  me,
  isOpen,
  onClose,
}) => {
  const activeView = useActiveView<"members" | "addMember" | "inviteMember">({ view: "members" });
  const classes = useStyles();

  const familyMembers = useMemo((): FetchFamiliesQuery_families_family_members[] | undefined => {
    return currentFamily?.family_members.filter((familyMembers) => {
      return familyMembers.member.user_id !== currentUser?.id;
    });
  }, [currentFamily, currentFamily]);

  const invitationCode = useMemo((): string => {
    return `${currentFamily?.invitations[0].id}-${currentFamily?.invitations[0].code}`;
  }, [currentFamily?.invitations]);

  const toggle = () => {
    switch (activeView.activeView) {
      case "addMember":
        return (
          <AddMemberContainer
            currentFamily={currentFamily}
            onClickBackButton={() => {
              activeView.toggle("members");
            }}
          />
        );
      case "inviteMember":
        return (
          <InviteMemberCode
            inviteCode={invitationCode}
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
              onClickInviteMemberListItem={() => {
                activeView.toggle("inviteMember");
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
