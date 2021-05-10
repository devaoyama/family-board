import React from "react";
import { RequiredLogin } from "src/components/common/RequiredLogin";
import { HomeContainer } from "src/components/home/HomeContainer";

export default function Home() {
  return (
    <RequiredLogin>
      <HomeContainer />
    </RequiredLogin>
  );
}
