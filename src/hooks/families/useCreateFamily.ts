import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import {
  CreateFamilyMutation,
  CreateFamilyMutationVariables,
} from "src/hooks/families/__generated__/CreateFamilyMutation";

const CREATE_FAMILY_MUTATION = gql`
  mutation CreateFamilyMutation($input: families_insert_input!) {
    insert_families_one(object: $input) {
      id
      name
    }
  }
`;

type Args = {
  onCreateFamily: () => void;
  onCreateFamilyError: () => void;
};

type TUseCreateFamily = {
  createFamily: (variables: CreateFamilyMutationVariables) => void;
};

export const useCreateFamily = ({
  onCreateFamily,
  onCreateFamilyError,
}: Args): TUseCreateFamily => {
  const [createFamilyMutation] = useMutation<CreateFamilyMutation, CreateFamilyMutationVariables>(
    CREATE_FAMILY_MUTATION,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            families(existingFamilies = []) {
              const newFamilyRef = cache.writeFragment({
                data: data?.insert_families_one,
                fragment: gql`
                  fragment NewFamily on families {
                    id
                    name
                  }
                `,
              });
              return [...existingFamilies, newFamilyRef];
            },
          },
        });
      },
    },
  );

  const createFamily = useCallback(
    async (variables: CreateFamilyMutationVariables) => {
      await createFamilyMutation({ variables })
        .then(() => {
          onCreateFamily();
        })
        .catch(() => {
          onCreateFamilyError();
        });
    },
    [createFamilyMutation],
  );

  return {
    createFamily,
  };
};
