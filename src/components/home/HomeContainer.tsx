import React, { useCallback, useContext } from "react";
import Container from "@material-ui/core/Container";
import { gql } from "@apollo/client/core";
import { useApolloClient, useQuery } from "@apollo/client";
import { CURRENT_FAMILY_MEMBERS_FRAGMENT, Header } from "src/components/header/Header";
import { GettingStarted } from "src/components/home/GettingStarted";
import { CurrentFamilyContext } from "src/contexts/currentFamilyContext";
import { HouseworkList } from "src/components/home/HouseworkList";
import { CreateHouseworkFormContainer } from "src/components/home/CreateHouseworkFormContainer";
import { useDialog } from "src/hooks/common/useDialog";
import { HOUSEWORKS_FRAGMENT } from "src/components/home/HouseworkListItem";
import {
  HouseworksQuery,
  HouseworksQueryVariables,
} from "src/components/home/__generated__/HouseworksQuery";
import { useDeleteHousework } from "src/hooks/houseworks/useDeleteHousework";
import { useDoneHousework } from "src/hooks/houseworks/useDoneHousework";
import {
  CurrentFamilyMembersQuery,
  CurrentFamilyMembersQuery_get_current_user_current_family_family_members
} from "src/components/home/__generated__/CurrentFamilyMembersQuery";

const HOUSEWORKS_QUERY = gql`
  query HouseworksQuery($familyId: Int!) {
    houseworks(where: { family_id: { _eq: $familyId } }) {
      id
      ...HouseworksFragment
    }
  }
  ${HOUSEWORKS_FRAGMENT}
`;

const CURRENT_FAMILY_MEMBERS_QUERY = gql`
  query CurrentFamilyMembersQuery {
    get_current_user {
      id
      current_family {
        id
        family_members {
          member_id
          ...CurrentFamilyMembers
        }
      }
    }
  }
  ${CURRENT_FAMILY_MEMBERS_FRAGMENT}
`;

export const HomeContainer: React.FC = () => {
  const currentFamily = useContext(CurrentFamilyContext);
  const createHouseworkDialog = useDialog();
  const client = useApolloClient();
  const { data } = useQuery<HouseworksQuery, HouseworksQueryVariables>(HOUSEWORKS_QUERY, {
    variables: {
      familyId: currentFamily.id || 0,
    },
  });
  const getMembers = useCallback((): CurrentFamilyMembersQuery_get_current_user_current_family_family_members[] => {
    if (!currentFamily.id) return [];
    const data = client.readQuery<CurrentFamilyMembersQuery>({
      query: CURRENT_FAMILY_MEMBERS_QUERY,
    });
    return data?.get_current_user[0].current_family?.family_members || [];
  }, [currentFamily.id]);
  const { deleteHousework } = useDeleteHousework({});
  const { doneHousework } = useDoneHousework({});

  return (
    <>
      <Header />
      {currentFamily.id ? (
        <Container component={"main"} maxWidth={"xs"}>
          <HouseworkList
            houseworks={data?.houseworks || []}
            getMembers={getMembers}
            onClickAddHouseworkListItem={createHouseworkDialog.open}
            deleteHousework={deleteHousework}
            doneHousework={doneHousework}
          />
        </Container>
      ) : (
        <GettingStarted />
      )}
      <CreateHouseworkFormContainer
        isOpen={createHouseworkDialog.isOpen}
        onClose={createHouseworkDialog.close}
      />
    </>
  );
};
