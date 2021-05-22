import { useCallback } from "react";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import {
  DoneHouseworkMutation,
  DoneHouseworkMutationVariables,
} from "src/hooks/houseworks/__generated__/DoneHouseworkMutation";
import { HOUSEWORKS_FRAGMENT } from "src/components/home/HouseworkListItem";

const DONE_HOUSEWORK_MUTATION = gql`
  mutation DoneHouseworkMutation(
    $pkColumnsInput: houseworks_pk_columns_input!
    $status: Boolean!
    $houseworkMemberInput: [housework_member_insert_input!]!
    $houseworkMemberBoolExp: housework_member_bool_exp!
  ) {
    update_houseworks_by_pk(pk_columns: $pkColumnsInput, _set: { status: $status }) {
      id
      ...HouseworksFragment
    }
    insert_housework_member(objects: $houseworkMemberInput) {
      returning {
        member {
          id
          name
        }
      }
    }
    delete_housework_member(where: $houseworkMemberBoolExp) {
      returning {
        member {
          id
          name
        }
      }
    }
  }
  ${HOUSEWORKS_FRAGMENT}
`;

type Args = {
  onDoneHousework?: () => void;
  onDoneHouseworkError?: () => void;
};

export type DoneHouseworkArgs = {
  id: number;
  status: boolean;
  addMemberIds: number[];
  removeMemberIds: number[];
};

type Props = {
  doneHousework: (args: DoneHouseworkArgs) => void;
};

export const useDoneHousework = ({ onDoneHousework, onDoneHouseworkError }: Args): Props => {
  const [doneHouseworkMutation] = useMutation<
    DoneHouseworkMutation,
    DoneHouseworkMutationVariables
  >(DONE_HOUSEWORK_MUTATION, {
    update(cache, { data }) {
      const members = data?.update_houseworks_by_pk?.housework_members.filter(
        (houseworkMember) =>
          !data?.delete_housework_member?.returning.find(
            (member) => member.member.id === houseworkMember.member.id,
          ),
      );
      cache.writeFragment({
        id: `houseworks:${data?.update_houseworks_by_pk?.id}`,
        fragment: HOUSEWORKS_FRAGMENT,
        data: {
          ...data,
          housework_members: [
            ...(members || []),
            ...(data?.insert_housework_member?.returning || []),
          ],
        },
      });
    },
  });

  const doneHousework = useCallback(
    async ({ id, status, addMemberIds, removeMemberIds }: DoneHouseworkArgs) => {
      const houseworkMemberInput = addMemberIds.map((memberId) => {
        return {
          housework_id: id,
          member_id: memberId,
        };
      });
      const variables: DoneHouseworkMutationVariables = {
        pkColumnsInput: {
          id,
        },
        status,
        houseworkMemberInput,
        houseworkMemberBoolExp: {
          _and: [
            {
              housework_id: {
                _eq: id,
              },
              member_id: {
                _in: removeMemberIds,
              },
            },
          ],
        },
      };
      await doneHouseworkMutation({ variables })
        .then(() => {
          if (!onDoneHousework) return;
          onDoneHousework();
        })
        .catch(() => {
          if (!onDoneHouseworkError) return;
          onDoneHouseworkError();
        });
    },
    [],
  );

  return {
    doneHousework,
  };
};
