import React, { createContext, useContext, useState } from "react";
import Snackbar, { SnackbarProps } from "@material-ui/core/Snackbar";

type SnackbarServiceContextProps = {
  show: (snackbarProps: SnackbarProps) => void;
};

const SnackbarServiceContext = createContext<SnackbarServiceContextProps>({
  show: () => null,
});

type SnackbarServiceProviderProps = {
  defaultSnackbarProps: SnackbarProps;
};

export const SnackbarServiceProvider: React.FC<SnackbarServiceProviderProps> = ({
  children,
  defaultSnackbarProps,
}) => {
  const [snackbarProps, setSnackbarProps] = useState<SnackbarProps>({
    ...defaultSnackbarProps,
    onClose: () => setSnackbarProps((v) => ({ ...v, open: false })),
  });

  const show = (args: Omit<SnackbarProps, "open">) => {
    setSnackbarProps({
      ...defaultSnackbarProps,
      ...args,
      open: true,
      onClose: snackbarProps.onClose,
    });
  };

  return (
    <SnackbarServiceContext.Provider value={{ show }}>
      {children}
      <Snackbar {...snackbarProps} />
    </SnackbarServiceContext.Provider>
  );
};

export const useSnackbarContext = (): ((snackbarProps: SnackbarProps) => void) => {
  const { show } = useContext(SnackbarServiceContext);
  return show;
};
