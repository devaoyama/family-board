import React from "react";
import Drawer from "@material-ui/core/Drawer";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const HeaderDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Drawer anchor={"left"} open={isOpen} onClose={onClose}>
      リスト
    </Drawer>
  );
};
