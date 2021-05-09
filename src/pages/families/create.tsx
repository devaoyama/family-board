import React from "react";
import { Header } from "src/components/header/Header";
import { CreateContainer } from "src/components/families/create/CreateContainer";
import { RequiredLogin } from "src/components/common/RequiredLogin";

export default function create() {
  return (
    <>
      <RequiredLogin>
        <Header />
        <CreateContainer />
      </RequiredLogin>
    </>
  );
}
