import { useCallback, useState } from "react";

export type TooltipProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useTooltip = (): TooltipProps => {
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
