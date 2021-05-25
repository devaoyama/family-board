import { createContext } from "react";

type ToastServiceContextProps = {
  isVisible: boolean;
};

const defaultProps: ToastServiceContextProps = {
  isVisible: true,
};

const ToastServiceContext = createContext<ToastServiceContextProps>(defaultProps);
