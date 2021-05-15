import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { gql } from "@apollo/client/core";
import { MemberFragment } from "src/components/header/__generated__/MemberFragment";

export const MEMBERS_FRAGMENT = gql`
  fragment MemberFragment on members {
    id
    name
  }
`;

type Props = {
  member: MemberFragment;
};

export const MemberListItem: React.FC<Props> = ({ member }) => {
  return (
    <ListItem button>
      <ListItemIcon>
        <AccountCircleIcon fontSize={"large"} />
      </ListItemIcon>
      <ListItemText primary={member.name} />
    </ListItem>
  );
};
