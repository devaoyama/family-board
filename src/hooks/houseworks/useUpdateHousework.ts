import { useCallback } from "react";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import {
  UpdateHouseworkMutation,
  UpdateHouseworkMutationVariables,
} from "src/hooks/houseworks/__generated__/UpdateHouseworkMutation";

const UPDATE_HOUSEWORK_MUTATION = gql`
  mutation UpdateHouseworkMutation(
    $pkColumnsInput: houseworks_pk_columns_input!
    $setInput: houseworks_set_input
  ) {
    update_houseworks_by_pk(pk_columns: $pkColumnsInput, _set: $setInput) {
      id
      title
      description
      status
      point
      housework_members {
        member {
          id
          name
        }
      }
    }
  }
`;

type Args = {
  onUpdateHousework?: () => void;
  onUpdateHouseworkError?: () => void;
};

type Props = {
  updateHousework: (args: UpdateHouseworkArgs) => void;
};

export type UpdateHouseworkArgs = {
  id: number;
  title: string;
  description: string;
  point: number;
};

export const useUpdateHousework = ({ onUpdateHousework, onUpdateHouseworkError }: Args): Props => {
  const [updateHouseworkMutation] = useMutation<
    UpdateHouseworkMutation,
    UpdateHouseworkMutationVariables
  >(UPDATE_HOUSEWORK_MUTATION);

  const updateHousework = useCallback(
    async ({ id, title, description, point }: UpdateHouseworkArgs) => {
      const variables: UpdateHouseworkMutationVariables = {
        pkColumnsInput: {
          id,
        },
        setInput: {
          title,
          description,
          point,
        },
      };
      await updateHouseworkMutation({ variables })
        .then(() => {
          if (!onUpdateHousework) return;
          onUpdateHousework();
        })
        .catch(() => {
          if (!onUpdateHouseworkError) return;
          onUpdateHouseworkError();
        });
    },
    [],
  );

  return {
    updateHousework,
  };
};
