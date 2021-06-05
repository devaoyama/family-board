import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import {
  FetchFamiliesQuery,
  FetchFamiliesQuery_families,
} from "src/hooks/families/__generated__/FetchFamiliesQuery";

const FETCH_FAMILIES_QUERY = gql`
  query FetchFamiliesQuery {
    families {
      id
      name
      invitation_code
      family_members {
        member {
          id
          user_id
          name
        }
      }
    }
  }
`;

type Props = {
  families: FetchFamiliesQuery_families[];
};

export const useFetchFamilies = (): Props => {
  const { data } = useQuery<FetchFamiliesQuery>(FETCH_FAMILIES_QUERY);

  return {
    families: data?.families || [],
  };
};
