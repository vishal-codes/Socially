import { useContext, useRef } from "react";
import { CircularProgress } from "@material-ui/core";

import "./LogIn.css";
import { logInCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const email = useRef();
  const password = useRef();

  const { isFetching, dispatch } = useContext(AuthContext);

  const handleLoginClick = (e) => {
    e.preventDefault();
    logInCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const registerBtnClicked = () => {
    window.location.replace("/register");
  }

  return (
    <div className="logIn">
      <div className="logInWrapper">
        <div className="logInLeft">
          <h3 className="logInLogo">Socially :)</h3>
          <span className="logInDescription">
            Connect with your loved ones !
          </span>
        </div>
        <div className="logInRight">
          <form className="logInBox" onSubmit={handleLoginClick}>
            <input
              ref={email}
              required
              placeholder="Email"
              type="Email"
              className="logInInput"
            />
            <input
              ref={password}
              required
              minLength={7}
              placeholder="Password"
              type="Password"
              className="logInInput"
            />
            <button className="logInButton" type="submit">
              {isFetching ? (
                <CircularProgress size="24px" style={{ color: "white" }} />
              ) : (
                "Log In"
              )}
            </button>
            <span className="logInForgot">Forgot Password?</span>
          </form>
          <button onClick={registerBtnClicked} className="logInRegisterButton">
              Create a new account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
