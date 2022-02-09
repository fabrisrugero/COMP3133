/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const form = css`
  display: flex;
  border: 2px solid #d3d3d3;

  .input {
    border: none;
    border-radius: 0;
    padding: 5%;
    width: 80%;
    font-size: 1.2em;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  .sendButton {
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #2979ff;
    padding: 20px;
    display: inline-block;
    border: none;
    width: 20%;
  }
`;

const Input = ({ setMessage, sendMessage, message }) => (
  <form css={form}>
    <input
      className="input"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button className="sendButton" onClick={(e) => sendMessage(e)}>
      Send
    </button>
  </form>
);

export default Input;
