import React from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { CreateMemberFormContainer } from "src/components/header/CreateMemberFormContainer";
import { FetchFamiliesQuery_families } from "src/hooks/families/__generated__/FetchFamiliesQuery";

type Props = {
  onClickBackButton: () => void;
  currentFamily?: FetchFamiliesQuery_families;
};

export const AddMemberContainer: React.FC<Props> = ({ onClickBackButton, currentFamily }) => {
  return (
    <>
      <IconButton aria-label="back" onClick={onClickBackButton}>
        <BackspaceIcon fontSize={"large"} />
      </IconButton>
      <Container>
        <CreateMemberFormContainer
          currentFamily={currentFamily}
          onSuccessAddMember={onClickBackButton}
        />
      </Container>
    </>
  );
};
