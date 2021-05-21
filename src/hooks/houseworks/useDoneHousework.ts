import { useCallback } from "react";
import { gql } from "@apollo/client/core";
import { useMutation } from "@apollo/client";
import {
  DoneHouseworkMutation,
  DoneHouseworkMutationVariables,
} from "src/hooks/houseworks/__generated__/DoneHouseworkMutation";

const DONE_HOUSEWORK_MUTATION = gql`
  mutation DoneHouseworkMutation(
    $pkColumnsInput: houseworks_pk_columns_input!
    $status: Boolean!
    $houseworkMemberInput: [housework_member_insert_input!]!
  ) {
    update_houseworks_by_pk(pk_columns: $pkColumnsInput, _set: { status: $status }) {
      id
      ...HouseworksFragment
    }
    insert_housework_member(objects: $houseworkMemberInput) {
      affected_rows
    }
  }
  fragment HouseworksFragment on houseworks {
    id
    title
    description
    status
    point
  }
`;

type Args = {
  onDoneHousework?: () => void;
  onDoneHouseworkError?: () => void;
};

type Props = {
  doneHousework: (id: number, status: boolean, memberIds: number[]) => void;
};

export const useDoneHousework = ({ onDoneHousework, onDoneHouseworkError }: Args): Props => {
  const [doneHouseworkMutation] = useMutation<
    DoneHouseworkMutation,
    DoneHouseworkMutationVariables
  >(DONE_HOUSEWORK_MUTATION);

  const doneHousework = useCallback(async (id: number, status: boolean, memberIds: number[]) => {
    const houseworkMemberInput = memberIds.map((memberId) => {
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
  }, []);

  return {
    doneHousework,
  };
};
