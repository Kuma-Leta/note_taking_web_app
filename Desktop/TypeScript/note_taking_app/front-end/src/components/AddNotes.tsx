import React, { useState } from "react";
import "../styles/addNotes.css";
import axios from "axios";
const AddNotes: React.FC = () => {
  interface Note {
    title: string;
    content: string;
  }
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [result, setResult] = useState<object>({});
  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const notes: Note = { title, content };
      const Response = await axios.post(
        "http://localhost:5000/addNotes",
        notes
      );
      setResult(Response.data);
      console.log(Response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="note_container">
        <div>page to add NOTES</div>
        <form onSubmit={formSubmitHandler}>
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
        {result && <p>{JSON.stringify(result)}</p>}
      </div>
      <div className="background_video_container">
        <video autoPlay loop muted>
          <source src="/note_taking.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};
export default AddNotes;
