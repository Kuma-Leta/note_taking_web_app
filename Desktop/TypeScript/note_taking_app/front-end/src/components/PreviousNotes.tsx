import React, { useEffect, useState } from "react";
import axios from "axios";
interface Note {
  title: string;
  content: string;
}
const PreviousNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    async function getAvailableNotes() {
      try {
        const result = await axios.get("http://localhost:5000/getNotes");
        setNotes(result.data.NoteResult);
        console.log(result.data.NoteResult);
      } catch (error: any) {
        console.log(error);
      }
    }
    getAvailableNotes();
  }, []);

  return (
    <>
      <h1>WELLCOME TO HWJC NOTE TAKING WEB APP</h1>
      {notes.map((note, index) => (
        <div key={index}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </>
  );
};
export default PreviousNotes;
