import AddNotes from "./AddNotes";
import { useMyContext } from "../myContext";
import PreviousNotes from "./PreviousNotes";
import React from "react";
const Note: React.FC = () => {
  const { added } = useMyContext();

  return <div>{added ? <AddNotes /> : <PreviousNotes />}</div>;
};
export default Note;
