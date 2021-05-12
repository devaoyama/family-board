import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import {
  CreateMemberMutation,
  CreateMemberMutationVariables,
} from "src/hooks/members/__generated__/CreateMemberMutation";

const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMemberMutation($input: members_insert_input!) {
    insert_members_one(object: $input) {
      id
      name
    }
  }
`;

const NEW_MEMBER_FRAGMENT = gql`
  fragment NewMemberFragment on members {
    id
    name
  }
`;

type Args = {
  onCreateMember: () => void;
  onCreateMemberError: () => void;
};

type CreateMemberArgs = {
  name: string;
  currentFamilyId: number;
};

type CreateMemberProps = {
  createMember: ({ name, currentFamilyId }: CreateMemberArgs) => void;
};

export const useCreateMember = ({
  onCreateMember,
  onCreateMemberError,
}: Args): CreateMemberProps => {
  const [createMemberMutation] = useMutation<CreateMemberMutation, CreateMemberMutationVariables>(
    CREATE_MEMBER_MUTATION,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            members(existingMembers = []) {
              const newMemberRef = cache.writeFragment({
                data: data?.insert_members_one,
                fragment: NEW_MEMBER_FRAGMENT,
              });
              return [...existingMembers, newMemberRef];
            },
          },
        });
      },
    },
  );

  const createMember = useCallback(
    async ({ name, currentFamilyId }) => {
      const variables: CreateMemberMutationVariables = {
        input: {
          name,
          family_members: {
            data: [
              {
                family_id: currentFamilyId,
              },
            ],
          },
        },
      };
      await createMemberMutation({ variables })
        .then(() => {
          onCreateMember();
        })
        .catch(() => {
          onCreateMemberError();
        });
    },
    [createMemberMutation],
  );

  return {
    createMember,
  };
};
