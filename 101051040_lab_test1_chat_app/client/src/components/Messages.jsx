/** @jsxRuntime classic */
/** @jsx jsx */
import Message from "./Message";
import { jsx, css } from "@emotion/react";

const messagestyles = css`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
  border: 1px solid grey;
`;

const Messages = ({ messages, name }) => (
  <div css={messagestyles}>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </div>
);

export default Messages;
