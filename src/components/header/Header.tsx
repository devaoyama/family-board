import React, { useContext, useEffect } from "react";
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
  const { data, loading } = useQuery<HeaderQuery>(HEADER_QUERY);
  const drawer = useDrawer();
  const memberDrawer = useDrawer();

  useEffect(() => {
    if (data?.get_current_user[0].current_family?.id) {
      currentFamily.setId(data.get_current_user[0].current_family.id);
    }
  }, [data]);

  return (
    <React.Fragment>
      <MyAppBar
        name={data?.get_current_user[0].name}
        isShowMemberDrawerIcon={Boolean(data?.get_current_user[0].current_family)}
        onOpenDrawer={drawer.open}
        onOpenMemberDrawer={memberDrawer.open}
      />
      <HeaderDrawer
        families={loading ? [] : data?.families || []}
        isOpen={drawer.isOpen}
        onClose={drawer.close}
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
