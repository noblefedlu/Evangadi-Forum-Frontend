import React, { useState } from "react";
import classes from "./Landing.module.css";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import About from "../about/About";

function Landing() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className={classes.landingContainer}>
      <div className={classes.authContainer}>
        {/* Apply the toggle class here instead of individual components */}
        <div
          className={`${classes.authSlide} ${
            showLogin ? classes.showLogin : classes.showRegister
          }`}
        >
          <div className={classes.authContent}>
            <Login onToggle={handleToggle} />
          </div>
          <div className={classes.authContent}>
            <Register onToggle={handleToggle} />
          </div>
        </div>
      </div>
      <div className={classes.aboutContainer}>
        <About />
      </div>
    </div>
  );
}

export default Landing;
