import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { HOUSEWORKS_FRAGMENT } from "src/components/home/HouseworkListItem";
import {
  FetchHouseworksQuery,
  FetchHouseworksQuery_houseworks,
  FetchHouseworksQueryVariables,
} from "src/hooks/houseworks/__generated__/FetchHouseworksQuery";

const FETCH_HOUSEWORKS_QUERY = gql`
  query FetchHouseworksQuery($familyId: Int!) {
    houseworks(where: { family_id: { _eq: $familyId } }) {
      id
      ...HouseworksFragment
    }
  }
  ${HOUSEWORKS_FRAGMENT}
`;

type Args = {
  familyId: number | null | undefined;
};

type Props = {
  houseworks: FetchHouseworksQuery_houseworks[];
};

export const useFetchHouseworks = ({ familyId }: Args): Props => {
  const [houseworks, setHouseworks] = useState<FetchHouseworksQuery_houseworks[]>([]);
  const client = useApolloClient();

  useEffect(() => {
    if (!familyId) return;
    client
      .query<FetchHouseworksQuery, FetchHouseworksQueryVariables>({
        query: FETCH_HOUSEWORKS_QUERY,
        variables: { familyId },
      })
      .then((response) => {
        setHouseworks(response.data.houseworks);
      });
  }, [familyId]);

  return {
    houseworks,
  };
};
