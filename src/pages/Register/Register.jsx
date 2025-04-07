import { useRef, useState } from "react";
import axios from "../../utils/axiosConfig";
import classes from "./Register.module.css";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Register({ onToggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    const usernameValue = userNameDom.current.value.trim();
    const firstnameValue = firstNameDom.current.value.trim();
    const lastnameValue = lastNameDom.current.value.trim();
    const emailValue = emailDom.current.value.trim();
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
      setErrorMessage("Please provide all required information");
      return;
    }

    try {
      await axios.post("/users/register", {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue,
      });

      onToggle(); // Switch to login form instead of navigating away
    } catch (error) {
      setErrorMessage(error?.response?.data?.msg || "Something went wrong!");
      console.error(error.response);
    }
  }

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Join the network</h2>
      <p className={classes.text}>
        Already have an account?{" "}
        <span
          onClick={onToggle}
          className={classes.link}
          style={{ cursor: "pointer" }}
        >
          Sign in
        </span>
      </p>

      <form onSubmit={handleSubmit} className={classes.form_container}>
        <div className={classes.input_group}>
          <input ref={emailDom} type="email" placeholder="Email" required />
        </div>

        <div className={classes.input_name_container}>
          <div className={classes.input_group}>
            <input
              ref={firstNameDom}
              type="text"
              placeholder="First Name"
              required
            />
          </div>

          <div className={classes.input_group}>
            <input
              ref={lastNameDom}
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div className={classes.input_group}>
          <input
            ref={userNameDom}
            type="text"
            placeholder="User Name"
            required
          />
        </div>

        <div className={classes.input_group} style={{ position: "relative" }}>
          <input
            ref={passwordDom}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: "10px", cursor: "pointer" }}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </span>
        </div>

        {errorMessage && (
          <p style={{ color: "red", paddingTop: "5px" }}>{errorMessage}</p>
        )}

        <button type="submit" className={classes.btn}>
          Agree and Join
        </button>

        <p className={classes.form_footer}>
          I agree to the{" "}
          <a href="#" className={classes.link}>
            privacy policy
          </a>{" "}
          and{" "}
          <a href="#" className={classes.link}>
            terms of service
          </a>
          .
        </p>
        <p>
          <span
            onClick={onToggle}
            className={classes.link}
            style={{ cursor: "pointer" }}
          >
            Already have an account?
          </span>
        </p>
      </form>
    </section>
  );
}

export default Register;
