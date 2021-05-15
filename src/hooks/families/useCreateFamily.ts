import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client/core";
import { useCallback } from "react";
import {
  CreateFamilyMutation,
  CreateFamilyMutationVariables,
} from "src/hooks/families/__generated__/CreateFamilyMutation";
import { HEADER_QUERY } from "src/components/header/Header";
import { HeaderQuery } from "src/components/header/__generated__/HeaderQuery";

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
        const headerData = cache.readQuery<HeaderQuery>({ query: HEADER_QUERY });
        if (!headerData) return;
        const newHeaderData: HeaderQuery = {
          get_current_user: [
            {
              ...headerData.get_current_user[0],
              current_family: {
                id: data?.insert_families_one?.id || 0,
                name: data?.insert_families_one?.name || "",
                family_members: [...(data?.insert_families_one?.family_members || [])],
                __typename: "families"
              },
            },
          ],
          families: [
            ...(headerData?.families || []),
            {
              id: data?.insert_families_one?.id || 0,
              name: data?.insert_families_one?.name || "",
              __typename: "families",
            },
          ],
        };
        cache.writeQuery({ query: HEADER_QUERY, data: newHeaderData });
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
