import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/previousNotes.css";

// import AddNotes from "./AddNotes";
import { Link } from "react-router-dom";
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
    <div className="container">
      <h1 className="wellcome">WELLCOME TO HWJC NOTE TAKING WEB APP</h1>
      <div className="notes">
        {notes.map((note, index) => (
          <button className="eachNote" key={index}>
            <h2 className="title">{note.title}</h2>
            <p>{note.content}</p>
          </button>
        ))}
      </div>
      <Link to="/addNotes">Add Notes</Link>
    </div>
  );
};
export default PreviousNotes;
