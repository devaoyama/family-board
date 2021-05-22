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
      family_members {
        member {
          id
          name
          user_id
        }
      }
    }
  }
`;

const NEW_FAMILY_FRAGMENT = gql`
  fragment NewFamilyFragment on families {
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
`;

type Args = {
  currentUserId: string;
  onCreateFamily: (familyId: number | undefined) => void;
  onCreateFamilyError: () => void;
};

type UserCreateFamilyProps = {
  createFamily: (args: CreateFamilyArgs) => void;
};

type CreateFamilyArgs = {
  name: string;
  nickname: string;
};

export const useCreateFamily = ({
  currentUserId,
  onCreateFamily,
  onCreateFamilyError,
}: Args): UserCreateFamilyProps => {
  const [createFamilyMutation] = useMutation<CreateFamilyMutation, CreateFamilyMutationVariables>(
    CREATE_FAMILY_MUTATION,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            families(existingFamilyRefs = []) {
              const newFamilyRef = cache.writeFragment({
                data: data?.insert_families_one,
                fragment: NEW_FAMILY_FRAGMENT,
              });
              return [...existingFamilyRefs, newFamilyRef];
            },
          },
        });
      },
    },
  );

  const createFamily = useCallback(
    async ({ name, nickname }: CreateFamilyArgs) => {
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
