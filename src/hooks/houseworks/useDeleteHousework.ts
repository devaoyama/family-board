import { useCallback } from "react";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import {
  DeleteHouseworkMutation,
  DeleteHouseworkMutationVariables,
} from "src/hooks/houseworks/__generated__/DeleteHouseworkMutation";
import { HOUSEWORKS_FRAGMENT } from "src/components/home/HouseworkListItem";

const DELETE_HOUSEWORK_MUTATION = gql`
  mutation DeleteHouseworkMutation($id: Int!) {
    delete_houseworks_by_pk(id: $id) {
      id
      ...HouseworksFragment
    }
  }
  ${HOUSEWORKS_FRAGMENT}
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
        id: cache.identify({ ...data?.delete_houseworks_by_pk }),
        fields: {
          houseworks(_, { DELETE }) {
            return DELETE;
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
