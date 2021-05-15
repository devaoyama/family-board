import { useCallback, useState } from "react";

export type DialogProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useDialog = (): DialogProps => {
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
