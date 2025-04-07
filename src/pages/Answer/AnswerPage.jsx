import React, { useEffect, useState } from "react";
import classes from "./AnswerPage.module.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdArrowCircleRight } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";

const AnswerPage = () => {
  const location = useLocation();
  const { title, qdesc } = location?.state || {};
  const { question_id } = useParams();
  const questionid = question_id;

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("token");
  const [answerdata, setAnswerdata] = useState([]);
  const [answer, setAnswer] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new submit
    setSuccess(null); // Reset success on new submit
    // console.log("Answer Submitted:", { answer });

    // Send the answer to the backend
    try {
      const response = await axios.post(
        "/answer",
        {
          answer,
          questionid,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // console.log("Answer Submitted:", response.data);
      setAnswer("");

      setSuccess(response.data.msg);
    } catch (err) {
      console.error("Error submitting Answer:", err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/answer/get-answer/${question_id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const response = data.answers;
        const sortedData = response.sort((a, b) => b.answer_id - a.answer_id);
        setAnswerdata(sortedData);
      } catch (error) {
        eww;
        console.error("Error fetching questions:", error);
      }
    }
    fetchData();
  });

  return (
    <div className={classes.container}>
      {/* question section */}
      <div className={classes.question_section}>
        <div style={{ display: "flex", gap: "5px" }}>
          <MdArrowCircleRight size={30} />
          <h2 className={classes.question_title}>{title}</h2>
        </div>
        <p className={classes.question_text}>{qdesc}</p>
      </div>
      <hr />

      {/* answer section */}
      <div className={classes.answer_section}>
        {answerdata?.length === 0 ? (
          <p>No Answers Yet</p>
        ) : (
          <h3 className={classes.answer_title}>Answer From The Community</h3>
        )}

        <hr />
        {answerdata?.map((answer) => (
          <div>
            <div className={classes.answer_box}>
              <div className={classes.answer_icon}>
                <IoPersonCircleOutline size={70} />
                <p className={classes.username}>{answer?.user_name}</p>
              </div>
              <div className={classes.answer_text}>
                <p>{answer?.content}</p>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>

      {/* Answer Input Section */}
      <div className={classes.ans_form_container}>
        <h3>Answer The Top Question</h3>
        <Link to={`/ask-question/`} className={classes.go_to_questions}>
          Go to Question page
        </Link>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your Answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className={classes.ans_textarea}
            required
          ></textarea>
          <button type="submit" className={classes.ans_submit_btn}>
            Post Your Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnswerPage;
