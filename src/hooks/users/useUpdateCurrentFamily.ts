import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import {
  UpdateCurrentFamilyMutation,
  UpdateCurrentFamilyMutationVariables,
} from "src/hooks/users/__generated__/UpdateCurrentFamilyMutation";
import { HeaderQuery } from "src/components/header/__generated__/HeaderQuery";
import { HEADER_QUERY } from "src/components/header/Header";

const UPDATE_CURRENT_FAMILY = gql`
  mutation UpdateCurrentFamilyMutation($id: String!, $familyId: Int!) {
    update_users_by_pk(_set: { current_family_id: $familyId }, pk_columns: { id: $id }) {
      id
      current_family {
        id
        name
        family_members {
          member {
            id
            name
            user_id
          }
        }
      }
    }
  }
`;

type Args = {
  onUpdateCurrentFamily?: () => void;
  onUpdateCurrentFamilyError?: () => void;
};

type UpdateCurrentFamilyProps = {
  updateCurrentFamily: (userId: string, familyId: number) => Promise<void>;
};

export const useUpdateCurrentFamily = ({
  onUpdateCurrentFamily,
  onUpdateCurrentFamilyError,
}: Args): UpdateCurrentFamilyProps => {
  const [updateCurrentFamilyMutation] = useMutation<
    UpdateCurrentFamilyMutation | UpdateCurrentFamilyMutationVariables
  >(UPDATE_CURRENT_FAMILY, {
    update(cache, { data }) {
      const headerData = cache.readQuery<HeaderQuery>({ query: HEADER_QUERY });
      if (!headerData || !data) return;
      const newHeaderData: HeaderQuery = {
        ...headerData,
        get_current_user: [
          {
            ...headerData.get_current_user[0],
            current_family: {
              id: data.update_users_by_pk.current_family.id,
              name: data.update_users_by_pk.current_family.name,
              family_members: [...data.update_users_by_pk.current_family.family_members],
              __typename: "families",
            },
          },
        ],
        families: [...(headerData?.families || [])],
      };
      cache.writeQuery({ query: HEADER_QUERY, data: newHeaderData });
    },
  });

  const updateCurrentFamily = useCallback(
    async (userId: string, familyId: number) => {
      const variables: UpdateCurrentFamilyMutationVariables = {
        id: userId,
        familyId,
      };
      await updateCurrentFamilyMutation({ variables })
        .then(() => {
          if (onUpdateCurrentFamily === undefined) return;
          onUpdateCurrentFamily();
        })
        .catch(() => {
          if (onUpdateCurrentFamilyError === undefined) return;
          onUpdateCurrentFamilyError();
        });
    },
    [updateCurrentFamilyMutation],
  );

  return {
    updateCurrentFamily: updateCurrentFamily,
  };
};
