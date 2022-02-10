/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jsx, css } from "@emotion/react";
import { useHistory, useLocation } from "react-router-dom";

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
  .joinInput,
  .predefinedGroups {
    border-radius: 0;
    padding: 15px 10%;
    width: 78%;
  }
  .predefinedGroups {
    width: 100%;
    margin-top: 20px;
    background-color: #ffffff;
  }
  .heading {
    color: black;
    margin-top: 0;
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
let reduxValue = "";
const Lobby = () => {
  const history = useHistory();
  const location = useLocation();
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [isPrivateChat, setIsPrivateChat] = useState(false);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.has("name")) {
      reduxValue = queryParams.get("name");
      history.replace({ search: "" });
    } else if (reduxValue === "") history.push("/");
    else setName(reduxValue);
  }, [history, location]);

  return (
    <div css={joinOuterContainer}>
      <div className="joinInnerContainer">
        {!isPrivateChat ? (
          <React.Fragment>
            <Link to="#" onClick={() => setIsPrivateChat(true)}>
              click here for private chat
            </Link>
            <h1 className="heading">Public Chat</h1>
            <div>
              <input
                value={name}
                type="text"
                readOnly={true}
                placeholder="Name"
                className="joinInput"
              />
            </div>
            <div>
              <select
                value={room}
                name="predefined_groups"
                className="predefinedGroups"
                onChange={(e) => setRoom(e.target.value)}
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
              to={`/chat?roomtype=Public&name=${name}&room=${room}`}
            >
              <button className={"button mt-20"} type="submit">
                Join Group
              </button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link
              to="#"
              onClick={() => {
                setRoom("News");
                setIsPrivateChat(false);
              }}
            >
              click here for public chat
            </Link>
            <h1 className="heading">Private Chat</h1>
            <div>
              <input
                type="text"
                value={name}
                readOnly={true}
                placeholder="Name"
                className="joinInput"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="to_username"
                className="joinInput mt-20"
                onChange={(e) => setRoom(e.target.value)}
              />
            </div>
            <Link
              onClick={(e) => (!name || !room ? e.preventDefault() : null)}
              to={`/chat?roomtype=Private&name=${name}&room=${room}`}
            >
              <button className={"button mt-20"} type="submit">
                Join Room
              </button>
            </Link>
          </React.Fragment>
        )}
        <Link to={"/"}>Sign Out</Link>
      </div>
    </div>
  );
};

export default Lobby;
