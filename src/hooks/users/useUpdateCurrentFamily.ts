import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import {
  UpdateCurrentFamilyMutation,
  UpdateCurrentFamilyMutationVariables,
} from "src/hooks/users/__generated__/UpdateCurrentFamilyMutation";

const UPDATE_CURRENT_FAMILY = gql`
  mutation UpdateCurrentFamilyMutation($id: String!, $familyId: Int!) {
    update_users_by_pk(_set: { current_family_id: $familyId }, pk_columns: { id: $id }) {
      id
      current_family_id
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
  >(UPDATE_CURRENT_FAMILY);

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
