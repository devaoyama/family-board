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
      user_id
    }
  }
`;

const UPDATE_FAMILY_FRAGMENT = gql`
  fragment UpdateFamilyFragment on families {
    id
    name
    family_members {
      member {
        id
        user_id
        name
      }
    }
  }
`;

type Args = {
  currentFamilyId: number;
  onCreateMember: () => void;
  onCreateMemberError: () => void;
};

type CreateMemberArgs = {
  name: string;
};

type CreateMemberProps = {
  createMember: ({ name }: CreateMemberArgs) => void;
};

export const useCreateMember = ({
  currentFamilyId,
  onCreateMember,
  onCreateMemberError,
}: Args): CreateMemberProps => {
  const [createMemberMutation] = useMutation<CreateMemberMutation, CreateMemberMutationVariables>(
    CREATE_MEMBER_MUTATION,
    {
      update(cache, { data }) {
        const family = cache.readFragment({
          id: `families:${currentFamilyId}`,
          fragment: UPDATE_FAMILY_FRAGMENT,
        });
        cache.writeFragment({
          id: `families:${currentFamilyId}`,
          fragment: UPDATE_FAMILY_FRAGMENT,
          data: {
            ...family,
            family_members: [
              ...family.family_members,
              {
                member: data?.insert_members_one,
                __typename: "family_member",
              },
            ],
          },
        });
      },
    },
  );

  const createMember = useCallback(
    async ({ name }) => {
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
