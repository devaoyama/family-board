import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { HOUSEWORKS_FRAGMENT } from "src/components/home/HouseworkListItem";
import {
  FetchHouseworksQuery,
  FetchHouseworksQuery_houseworks,
  FetchHouseworksQueryVariables,
} from "src/hooks/houseworks/__generated__/FetchHouseworksQuery";

const FETCH_HOUSEWORKS_QUERY = gql`
  query FetchHouseworksQuery($exp: houseworks_bool_exp) {
    houseworks(where: $exp) {
      id
      ...HouseworksFragment
    }
  }
  ${HOUSEWORKS_FRAGMENT}
`;

type Args = {
  familyId: number | null | undefined;
  date: Date;
};

type Props = {
  houseworks: FetchHouseworksQuery_houseworks[];
};

export const useFetchHouseworks = ({ familyId, date }: Args): Props => {
  const [houseworks, setHouseworks] = useState<FetchHouseworksQuery_houseworks[]>([]);
  const [loadHouseworks, { loading, data }] = useLazyQuery<
    FetchHouseworksQuery,
    FetchHouseworksQueryVariables
  >(FETCH_HOUSEWORKS_QUERY);

  useEffect(() => {
    if (!familyId) return;
    const variables: FetchHouseworksQueryVariables = {
      exp: {
        family_id: {
          _eq: familyId,
        },
        date: {
          _eq: date,
        },
      },
    };
    loadHouseworks({ variables });
  }, [familyId, date]);

  useEffect(() => {
    if (loading) return;
    setHouseworks(data?.houseworks || []);
  }, [data, loading]);

  return {
    houseworks,
  };
};
