import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import { gql } from "@apollo/client/core";
import { useQuery } from "@apollo/client";
import { Header } from "src/components/header/Header";
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
  const currentFamily = useContext(CurrentFamilyContext);
  const createHouseworkDialog = useDialog();
  const { data } = useQuery<HouseworksQuery, HouseworksQueryVariables>(HOUSEWORKS_QUERY, {
    variables: {
      familyId: currentFamily.id || 0,
    },
  });
  const { deleteHousework } = useDeleteHousework({});
  const { doneHousework } = useDoneHousework({});

  return (
    <>
      <Header />
      {currentFamily.id ? (
        <Container component={"main"} maxWidth={"xs"}>
          <HouseworkList
            houseworks={data?.houseworks || []}
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
