import React, { useCallback, useMemo } from "react";
import Container from "@material-ui/core/Container";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import { Header } from "src/components/header/Header";
import { GettingStarted } from "src/components/home/GettingStarted";
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
import { useFetchCurrentUser } from "src/hooks/users/useFetchCurrentUser";
import { useFetchFamilies } from "src/hooks/families/useFetchFamilies";
import { useCreateHousework } from "src/hooks/houseworks/useCreateHousework";

const HOUSEWORKS_QUERY = gql`
  query HouseworksQuery($familyId: Int!) {
    houseworks(where: { family_id: { _eq: $familyId } }) {
      id
      ...HouseworksFragment
    }
  }
  ${HOUSEWORKS_FRAGMENT}
`;

export const HomeContainer: React.FC = () => {
  const { user } = useFetchCurrentUser();
  const { families } = useFetchFamilies();
  const currentFamily = useMemo(() => {
    if (!user || !families) return undefined;
    return families.find((family) => family.id === user.current_family_id);
  }, [user, families]);
  const { data } = useQuery<HouseworksQuery, HouseworksQueryVariables>(HOUSEWORKS_QUERY, {
    variables: {
      familyId: currentFamily?.id || 0,
    },
  });
  const { createHousework } = useCreateHousework({});
  const { deleteHousework } = useDeleteHousework({});
  const { doneHousework } = useDoneHousework({});
  const createHouseworkDialog = useDialog();

  const onClickCreateHousework = useCallback(
    async (data) => {
      await createHousework(currentFamily?.id, data.title, data.description, parseInt(data.point));
      createHouseworkDialog.close();
    },
    [currentFamily],
  );

  return (
    <>
      <Header families={families} currentFamily={currentFamily} currentUser={user} />
      {currentFamily?.id ? (
        <Container component={"main"} maxWidth={"xs"}>
          <HouseworkList
            houseworks={data?.houseworks || []}
            members={currentFamily.family_members}
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
        onClickCreateHousework={onClickCreateHousework}
      />
    </>
  );
};
