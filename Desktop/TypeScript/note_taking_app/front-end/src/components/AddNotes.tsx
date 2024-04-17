import React from "react";
import "../styles/addNotes.css";

const AddNotes: React.FC = () => {
  return (
    <>
      <div className="note_container">
        <div>page to add NOTES</div>
        <form>
          <div className="title">
            <label htmlFor="title">add title</label>
            <input type="text" name="title" />
          </div>
          <div className="content">
            <label htmlFor="content"> add your notes here</label>
            <textarea name="content" />
          </div>
          <input type="submit" value={"save"} />
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
