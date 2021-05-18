import { useCallback } from "react";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import {
  UpdateHouseworkMutation,
  UpdateHouseworkMutationVariables,
} from "src/hooks/houseworks/__generated__/UpdateHouseworkMutation";

// なぜかHouseworkListItemコンポーネントからFragmentをインポートできなかった
const UPDATE_HOUSEWORK_MUTATION = gql`
  mutation UpdateHouseworkMutation(
    $pkColumnsInput: houseworks_pk_columns_input!
    $setInput: houseworks_set_input
  ) {
    update_houseworks_by_pk(pk_columns: $pkColumnsInput, _set: $setInput) {
      id
      ...HouseworksFragment
    }
  }
  fragment HouseworksFragment on houseworks {
    id
    title
    description
    status
    point
  }
`;

type Args = {
  onUpdateHousework?: () => void;
  onUpdateHouseworkError?: () => void;
};

type Props = {
  updateHousework: (id: number, title: string, description: string, point: number) => void;
};

export const useUpdateHousework = ({ onUpdateHousework, onUpdateHouseworkError }: Args): Props => {
  const [updateHouseworkMutation] = useMutation<
    UpdateHouseworkMutation,
    UpdateHouseworkMutationVariables
  >(UPDATE_HOUSEWORK_MUTATION);

  const updateHousework = useCallback(
    async (id: number, title: string, description: string, point: number) => {
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
