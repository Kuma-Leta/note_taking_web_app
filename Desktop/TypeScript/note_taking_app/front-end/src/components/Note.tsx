import AddNotes from "./AddNotes";
import { useMyContext } from "../myContext";
import PreviousNotes from "./PreviousNotes";
import React from "react";
import "../styles/notes.css";
const Note: React.FC = () => {
  const { added, setNoteAdded } = useMyContext();

  return (
    <>
      {added ? (
        <AddNotes />
      ) : (
        <div>
          <PreviousNotes />
          <div className="btnContainer">
            <button className="addNoteBtn" onClick={() => setNoteAdded(true)}>
              AddNotes
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Note;
