import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import { useEffect, FormEvent, useState } from "react";
import "../styles/editNote.css";

export const EditNote: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const getEditableNote = async () => {
      const resultBeforeEdited = await axios.get(
        `http://localhost:5001/api/notes/getEditableNote/${id}`
      );
      setTitle(resultBeforeEdited.data.result.title);
      setContent(resultBeforeEdited.data.result.content);
      console.log(resultBeforeEdited);
    };
    getEditableNote();
  }, [id]);
  const handleEditedNoteSubmission = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const resultAfterEdited = await axios.put(
        `http://localhost:5001/api/notes/saveEditedNote/${id}`,
        { title, content, modifiedOn: new Date() }
      );
      console.log(resultAfterEdited);
      setUpdated(true);
      setTimeout(() => {
        navigate("/previousNotes");
      }, 1000);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="editNoteContainer">
        <h1>Edit Note</h1>
        <form className="editNoteForm" onSubmit={handleEditedNoteSubmission}>
          <div className="editNoteTitle">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="editNoteContent">
            <label htmlFor="content">Content</label>
            <textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="editNoteSubmitBtn">
            <input type="submit" />
          </div>
        </form>
        {updated && (
          <p className="EditNoteSuccessMessage">note updated successfully</p>
        )}
      </div>
    </>
  );
};
