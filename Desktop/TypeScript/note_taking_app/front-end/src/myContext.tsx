import { createContext, Context, useContext } from "react";

interface display {
  added: boolean;
  setAdded: (value: boolean) => void;
}
export const myContext: Context<display> = createContext<display>({
  added: false,
  setAdded: () => {},
});
export const useMyContext = () => useContext(myContext);
