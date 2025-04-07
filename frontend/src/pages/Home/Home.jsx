import React, { useMemo, useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import QuestionCard from "./QuestionCard";
import axios from "../../utils/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Fuse from "fuse.js";
import "./Home.css"
function Home() {
  const token = localStorage.getItem("token");
  const { user } = useContext(AppState);
  const [qdata, setqdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 10;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/question/all-questions", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        const sortedData = data.sort((a, b) => b.id - a.id);
        setqdata(sortedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchData();
  }, [token]);

  const offset = currentPage * questionsPerPage;
  const paginatedQuestions = qdata.slice(offset, offset + questionsPerPage);
  const pageCount = Math.ceil(qdata.length / questionsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return qdata;

    const options = {
      keys: ["title"],
      threshold: 0.4,
      includeScore: false,
    };

    const fuse = new Fuse(qdata, options);
    return fuse.search(searchQuery).map((result) => result.item);
  }, [qdata, searchQuery]);

  return (
    <section className="container">
      <div className="d-flex justify-content-between m-5">
        <Link
          to="/ask-question/"
          style={{backgroundColor: "#516cf0"}}
          className="btn btn-primary butn"
        >
          Ask question
        </Link>
        <div>Welcome: {user?.username}</div>
      </div>
      <div className="mb-3">
        <input
          style={{ width: "93%", borderRadius: "10px" }}
          type="text"
          className="p-2"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {searchQuery && <h3>Search Results</h3>}
      <hr />
      {searchQuery &&
        (filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              title={question.title}
              askedby={question.username}
              qdesc={question.description}
              questionid={question.questionid}
            />
          ))
        ) : (
          <p>No matching questions found.</p>
        ))}
      <h3>All Questions</h3>
      <hr />
      <div>
        {paginatedQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            title={question.title}
            askedby={question.username}
            qdesc={question.description}
            questionid={question.questionid}
          />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center mt-3"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </section>
  );
}

export default Home;
