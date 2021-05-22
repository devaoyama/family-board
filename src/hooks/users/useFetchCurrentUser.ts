import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client/core";
import {
  FetchCurrentUserQuery,
  FetchCurrentUserQuery_get_current_user
} from "src/hooks/users/__generated__/FetchCurrentUserQuery";

const FETCH_CURRENT_USER_QUERY = gql`
  query FetchCurrentUserQuery {
    get_current_user {
      id
      name
      current_family_id
    }
  }
`;

type Props = {
  user: FetchCurrentUserQuery_get_current_user | undefined;
};

export const useFetchCurrentUser = (): Props => {
  const { data } = useQuery<FetchCurrentUserQuery>(FETCH_CURRENT_USER_QUERY);

  return {
    user: data?.get_current_user[0],
  };
};
