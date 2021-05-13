import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import {
  CreateMemberMutation,
  CreateMemberMutationVariables,
} from "src/hooks/members/__generated__/CreateMemberMutation";
import { MEMBERS_FRAGMENT } from "src/components/header/MemberListItem";

const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMemberMutation($input: members_insert_input!) {
    insert_members_one(object: $input) {
      id
      name
      user_id
    }
  }
`;

const GET_CURRENT_USER_QUERY = gql`
  query NewGetCurrentUserQuery {
    get_current_user {
      id
      name
      current_family {
        id
        name
        family_members {
          member {
            id
            user_id
            ...MemberFragment
          }
        }
      }
    }
  }
  ${MEMBERS_FRAGMENT}
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
        const currentUser: any = cache.readQuery({ query: GET_CURRENT_USER_QUERY });
        const newGetCurrentUser = {
          ...currentUser.get_current_user[0],
          current_family: {
            ...currentUser.get_current_user[0].current_family,
            family_members: [
              ...currentUser.get_current_user[0].current_family.family_members,
              {
                member: data?.insert_members_one,
                __typename: "family_member",
              },
            ],
          },
        };
        cache.writeQuery({
          query: GET_CURRENT_USER_QUERY,
          data: { get_current_user: [newGetCurrentUser] },
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
