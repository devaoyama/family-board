import React, { useCallback } from "react";
import Alert from "@material-ui/lab/Alert";
import { SnackbarProps } from "@material-ui/core";
import { useSnackbarContext } from "src/components/common/SnackbarServiceProvider";

export const useShowErrorSnackbar = (): ((
  message: string,
  snackbarProps: SnackbarProps,
) => void) => {
  const showSnackbar = useSnackbarContext();
  return useCallback(
    (message: string, snackbarProps: Partial<SnackbarProps>) => {
      showSnackbar({
        ...snackbarProps,
        children: <Alert severity="error">{message}</Alert>,
      });
    },
    [showSnackbar],
  );
};
