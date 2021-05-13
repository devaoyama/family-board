import { createContext, Dispatch, SetStateAction } from "react";

type CurrentFamilyContextProps = {
  id: number | undefined;
  setId: Dispatch<SetStateAction<number | undefined>>;
};

export const CurrentFamilyContext = createContext<CurrentFamilyContextProps>({
  id: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setId: () => {},
});
