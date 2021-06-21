import { useCallback } from "react";
import { useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client/core";
import {
  FetchFamilyIdByInvitations,
  FetchFamilyIdByInvitations_invitations,
  FetchFamilyIdByInvitationsVariables,
} from "src/hooks/families/__generated__/FetchFamilyIdByInvitations";

const FETCH_FAMILY_ID_BY_INVITATIONS = gql`
  query FetchFamilyIdByInvitations($exp: invitations_bool_exp) {
    invitations(where: $exp) {
      id
      family_id
    }
  }
`;

type Props = {
  fetchFamily: (args: FetchFamilyArgs) => Promise<FetchFamilyIdByInvitations_invitations>;
};

type FetchFamilyArgs = {
  id: number;
  invitationCode: string;
};

export const useFetchFamilyIdByInvitations = (): Props => {
  const client = useApolloClient();

  const fetchFamily = useCallback(
    async ({
      id,
      invitationCode,
    }: FetchFamilyArgs): Promise<FetchFamilyIdByInvitations_invitations> => {
      const variables: FetchFamilyIdByInvitationsVariables = {
        exp: {
          _and: [
            {
              id: {
                _eq: id,
              },
            },
            {
              code: {
                _eq: invitationCode,
              },
            },
          ],
        },
      };
      const res = await client.query<
        FetchFamilyIdByInvitations,
        FetchFamilyIdByInvitationsVariables
      >({
        query: FETCH_FAMILY_ID_BY_INVITATIONS,
        variables,
      });
      return res.data.invitations[0];
    },
    [],
  );

  return {
    fetchFamily,
  };
};
