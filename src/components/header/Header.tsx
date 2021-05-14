import React, {useCallback, useContext, useEffect} from "react";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import { MEMBERS_FRAGMENT } from "./MemberListItem";
import { HeaderQuery } from "src/components/header/__generated__/HeaderQuery";
import { MyAppBar } from "src/components/header/MyAppBar";
import { HeaderDrawer } from "src/components/header/HeaderDrawer";
import { useDrawer } from "src/hooks/header/useDrawer";
import { LoadingSpinner } from "src/components/common/LoadingSpinner";
import { HeaderMemberDrawer } from "src/components/header/HeaderMemberDrawer";
import { CurrentFamilyContext } from "src/contexts/currentFamilyContext";
import {useUpdateCurrentFamily} from "src/hooks/users/useUpdateCurrentFamily";

const HEADER_QUERY = gql`
  query HeaderQuery {
    get_current_user {
      id
      name
      current_family {
        id
        name
        family_members {
          member {
            id
            user_id
            ...MemberFragment
          }
        }
      }
    }
    families {
      id
      name
    }
  }
  ${MEMBERS_FRAGMENT}
`;

export const Header: React.FC = () => {
  const currentFamily = useContext(CurrentFamilyContext);
  const { data, loading, refetch } = useQuery<HeaderQuery>(HEADER_QUERY);
  const { updateCurrentFamily } = useUpdateCurrentFamily({
    onUpdateCurrentFamily: () => {
      // Todo SuccessToastを追加
    },
    onUpdateCurrentFamilyError: () => {
      // Todo エラーToastを追加
    },
  });
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
      await updateCurrentFamily(data.get_current_user[0].id, familyId);
      currentFamily.setId(familyId);
      await refetch();
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
        families={data?.families || []}
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
      {loading && <LoadingSpinner />}
    </React.Fragment>
  );
};
