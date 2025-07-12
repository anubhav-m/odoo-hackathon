import React, { useState } from "react";
import { FaBell, FaUserCircle, FaHome } from "react-icons/fa";
import "../App.css";

function Screen3() {
  const [comment, setComment] = useState("");
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Comment:", comment);
    setComment("");
  };

  return (
    <div className="question-page">

      <nav className="navbar d-flex justify-content-between align-items-center px-4 py-2">
        <div className="brand-name">StackIt</div>
        <div className="nav-icons d-flex gap-3">
          <FaHome size={20} />
          <FaBell size={20} />
          <FaUserCircle size={22} />
        </div>
      </nav>
      <div className="question-container">
        <p className="breadcrumb">Question &gt; How to join 2......</p>
        <h4 className="question-title">
          How to join 2 columns in a data set to make a separate column in SQL
        </h4>
        <div className="d-flex gap-2 mb-2">
          <span className="tag">SQL</span>
          <span className="tag">Join</span>
        </div>
        <p className="question-description">
          I do not know the code for it as I am a beginner. As an example what I need to do is like
          there is a column 1 containing First name, and column 2 consists of last name.
          I want a column to combine ...
        </p>
        <h5 className="answer-heading">Answers</h5>
        <div className="answer">
          <h6>Answer 1</h6>
          <ul>
            <li>The || Operator.</li>
            <li>The + Operator.</li>
            <li>The CONCAT Function.</li>
          </ul>
        </div>

        <div className="answer">
          <h6>Answer 2</h6>
          <p>Details</p>
        </div>
        <div className="mt-4">
          <label className="form-label">Submit Your Answer</label>
          <textarea
            rows="4"
            className="form-control mb-3"
            placeholder="Type your answer here..."
            style={{
              background: "#222",
              color: "#fff",
              borderRadius: "10px",
              border: "none",
              padding: "10px",
            }}
          ></textarea>
          <button className="ask-button">Submit</button>
        </div>
        
      </div>
    </div>
  );
}
export default Screen3;
