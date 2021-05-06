import React from "react";
import { MyAppBar } from "src/components/header/MyAppBar";
import { HeaderDrawer } from "src/components/header/HeaderDrawer";
import { useDrawer } from "src/hooks/header/useDrawer";

export const Header: React.FC = () => {
  const drawer = useDrawer();

  return (
    <React.Fragment>
      <MyAppBar onOpenDrawer={drawer.open} />
      <HeaderDrawer isOpen={drawer.isOpen} onClose={drawer.close} />
    </React.Fragment>
  );
};
