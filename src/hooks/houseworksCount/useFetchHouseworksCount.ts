import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import {
  FetchHouseworksCountQuery,
  FetchHouseworksCountQuery_get_houseworks_count,
  FetchHouseworksCountQueryVariables,
} from "src/hooks/houseworksCount/__generated__/FetchHouseworksCountQuery";

const FETCH_HOUSEWORKS_COUNT_QUERY = gql`
  query FetchHouseworksCountQuery($args: get_houseworks_count_args!) {
    get_houseworks_count(args: $args) {
      date
      count
    }
  }
`;

type Args = {
  memberId: number | null | undefined;
  from: Date;
  to: Date;
};

type Props = {
  houseworksCount: FetchHouseworksCountQuery_get_houseworks_count[];
};

export const useFetchHouseworksCount = ({ memberId, from, to }: Args): Props => {
  const [houseworksCount, setHouseworksCount] = useState<
    FetchHouseworksCountQuery_get_houseworks_count[]
  >([]);
  const [loadHouseworksCount, { loading, called, data }] = useLazyQuery<
    FetchHouseworksCountQuery,
    FetchHouseworksCountQueryVariables
  >(FETCH_HOUSEWORKS_COUNT_QUERY);

  useEffect(() => {
    if (!memberId || called) return;
    loadHouseworksCount({
      variables: {
        args: {
          selected_member_id: memberId,
          from_date: from,
          to_date: to,
        },
      },
    });
  }, [memberId]);

  useEffect(() => {
    if (loading) return;
    setHouseworksCount(data?.get_houseworks_count || []);
  }, [data, loading]);

  return {
    houseworksCount,
  };
};
