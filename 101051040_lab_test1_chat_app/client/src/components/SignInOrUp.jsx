/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { jsx, css } from "@emotion/react";
import axios from "axios";

const joinOuterContainer = css`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: #ffffff;
  .joinInnerContainer {
    width: 20%;
  }
  .joinInput {
    border-radius: 0;
    padding: 15px 10%;
    width: 78%;
  }
  .heading {
    color: black;
    font-size: 2.5em;
    padding-bottom: 10px;
    border-bottom: 2px solid black;
  }
  .button {
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #2979ff;
    padding: 20px 10%;
    border-radius: 5px;
    display: inline-block;
    border: none;
    width: 100%;
  }
  .mt-20 {
    margin-top: 20px;
  }
  button:focus {
    outline: 0;
  }
`;
// const ENDPOINT = "http://localhost:5001/";
const ENDPOINT = "http://10.0.0.87:5001/";
const SignInOrUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div css={joinOuterContainer}>
      <div className="joinInnerContainer">
        {isSignUp ? (
          <h1 className="heading">Sign Up</h1>
        ) : (
          <h1 className="heading">Sign In</h1>
        )}
        <div>
          <input
            type="text"
            placeholder="username"
            className="joinInput"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="password"
            className="joinInput mt-20"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isSignUp ? (
          <React.Fragment>
            <div>
              <input
                type="text"
                placeholder="firstname"
                className="joinInput mt-20"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="lastname"
                className="joinInput mt-20"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <Link
              onClick={(e) => {
                if (!username || !password || !firstname || !lastname)
                  e.preventDefault();
                else {
                  const creds = `?username=${username}&password=${password}`;
                  const fullname = `&firstname=${firstname}&lastname=${lastname}`;
                  axios
                    .get(`${ENDPOINT}chats/signUp/${creds}${fullname}`)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }}
              to={`/lobby`}
            >
              <button className={"button mt-20"} type="submit">
                Sign Up
              </button>
            </Link>
            <Link onClick={() => setIsSignUp(false)} to="#">
              Sign In
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link
              onClick={(e) => {
                if (!username || !password) e.preventDefault();
                else {
                  const params = `?username=${username}&password=${password}`;
                  axios
                    .get(`${ENDPOINT}chats/signIn/${params}`)
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }
              }}
              to={`/lobby`}
            >
              <button className={"button mt-20"} type="submit">
                Sign In
              </button>
            </Link>
            <Link onClick={() => setIsSignUp(true)} to="#">
              Sign Up
            </Link>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default SignInOrUp;
