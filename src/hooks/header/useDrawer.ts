import { useCallback, useState } from "react";

export type DrawerProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useDrawer = (): DrawerProps => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    open,
    close,
  };
};
