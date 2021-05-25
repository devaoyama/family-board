import React, { createContext, useState } from "react";
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

  const show = (props: Omit<SnackbarProps, "open">) => {
    setSnackbarProps({
      ...props,
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
