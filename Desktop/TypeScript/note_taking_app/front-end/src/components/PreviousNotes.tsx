import React, { useEffect, useState } from "react";
import axios from "../axiosConfig";
import "../styles/previousNotes.css";
import { useMyContext } from "../myContext";
// import AddNotes from "./AddNotes";
import { Link, useNavigate } from "react-router-dom";
import { Pagination } from "./pagination";
import "../styles/notes.css";
interface Note {
  title: string;
  content: string;
  _id: string;
  updatedAt: Date;
}
const PreviousNotes: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { userId } = useMyContext();
  const [error, setError] = useState(null);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    async function getAvailableNotes() {
      try {
        // console.log(added);
        const result = await axios.get(
          `http://localhost:5001/api/notes/getNotes?page=${currentPage}`,
          {
            params: { userId },
          }
        );
        console.log(result);
        setNotes(result.data.NoteResult);
        setTotalPages(result.data.totalNumberOfPages);
        // console.log(result.data.NoteResult);
      } catch (error: any) {
        // if (error.response.data.message === "unauthorized") {
        //   navigate("/signup");
        //   return;
        // }
        console.log(error);
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
    try {
      const filteredNotes = await axios.get(
        "http://localhost:5001/api/notes/searchNotes",
        {
          params: { searchQuery },
        }
      );
      console.log(filteredNotes.data.message);
      setNotes(filteredNotes.data.message);
      console.log(filteredNotes);
      setSearchQuery("");
    } catch (error: any) {
      setError(error.message);
    }
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
                {new Date(note.updatedAt).toLocaleString("en-US", {
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
          </div>
        ))}
        <Pagination
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
      <div className="btnContainer">
        <Link to={"/addNotes"} className="addNoteBtn">
          AddNote
        </Link>
      </div>
    </div>
  );
};
export default PreviousNotes;
