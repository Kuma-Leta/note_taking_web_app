import { createContext, useContext, useState, ReactNode } from "react";
interface NoteToBeAdded {
  added: boolean;
  setNoteAdded: (value: boolean) => void;
  userId: string;
  setUserId: (value: string) => void;
}
interface NoteProviderProps {
  children: ReactNode;
}
const myContext = createContext<NoteToBeAdded | undefined>(undefined);
export const useMyContext = () => {
  const context = useContext(myContext);
  if (!context) {
    throw new Error("useMyContext must be used with in provider component");
  }
  return context;
};
export const NoteProvider: React.FC<NoteProviderProps> = ({ children }) => {
  const [added, setNoteAdded] = useState(false);
  const [userId, setUserId] = useState("");
  return (
    <myContext.Provider value={{ added, setNoteAdded, userId, setUserId }}>
      {children}
    </myContext.Provider>
  );
};
