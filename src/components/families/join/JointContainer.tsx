import React, { useCallback } from "react";
import Container from "@material-ui/core/Container";
import { FormContainer } from "src/components/families/join/FormContainer";
import { Header } from "src/components/header/Header";
import { useFetchFamilies } from "src/hooks/families/useFetchFamilies";

export const JoinContainer: React.FC = () => {
  const { families } = useFetchFamilies();

  const onClickJoinFamily = useCallback(async (data) => {
    console.log(data);
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
