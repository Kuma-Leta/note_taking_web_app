import React, { useState } from "react";
import "../styles/addNotes.css";
// import axios from "axios";
import axios from "../axiosConfig";
import { useMyContext } from "../myContext";
import { useNavigate } from "react-router-dom";
// interface display{
//   added:boolean,
//   setAdded:(value:boolean)=>void ;
// }
const AddNotes: React.FC = () => {
  const { added, setNoteAdded } = useMyContext();
  // useEffect(() => {
  //   setNoteAdded(true);
  // }, []);
  console.log(added);
  interface Note {
    title: string;
    content: string;
  }
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();
  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const notes: Note = {
        title: title,
        content: content,
      };
      const Response = await axios.post(
        "http://localhost:5001/api/notes/addNotes",
        notes
      );
      setResult(Response.data);
      // console.log(Response);
      // console.log(updateNote);
      navigate("/previousNotes");
      // console.log(added);
      // setNoteAdded(!added);
    } catch (error: any) {
      // if (error.response.data.message === "unauthorized") {
      //   navigate("/signup");
      // }
      console.log(error);
      // setResult(error.response?.data);

      // console.log(error);
    }
  };

  return (
    <>
      <div className="addNoteContainer">
        <h1>page to add NOTES</h1>
        <form className="addNoteForm" onSubmit={formSubmitHandler}>
          <div className="title">
            <label htmlFor="title">add title</label>
            <input
              type="text"
              placeholder=" write your title here"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="content">
            <label htmlFor="content"> write your notes here</label>
            <textarea
              name="content"
              placeholder="add your content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="submit">
            <input type="submit" value={"save"} />
          </div>
        </form>

        {result && <p className="addNoteSuccessMessage">{result.message}</p>}
      </div>
      <div className="background_video_container">
        <video autoPlay loop muted>
          <source src="/note_taking.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  );
};
export default AddNotes;
