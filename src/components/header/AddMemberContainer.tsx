import React, { useCallback } from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { CreateMemberFormContainer } from "src/components/header/CreateMemberFormContainer";
import { FetchFamiliesQuery_families } from "src/hooks/families/__generated__/FetchFamiliesQuery";
import { useCreateMember } from "src/hooks/members/useCreateMember";

type Props = {
  onClickBackButton: () => void;
  currentFamily?: FetchFamiliesQuery_families;
};

export const AddMemberContainer: React.FC<Props> = ({ onClickBackButton, currentFamily }) => {
  const { createMember } = useCreateMember({
    currentFamilyId: currentFamily?.id || 0,
    onCreateMember: () => {
      onClickBackButton();
    },
    onCreateMemberError: () => {
      // todo エラーToastを表示
    },
  });

  const onClickCreateMember = useCallback(
    async (data) => {
      if (currentFamily?.id) {
        await createMember({ name: data.nickname });
      }
    },
    [currentFamily],
  );

  return (
    <>
      <IconButton aria-label="back" onClick={onClickBackButton}>
        <BackspaceIcon fontSize={"large"} />
      </IconButton>
      <Container>
        <CreateMemberFormContainer onClickCreateMember={onClickCreateMember} />
      </Container>
    </>
  );
};
