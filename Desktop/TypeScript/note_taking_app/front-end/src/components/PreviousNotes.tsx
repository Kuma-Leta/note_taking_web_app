import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/previousNotes.css";
import { useMyContext } from "../myContext";
// import AddNotes from "./AddNotes";
import { Link } from "react-router-dom";
// interface Note {
//   title: string;
//   content: string;
// }
const PreviousNotes: React.FC = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { userId, added } = useMyContext();
  useEffect(() => {
    async function getAvailableNotes() {
      try {
        console.log(added);
        const result = await axios.get(`http://localhost:5001/getNotes?`, {
          params: { userId },
        });
        setNotes(result.data.NoteResult);
        // console.log(result.data.NoteResult);
      } catch (error: any) {
        console.log(error);
      }
    }
    getAvailableNotes();
  }, []);
  const handleSearchingNotes = async () => {
    // event.preventDefault()
    // const filteredNotes = await notes.filter((eachNote) => {
    //   eachNote.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //     eachNote.content.toLowerCase().includes(searchQuery.toLowerCase());
    // });
    const filteredNotes = await axios.get("http://localhost:5001/searchNotes", {
      params: { searchQuery },
    });
    console.log(filteredNotes.data.message);
    setNotes(filteredNotes.data.message);
    console.log(filteredNotes);
    setSearchQuery("");
  };

  return (
    <div className="container">
      <h1 className="wellcome">WELLCOME TO HWJC NOTE TAKING WEB APP</h1>
      <div className="searching">
        <input
          type="text"
          placeholder="search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button onClick={handleSearchingNotes}>submit</button>
      </div>
      <div className="notes">
        {notes.map((note) => (
          <div className="eachNote" key={note._id}>
            <h2 className="titleFromDB">{note.title}</h2>
            <p className="paragraphFromDB">{note.content}</p>
            <div className="editBtnContainer">
              <button title="edit note">🖊</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PreviousNotes;
