/** @jsxRuntime classic */
/** @jsx jsx */
import Message from "./Message";
import { jsx, css } from "@emotion/react";
import ScrollToBottom from "react-scroll-to-bottom";

const messagestyles = css`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;

const Messages = ({ messages, name }) => (
  <ScrollToBottom css={messagestyles}>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
