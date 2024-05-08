import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/previousNotes.css";
import { useMyContext } from "../myContext";
// import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";
import { Pagination } from "./pagination";
interface Note {
  title: string;
  content: string;
  _id: string;
  modifiedOn: Date;
}
const PreviousNotes: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { userId } = useMyContext();
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    async function getAvailableNotes() {
      try {
        // console.log(added);
        const result = await axios.get(
          `http://localhost:5001/getNotes?page=${currentPage}=`,
          {
            params: { userId },
          }
        );
        setNotes(result.data.NoteResult);
        setTotalPages(result.data.totalNumberOfPages);
        // console.log(result.data.NoteResult);
      } catch (error: any) {
        // console.log(error);
      }
    }
    getAvailableNotes();
  }, [currentPage]);
  const handleEditNote = (NoteId: string) => {
    navigate(`/editNote/${NoteId}`);
  };
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
              <span>
                modified on:
                {new Date(note.modifiedOn).toLocaleString("en-US", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
              <button
                title="edit note"
                onClick={() => handleEditNote(note._id)}
              >
                🖊
              </button>
            </div>
            <Pagination
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default PreviousNotes;
