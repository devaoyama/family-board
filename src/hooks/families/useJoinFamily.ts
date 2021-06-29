import { useCallback } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import {
  JoinFamilyMutation,
  JoinFamilyMutationVariables,
} from "src/hooks/families/__generated__/JoinFamilyMutation";
import { NEW_FAMILY_FRAGMENT } from "src/hooks/families/useCreateFamily";

const JOIN_FAMILY_MUTATION = gql`
  mutation JoinFamilyMutation($input: members_insert_input!) {
    insert_members_one(object: $input) {
      family {
        id
        name
        members {
          id
          name
          user_id
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
  onJoinFamily?: (familyId: number) => void;
  onJoinFamilyError?: () => void;
};

type Props = {
  joinFamily: (args: JoinFamilyArgs) => void;
};

type JoinFamilyArgs = {
  familyId: number;
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
                data: data?.insert_members_one?.family,
                fragment: NEW_FAMILY_FRAGMENT,
              });
              return [...existingFamilyRefs, newFamilyRef];
            },
          },
        });
      },
    },
  );

  const joinFamily = useCallback(async ({ familyId, name }: JoinFamilyArgs) => {
    const variables: JoinFamilyMutationVariables = {
      input: {
        family_id: familyId,
        user_id: currentUserId,
        name,
      },
    };
    await joinFamilyMutation({ variables })
      .then(() => {
        if (!onJoinFamily) return;
        onJoinFamily(familyId);
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
