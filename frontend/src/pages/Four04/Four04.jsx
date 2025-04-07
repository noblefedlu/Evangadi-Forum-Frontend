import React from "react";
import { Link } from "react-router-dom";
import classes from "./Four04.module.css"; // Add styles if needed

const Four04 = () => {
  return (
    <div className={classes.notFoundContainer}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default Four04;
