import React from "react";
import { Header } from "src/components/header/Header";
import { GettingStarted } from "src/components/home/GettingStarted";

export const HomeContainer: React.FC = () => {
  return (
    <>
      <Header />
      {/* todo とりあえずこのコンポーネント */}
      <GettingStarted />
    </>
  );
};
