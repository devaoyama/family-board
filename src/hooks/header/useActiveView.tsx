import { useCallback, useState } from "react";

type Args<T> = {
  view: T;
};

type ActiveViewProps<T> = {
  activeView: string;
  toggle: (view: T) => void;
};

export const useActiveView = <T extends string>({ view }: Args<T>): ActiveViewProps<T> => {
  const [activeView, setActiveView] = useState(view);

  const toggle = useCallback(<F extends T>(view: F) => {
    setActiveView(view);
  }, []);

  return {
    activeView,
    toggle,
  };
};
