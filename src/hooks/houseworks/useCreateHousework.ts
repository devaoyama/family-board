import { useCallback } from "react";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import {
  CreateHouseworkMutation,
  CreateHouseworkMutationVariables,
} from "src/hooks/houseworks/__generated__/CreateHouseworkMutation";
import { HOUSEWORKS_FRAGMENT } from "src/components/home/HouseworkListItem";

const CREATE_HOUSEWORK_MUTATION = gql`
  mutation CreateHouseworkMutation($input: houseworks_insert_input!) {
    insert_houseworks_one(object: $input) {
      id
      ...HouseworksFragment
    }
  }
  ${HOUSEWORKS_FRAGMENT}
`;

type Args = {
  onCreateHousework?: () => void;
  onCreateHouseworkError?: () => void;
};

type Props = {
  createHousework: (
    currentFamilyId: number | undefined,
    title: string,
    description: string,
    point: number,
  ) => void;
};

export const useCreateHousework = ({ onCreateHousework, onCreateHouseworkError }: Args): Props => {
  const [createHouseworkMutation] = useMutation<
    CreateHouseworkMutation,
    CreateHouseworkMutationVariables
  >(CREATE_HOUSEWORK_MUTATION, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          houseworks(existingHouseworks = []) {
            const newHouseworkRef = cache.writeFragment({
              data: data?.insert_houseworks_one,
              fragment: HOUSEWORKS_FRAGMENT,
            });
            return [...existingHouseworks, newHouseworkRef];
          },
        },
      });
    },
  });

  const createHousework = useCallback(
    async (currentFamilyId, title: string, description: string, point: number) => {
      const variables: CreateHouseworkMutationVariables = {
        input: {
          title,
          description,
          point,
          family_id: currentFamilyId,
        },
      };
      await createHouseworkMutation({ variables })
        .then(() => {
          if (!onCreateHousework) return;
          onCreateHousework();
        })
        .catch(() => {
          if (!onCreateHouseworkError) return;
          onCreateHouseworkError();
        });
    },
    [],
  );

  return {
    createHousework,
  };
};
