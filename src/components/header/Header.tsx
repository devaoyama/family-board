import React, { useCallback, useState } from "react";
import { gql } from "@apollo/client/core";
import { MEMBERS_FRAGMENT } from "./MemberListItem";
import { MyAppBar } from "src/components/header/MyAppBar";
import { HeaderDrawer } from "src/components/header/HeaderDrawer";
import { useDrawer } from "src/hooks/common/useDrawer";
import { LoadingSpinner } from "src/components/common/LoadingSpinner";
import { HeaderMemberDrawer } from "src/components/header/HeaderMemberDrawer";
import { useUpdateCurrentFamily } from "src/hooks/users/useUpdateCurrentFamily";
import { FetchFamiliesQuery_families } from "src/hooks/families/__generated__/FetchFamiliesQuery";
import { FetchCurrentUserQuery_get_current_user } from "src/hooks/users/__generated__/FetchCurrentUserQuery";

export const CURRENT_FAMILY_MEMBERS_FRAGMENT = gql`
  fragment CurrentFamilyMembers on family_member {
    member {
      id
      user_id
      ...MemberFragment
    }
  }
  ${MEMBERS_FRAGMENT}
`;

export const HEADER_QUERY = gql`
  query HeaderQuery {
    get_current_user {
      id
      name
      current_family {
        id
        name
        family_members {
          member_id
          ...CurrentFamilyMembers
        }
      }
    }
    families {
      id
      name
    }
  }
  ${CURRENT_FAMILY_MEMBERS_FRAGMENT}
`;

type Props = {
  families: FetchFamiliesQuery_families[];
  currentFamily?: FetchFamiliesQuery_families;
  currentUser?: FetchCurrentUserQuery_get_current_user;
};

export const Header: React.FC<Props> = ({ families, currentFamily, currentUser }) => {
  const [fetching, setFetching] = useState<boolean>(false);
  const { updateCurrentFamily } = useUpdateCurrentFamily({});
  const drawer = useDrawer();
  const memberDrawer = useDrawer();

  const onClickFamily = useCallback(
    async (familyId: number) => {
      if (!currentUser) return;
      setFetching(true);
      await updateCurrentFamily(currentUser.id, familyId);
      setFetching(false);
      drawer.close();
    },
    [currentUser],
  );

  return (
    <React.Fragment>
      <MyAppBar
        name={currentFamily?.name}
        isShowMemberDrawerIcon={Boolean(currentFamily)}
        onOpenDrawer={drawer.open}
        onOpenMemberDrawer={memberDrawer.open}
      />
      <HeaderDrawer
        families={families}
        currentFamilyId={currentFamily?.id || 0}
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        onClickFamily={onClickFamily}
      />
      <HeaderMemberDrawer
        currentUser={currentUser}
        currentFamily={currentFamily}
        isOpen={memberDrawer.isOpen}
        onClose={memberDrawer.close}
      />
      {fetching && <LoadingSpinner />}
    </React.Fragment>
  );
};
