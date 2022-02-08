/** @jsxRuntime classic */
/** @jsx jsx */
import { useState } from "react";
import { Link } from "react-router-dom";
import { jsx, css } from "@emotion/react";

const joinOuterContainer = css`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: #1a1a1d;

  .joinInnerContainer {
    width: 20%;
  }

  .joinInput {
    border-radius: 0;
    padding: 15px 20px;
    width: 100%;
  }

  .heading {
    color: white;
    font-size: 2.5em;
    padding-bottom: 10px;
    border-bottom: 2px solid white;
  }

  .button {
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #2979ff;
    padding: 20px;
    border-radius: 5px;
    display: inline-block;
    border: none;
    width: 100%;
  }

  .mt-20 {
    margin-top: 20px;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .joinOuterContainer {
      height: 100%;
    }

    .joinInnerContainer {
      width: 90%;
    }
  }

  button:focus {
    outline: 0;
  }
`;

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div css={joinOuterContainer}>
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room"
            className="joinInput mt-20"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
