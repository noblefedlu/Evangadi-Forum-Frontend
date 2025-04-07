import React, { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

function QuestionCard(props) {
  const { title, askedby, qdesc, questionid } = props;
  const [isHovered, setIsHovered] = useState(false);

  const divStyle = {
    backgroundColor: isHovered ? "lightblue" : "white",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease", // Smooth transition
  };
  return (
    <>
      <div
        className="single_question d-flex justify-content-between align-content-center "
        style={divStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="left d-flex">
          <div className=" p-4">
            <Link
              to={`/answer/get-answer/${questionid}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <AccountCircleIcon sx={{ fontSize: 40 }} />
              <p>{askedby}</p>
            </Link>
          </div>
          <Link
            to={`/answer/get-answer/${questionid}`}
            state={{ title, askedby, qdesc }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className=" p-4 d-flex justify-content-center align-items-center mt-4">
              <p>{title}</p>
            </div>
          </Link>
        </div>
        <Link
          to={`/answer/get-answer/${questionid}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="pt-5">
            <ArrowForwardIosIcon />
          </div>
        </Link>
      </div>
      <hr />
    </>
  );
}

export default QuestionCard;
