import React from "react";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { CreateMemberFormContainer } from "src/components/header/CreateMemberFormContainer";

type Props = {
  onClickBackButton: () => void;
};

export const AddMemberContainer: React.FC<Props> = ({ onClickBackButton }) => {
  return (
    <>
      <IconButton aria-label="back" onClick={onClickBackButton}>
        <BackspaceIcon fontSize={"large"} />
      </IconButton>
      <Container>
        <CreateMemberFormContainer onSuccessAddMember={onClickBackButton} />
      </Container>
    </>
  );
};
