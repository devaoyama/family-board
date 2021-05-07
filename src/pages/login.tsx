import React from "react";
import { LoginContainer } from "src/components/login/LoginContainer";
import { RequiredNotLogin } from "src/components/common/RequiredNotLogin";

export default function login() {
  return (
    <RequiredNotLogin>
      <LoginContainer />
    </RequiredNotLogin>
  );
}
