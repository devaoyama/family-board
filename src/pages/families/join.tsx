import React from "react";
import { RequiredLogin } from "src/components/common/RequiredLogin";

export default function join() {
  return (
    <>
      <RequiredLogin>
        <h2>参加する</h2>
      </RequiredLogin>
    </>
  );
}
