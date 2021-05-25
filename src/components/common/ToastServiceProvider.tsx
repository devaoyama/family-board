import React, { createContext, useState } from "react";
import Snackbar, { SnackbarProps } from "@material-ui/core/Snackbar";

type ToastServiceContextProps = {
  show: (snackbarProps: SnackbarProps) => void;
};

const ToastServiceContext = createContext<ToastServiceContextProps>({
  show: () => null,
});

type ToastServiceProviderProps = {
  defaultSnackbarProps: SnackbarProps;
};

export const ToastServiceProvider: React.FC<ToastServiceProviderProps> = ({
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
    <ToastServiceContext.Provider value={{ show }}>
      {children}
      <Snackbar {...snackbarProps} />
    </ToastServiceContext.Provider>
  );
};
