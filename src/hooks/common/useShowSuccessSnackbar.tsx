import React, { useCallback } from "react";
import Alert from "@material-ui/lab/Alert";
import { SnackbarProps } from "@material-ui/core";
import { useSnackbarContext } from "src/components/common/SnackbarServiceProvider";

export const useShowSuccessSnackbar = (): ((
  message: string,
  showSnackbarProps: SnackbarProps,
) => void) => {
  const showSnackbar = useSnackbarContext();
  return useCallback(
    (message: string, showSnackbarProps: Partial<SnackbarProps>) => {
      showSnackbar({
        ...showSnackbarProps,
        children: <Alert severity="success">{message}</Alert>,
      });
    },
    [showSnackbar],
  );
};
