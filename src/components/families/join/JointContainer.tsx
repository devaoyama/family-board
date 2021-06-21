import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Container from "@material-ui/core/Container";
import { FormContainer } from "src/components/families/join/FormContainer";
import { Header } from "src/components/header/Header";
import { useFetchFamilies } from "src/hooks/families/useFetchFamilies";
import { useFetchFamilyIdByInvitations } from "src/hooks/families/useFetchFamilyIdByInvitations";
import { useFetchCurrentUser } from "src/hooks/users/useFetchCurrentUser";
import { useJoinFamily } from "src/hooks/families/useJoinFamily";
import { useShowErrorSnackbar } from "src/hooks/common/useShowErrorSnackbar";
import { useUpdateCurrentFamily } from "src/hooks/users/useUpdateCurrentFamily";
import { useShowSuccessSnackbar } from "src/hooks/common/useShowSuccessSnackbar";

export const JoinContainer: React.FC = () => {
  const router = useRouter();
  const showSuccessSnackbar = useShowSuccessSnackbar();
  const showErrorSnackbar = useShowErrorSnackbar();
  const { user } = useFetchCurrentUser();
  const { families } = useFetchFamilies();
  const { fetchFamily } = useFetchFamilyIdByInvitations();
  const { updateCurrentFamily } = useUpdateCurrentFamily({});
  const { joinFamily } = useJoinFamily({
    currentUserId: user?.id || "",
    onJoinFamily: async (familyId) => {
      await updateCurrentFamily(user?.id || "", familyId || 0);
      await router.push("/");
      onJoinSuccess();
    },
    onJoinFamilyError: () => {
      onJoinError();
    },
  });

  const onClickJoinFamily = useCallback(async (data) => {
    const matches = data.invitationCode.match("(\\d+)-(.+)");
    if (matches) {
      const invitations = await fetchFamily({ id: Number(matches[1]), invitationCode: matches[2] });
      if (invitations !== undefined) {
        await joinFamily({ familyId: invitations.family_id, name: data.nickname });
        return;
      }
    }
    onJoinError();
  }, []);

  const onJoinSuccess = useCallback(() => {
    showSuccessSnackbar("ファミリーに参加しました。", {});
  }, []);

  const onJoinError = useCallback(() => {
    showErrorSnackbar("参加できませんでした。招待コードを確認し、もう一度試してみてください。", {});
  }, []);

  return (
    <React.Fragment>
      <Header families={families} />
      <Container>
        <FormContainer onClickJoinFamily={onClickJoinFamily} />
      </Container>
    </React.Fragment>
  );
};
