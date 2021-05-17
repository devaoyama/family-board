import { useCallback } from "react";
import { gql, Reference, StoreObject } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import {
  DeleteHouseworkMutation,
  DeleteHouseworkMutationVariables,
} from "src/hooks/houseworks/__generated__/DeleteHouseworkMutation";

const DELETE_HOUSEWORK_MUTATION = gql`
  mutation DeleteHouseworkMutation($id: Int!) {
    delete_houseworks_by_pk(id: $id) {
      id
    }
  }
`;

type Args = {
  onDeleteHousework?: () => void;
  onDeleteHouseworkError?: () => void;
};

type Props = {
  deleteHousework: (id: number) => void;
};

export const useDeleteHousework = ({ onDeleteHousework, onDeleteHouseworkError }: Args): Props => {
  const [deleteHouseworkMutation] = useMutation<
    DeleteHouseworkMutation,
    DeleteHouseworkMutationVariables
  >(DELETE_HOUSEWORK_MUTATION, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          houseworks(existingHouseworksRefs = [], { readField }) {
            return existingHouseworksRefs.filter(
              (houseworkRef: StoreObject | Reference | undefined) => {
                return data?.delete_houseworks_by_pk?.id !== readField("id", houseworkRef);
              },
            );
          },
        },
      });
    },
  });

  const deleteHousework = useCallback(async (id: number) => {
    const variables: DeleteHouseworkMutationVariables = {
      id: id,
    };
    await deleteHouseworkMutation({ variables })
      .then(() => {
        if (!onDeleteHousework) return;
        onDeleteHousework();
      })
      .catch(() => {
        if (!onDeleteHouseworkError) return;
        onDeleteHouseworkError();
      });
  }, []);

  return {
    deleteHousework,
  };
};
