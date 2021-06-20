import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import {
  JoinFamilyMutation,
  JoinFamilyMutationVariables,
} from "src/hooks/families/__generated__/JoinFamilyMutation";
import { NEW_FAMILY_FRAGMENT } from "src/hooks/families/useCreateFamily";

const JOIN_FAMILY_MUTATION = gql`
  mutation JoinFamilyMutation($input: family_member_insert_input!) {
    insert_family_member_one(object: $input) {
      family {
        id
        name
        family_members {
          member {
            id
            name
            user_id
          }
        }
        invitations {
          id
          code
        }
      }
    }
  }
`;

type Args = {
  currentUserId: string;
  onJoinFamily?: () => void;
  onJoinFamilyError?: () => void;
};

type Props = {
  joinFamily: (args: JoinFamilyArgs) => void;
};

type JoinFamilyArgs = {
  family_id: number;
  name: string;
};

export const useJoinFamily = ({ currentUserId, onJoinFamily, onJoinFamilyError }: Args): Props => {
  const [joinFamilyMutation] = useMutation<JoinFamilyMutation, JoinFamilyMutationVariables>(
    JOIN_FAMILY_MUTATION,
    {
      update(cache, { data }) {
        cache.modify({
          fields: {
            families(existingFamilyRefs = []) {
              const newFamilyRef = cache.writeFragment({
                data: data?.insert_family_member_one?.family,
                fragment: NEW_FAMILY_FRAGMENT,
              });
              return [...existingFamilyRefs, newFamilyRef];
            },
          },
        });
      },
    },
  );

  const joinFamily = useCallback(async ({ family_id, name }: JoinFamilyArgs) => {
    const variables: JoinFamilyMutationVariables = {
      input: {
        family_id,
        member: {
          data: {
            name,
            user_id: currentUserId,
          },
        },
      },
    };
    await joinFamilyMutation({ variables })
      .then(() => {
        if (!onJoinFamily) return;
        onJoinFamily();
      })
      .catch(() => {
        if (!onJoinFamilyError) return;
        onJoinFamilyError();
      });
  }, []);

  return {
    joinFamily,
  };
};
