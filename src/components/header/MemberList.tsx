import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";
import { gql } from "@apollo/client/core";
import { MemberListItem } from "src/components/header/MemberListItem";
import { AddMemberListItem } from "src/components/header/AddMemberListItem";
import { MemberFragment } from "src/components/header/__generated__/MemberFragment";

export const MEMBERS_FRAGMENT = gql`
  fragment MemberFragment on members {
    id
    name
  }
`;

type Props = {
  me: MemberFragment;
  members: MemberFragment[];
  onClickAddMemberListItem: () => void;
};

export const MemberList: React.FC<Props> = ({ me, members, onClickAddMemberListItem }) => {
  return (
    <>
      <List subheader={<ListSubheader component="div">自分</ListSubheader>}>
        <MemberListItem name={me.name} />
      </List>
      <List subheader={<ListSubheader component="div">メンバー</ListSubheader>}>
        {members.map((member) => (
          <MemberListItem key={member.id} name={member.name} />
        ))}
        <AddMemberListItem onClickAddMemberListItem={onClickAddMemberListItem} />
      </List>
    </>
  );
};
