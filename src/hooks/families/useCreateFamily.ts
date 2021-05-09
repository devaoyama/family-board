import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";

const CREATE_FAMILY_MUTATION = gql`
  mutation CreateFamilyMutation($input: families_insert_input!) {
    insert_families_one(object: $input) {
      id
    }
  }
`;

type TFamiliesInsertInput = {
  name: string;
};

type Args = {
  onCreateFamily: () => void;
  onCreateFamilyError: () => void;
};

type TUseCreateFamily = {
  createFamily: (input: TFamiliesInsertInput) => void;
};

export const useCreateFamily = ({
  onCreateFamily,
  onCreateFamilyError,
}: Args): TUseCreateFamily => {
  const [createFamilyMutation] = useMutation(CREATE_FAMILY_MUTATION);

  const createFamily = useCallback(
    async (input: TFamiliesInsertInput) => {
      const variables = {
        input,
      };
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
