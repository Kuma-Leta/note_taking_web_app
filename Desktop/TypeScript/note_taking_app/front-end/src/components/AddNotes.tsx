import React, { useState } from "react";
import "../styles/addNotes.css";
import axios from "axios";

const AddNotes: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // try {

    // } catch (error) {

    // }
  };

  return (
    <>
      <div className="note_container">
        <div>page to add NOTES</div>
        <form onSubmit={formSubmitHandler}>
          <div className="title">
            <label htmlFor="title">add title</label>
            <input
              type="text"
              placeholder=" add your title here"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="content">
            <label htmlFor="content"> add your notes here</label>
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
