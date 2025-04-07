import React from "react";
import classes from "./About.module.css";

const About = () => {
  return (
    <div className={classes.container}>
      <header>
        <h3>About</h3>
        <h1>Evangadi Networks</h1>
      </header>

      <section>
        <p>
          No matter what stage of life your are in, wheather you're just
          starting elemntary schol or being promoted to CEO of a Foutunet
          500company you have much to offer to those who are trying to follow in
          your footsteps.
        </p>
        <p className={classes.secondP}>
          Wheather you are willing to share your knowledge or your are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
      </section>

      <button type="submit">HOW IT WORKS</button>
    </div>
  );
};

export default About;
