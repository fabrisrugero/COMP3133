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
const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div css={joinOuterContainer}>
      <div className="joinInnerContainer">
        <h1 className="heading">Public Chat</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <select
            value={room}
            name="predefined_groups"
            onChange={(e) => setRoom(e ? e.target.value : "")}
          >
            <option value="News">News</option>
            <option value="Covid19">Covid19</option>
            <option value="NodeJs">NodeJs</option>
            <option value="Java">Java</option>
            <option value="CSharp">CSharp</option>
            <option value="CPlusPlus">CPlusPlus</option>
            <option value="Swift">Swift</option>
          </select>
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Join Group
          </button>
        </Link>
        <h1 className="heading">Private Chat</h1>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="joinInput"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Room"
            className="joinInput mt-20"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className={"button mt-20"} type="submit">
            Join Room
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
