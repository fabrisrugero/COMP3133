/** @jsxRuntime classic */
/** @jsx jsx */
import io from "socket.io-client";
import queryString from "query-string";
import { jsx, css } from "@emotion/react";
import { useState, useEffect } from "react";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "./Input";
import axios from "axios";

const outerContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    border-radius: 8px;
    height: 60%;
    width: 35%;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .outerContainer {
      height: 100%;
    }

    .container {
      width: 100%;
      height: 100%;
    }
  }

  @media (min-width: 480px) and (max-width: 1200px) {
    .container {
      width: 60%;
    }
  }
`;
const ENDPOINT = "http://localhost:5001/";
// const ENDPOINT = "http://10.0.0.87:5001/";
let socket;
let type;
const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const { name, room, roomtype } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    type = roomtype;
    setRoom(room);
    setName(name);
    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      } else if (roomtype === "Public") {
        axios.get(`${ENDPOINT}publichat/rooms/${room}`).then((res) => {
          console.log(res.data);
          if (isMounted) setMessages((messages) => [...messages, ...res.data]);
        });
      } else if (roomtype === "Private") {
        axios
          .get(`${ENDPOINT}privatechat/from/${name}/to/${room}`)
          .then((res) => {
            console.log(res.data);
            if (isMounted)
              setMessages((messages) => [...messages, ...res.data]);
          });
      }
      return () => {
        isMounted = false;
      };
    });
  }, [location.search]);

  useEffect(() => {
    let isMounted = true;
    socket.on("servermessage", (message) => {
      if (isMounted) setMessages((messages) => [...messages, message]);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit(`send${type}Message`, message, () => setMessage(""));
    }
  };

  return (
    <div css={outerContainer}>
      <div className="container">
        <InfoBar room={room} name={name} socket={socket} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
