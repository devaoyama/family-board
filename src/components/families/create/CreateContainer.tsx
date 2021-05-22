import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import { FormContainer } from "src/components/families/create/FormContainer";
import { Header } from "src/components/header/Header";
import { useFetchFamilies } from "src/hooks/families/useFetchFamilies";
import { useFetchCurrentUser } from "src/hooks/users/useFetchCurrentUser";
import { useUpdateCurrentFamily } from "src/hooks/users/useUpdateCurrentFamily";
import { useCreateFamily } from "src/hooks/families/useCreateFamily";

export const CreateContainer: React.FC = () => {
  const router = useRouter();
  const { user } = useFetchCurrentUser();
  const { families } = useFetchFamilies();
  const { updateCurrentFamily } = useUpdateCurrentFamily({});
  const { createFamily } = useCreateFamily({
    currentUserId: user?.id || "",
    onCreateFamily: async (familyId) => {
      await updateCurrentFamily(user?.id || "", familyId || 0);
      router.push("/");
    },
    onCreateFamilyError: () => {
      // todo エラーToastを表示
    },
  });

  const onClickCreateFamily = useCallback(async (data) => {
    await createFamily({ name: data.name, nickname: data.nickname });
  }, []);

  return (
    <React.Fragment>
      <Header families={families} />
      <Container>
        <FormContainer onClickCreateFamily={onClickCreateFamily} />
      </Container>
    </React.Fragment>
  );
};
