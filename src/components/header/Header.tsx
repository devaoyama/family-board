import React, { useCallback, useContext, useEffect, useState } from "react";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import { MEMBERS_FRAGMENT } from "./MemberListItem";
import { HeaderQuery } from "src/components/header/__generated__/HeaderQuery";
import { MyAppBar } from "src/components/header/MyAppBar";
import { HeaderDrawer } from "src/components/header/HeaderDrawer";
import { useDrawer } from "src/hooks/common/useDrawer";
import { LoadingSpinner } from "src/components/common/LoadingSpinner";
import { HeaderMemberDrawer } from "src/components/header/HeaderMemberDrawer";
import { CurrentFamilyContext } from "src/contexts/currentFamilyContext";
import { useUpdateCurrentFamily } from "src/hooks/users/useUpdateCurrentFamily";
import { useFetchFamilies } from "src/hooks/families/useFetchFamilies";

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

export const Header: React.FC = () => {
  const [fetching, setFetching] = useState<boolean>(false);
  const currentFamily = useContext(CurrentFamilyContext);
  const { data, loading } = useQuery<HeaderQuery>(HEADER_QUERY);
  const { updateCurrentFamily } = useUpdateCurrentFamily({});
  const { families } = useFetchFamilies();
  const drawer = useDrawer();
  const memberDrawer = useDrawer();

  useEffect(() => {
    if (data?.get_current_user[0].current_family?.id) {
      currentFamily.setId(data.get_current_user[0].current_family.id);
    }
  }, [data]);

  const onClickFamily = useCallback(
    async (familyId: number) => {
      if (!data?.get_current_user[0].id) return;
      setFetching(true);
      await updateCurrentFamily(data.get_current_user[0].id, familyId);
      currentFamily.setId(familyId);
      setFetching(false);
      drawer.close();
    },
    [currentFamily, data],
  );

  return (
    <React.Fragment>
      <MyAppBar
        name={data?.get_current_user[0].current_family?.name}
        isShowMemberDrawerIcon={Boolean(data?.get_current_user[0].current_family)}
        onOpenDrawer={drawer.open}
        onOpenMemberDrawer={memberDrawer.open}
      />
      <HeaderDrawer
        families={families}
        currentFamilyId={currentFamily.id || 0}
        isOpen={drawer.isOpen}
        onClose={drawer.close}
        onClickFamily={onClickFamily}
      />
      <HeaderMemberDrawer
        currentUser={data?.get_current_user[0]}
        isOpen={memberDrawer.isOpen}
        onClose={memberDrawer.close}
      />
      {(loading || fetching) && <LoadingSpinner />}
    </React.Fragment>
  );
};
