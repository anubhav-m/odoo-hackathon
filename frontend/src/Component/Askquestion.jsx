import React, { useState } from "react";
import Askquestionnav from "./Askquestionnav";
import "../App.css";

function Askquestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, description, tags });
  };

  return (
    <div className="ask-page">
      <Askquestionnav />

      <div className="form-wrapper">
        <h2 className="ask-title">Ask Question</h2>
        <form onSubmit={handleSubmit} className="ask-form">
          <label>Title</label>
          <input
            type="text"
            placeholder="Silky Watch"
            className="ask-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Description</label>
          <textarea
            rows="5"
            className="ask-textarea"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Tags</label>
          <input
            type="text"
            placeholder="e.g. react, sql"
            className="ask-input"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <button type="submit" className="ask-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Askquestion;

