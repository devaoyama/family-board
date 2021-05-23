import React from "react";
import { CreateContainer } from "src/components/families/create/CreateContainer";
import { RequiredLogin } from "src/components/common/RequiredLogin";

export default function create() {
  return (
    <>
      <RequiredLogin>
        <CreateContainer />
      </RequiredLogin>
    </>
  );
}
