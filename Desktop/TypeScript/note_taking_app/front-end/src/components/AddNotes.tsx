import React, { useState } from "react";
import "../styles/addNotes.css";
import axios from "axios";
import { useMyContext } from "../myContext";
// interface display{
//   added:boolean,
//   setAdded:(value:boolean)=>void ;
// }
const AddNotes: React.FC = () => {
  const { added, setNoteAdded, userId } = useMyContext();
  // useEffect(() => {
  //   setNoteAdded(true);
  // }, []);
  console.log(added);
  interface Note {
    title: string;
    content: string;
    userID: string;
  }
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const notes: Note = { title: title, content: content, userID: userId };
      const Response = await axios.post(
        "http://localhost:5001/addNotes",
        notes
      );
      setResult(Response.data);
      // console.log(Response);
      // console.log(updateNote);
      setNoteAdded(false);
      // console.log(added);
      // setNoteAdded(!added);
    } catch (error: any) {
      setResult(error.response?.data);

      // console.log(error);
    }
  };

  return (
    <>
      <div className="addNoteContainer">
        <div>page to add NOTES</div>
        <form className="addNoteForm" onSubmit={formSubmitHandler}>
          <div className="title">
            <label htmlFor="title">add title</label>
            <input
              type="text"
              placeholder=" write your title here"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="content">
            <label htmlFor="content"> write your notes here</label>
            <textarea
              name="content"
              placeholder="add your content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="submit">
            <input type="submit" value={"save"} />
          </div>
        </form>
        {result && <p>{result.message}</p>}
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
