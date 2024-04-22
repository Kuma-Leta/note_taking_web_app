import AddNotes from "./AddNotes";
import PreviousNotes from "./PreviousNotes";
import React, { useState } from "react";
const Note: React.FC = () => {
  const [noteAdded, setNoteAdded] = useState(true);
  const updateNoteStatus = (added: boolean) => {
    setNoteAdded(added);
  };
  return (
    <div>
      {noteAdded ? (
        <PreviousNotes />
      ) : (
        <AddNotes updateNote={updateNoteStatus} />
      )}
    </div>
  );
};
export default Note;
