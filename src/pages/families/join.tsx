import React from "react";
import { RequiredLogin } from "src/components/common/RequiredLogin";
import { JoinContainer } from "src/components/families/join/JointContainer";

export default function join() {
  return (
    <>
      <RequiredLogin>
        <JoinContainer />
      </RequiredLogin>
    </>
  );
}
