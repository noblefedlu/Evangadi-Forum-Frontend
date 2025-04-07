import React, { useState } from "react";
import "./AskQuestion.css"; // Import the custom CSS
import axios from "../../utils/axiosConfig";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new submit
    setSuccess(null); // Reset success on new submit

    try {
      const response = await axios.post(
        "/question",
        {
          title,
          description,
          tag, // Include tag in the request       
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Question Submitted:", response.data);
      setTitle("");
      setDescription("");
      setTag(""); 
      setSuccess(response.data.msg); 
    } catch (err) {
      console.error("Error submitting question:", err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg); 
      } else {
        setError("An unexpected error occurred."); 
      }
    }
  };

  return (
    <div className="ask-container">
      <div className="question-guidelines">
        <h2>Steps to write a good question</h2>
        <ul>
          <li>Summarize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>

      <div className="ask-form-container">
        <h3 style={{marginBottom:"18px"}}>Ask a public question</h3>
        {/* <p className="go-to-questions">Go to Question page</p> */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="ask-input"
            required
          />
          <textarea
            placeholder="Question Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="ask-textarea"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Tags (comma-separated)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="ask-input"
          />
          <button type="submit" className="ask-submit-btn">
            Post Your Question
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AskQuestion;
