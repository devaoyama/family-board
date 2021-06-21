import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";
import { MemberListItem } from "src/components/header/MemberListItem";
import { AddMemberListItem } from "src/components/header/AddMemberListItem";
import { InviteMemberListItem } from "src/components/header/InviteMemberListItem";
import { FetchFamiliesQuery_families_family_members } from "src/hooks/families/__generated__/FetchFamiliesQuery";

type Props = {
  me?: FetchFamiliesQuery_families_family_members;
  familyMembers?: FetchFamiliesQuery_families_family_members[];
  onClickAddMemberListItem: () => void;
  onClickInviteMemberListItem: () => void;
};

export const MemberList: React.FC<Props> = ({
  me,
  familyMembers,
  onClickAddMemberListItem,
  onClickInviteMemberListItem,
}) => {
  return (
    <>
      <List subheader={<ListSubheader component="div">自分</ListSubheader>}>
        {me && <MemberListItem member={me.member} />}
      </List>
      <List subheader={<ListSubheader component="div">メンバー</ListSubheader>}>
        {familyMembers &&
          familyMembers.map((familyMember) => (
            <MemberListItem key={familyMember.member.id} member={familyMember.member} />
          ))}
        <AddMemberListItem onClickAddMemberListItem={onClickAddMemberListItem} />
        <InviteMemberListItem onClickInviteMemberListItem={onClickInviteMemberListItem} />
      </List>
    </>
  );
};
