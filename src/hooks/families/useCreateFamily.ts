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

const NEW_FAMILY_FRAGMENT = gql`
  fragment NewFamilyFragment on families {
    id
    name
  }
`;

type Args = {
  onCreateFamily: (familyId: number | undefined) => void;
  onCreateFamilyError: () => void;
};

type UserCreateFamilyProps = {
  createFamily: (name: string, nickname: string, currentUserId: string) => void;
};

export const useCreateFamily = ({
  onCreateFamily,
  onCreateFamilyError,
}: Args): UserCreateFamilyProps => {
  const [createFamilyMutation] = useMutation<CreateFamilyMutation, CreateFamilyMutationVariables>(
    CREATE_FAMILY_MUTATION,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            families(existingFamilies = []) {
              const newFamilyRef = cache.writeFragment({
                data: data?.insert_families_one,
                fragment: NEW_FAMILY_FRAGMENT,
              });
              return [...existingFamilies, newFamilyRef];
            },
          },
        });
      },
    },
  );

  const createFamily = useCallback(
    async (name: string, nickname: string, currentUserId: string) => {
      const variables: CreateFamilyMutationVariables = {
        input: {
          name: name,
          family_members: {
            data: [
              {
                member: {
                  data: {
                    name: nickname,
                    user_id: currentUserId,
                  },
                },
              },
            ],
          },
        },
      };
      await createFamilyMutation({ variables })
        .then((res) => {
          onCreateFamily(res.data?.insert_families_one?.id);
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
