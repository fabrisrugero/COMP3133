/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";

const messagestyles = css`
  display: flex;
  justify-content: flex-end;
  padding: 0 5%;
  margin-top: 3px;
  .messageBox {
    background: #f3f3f3;
    border-radius: 20px;
    padding: 5px 20px;
    color: white;
    display: inline-block;
    max-width: 80%;
  }
  .messageText {
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 1.1em;
    word-wrap: break-word;
  }
  .messageText img {
    vertical-align: middle;
  }
  .sentText {
    display: flex;
    align-items: center;
    font-family: Helvetica;
    color: #828282;
    letter-spacing: 0.3px;
  }
  .pl-10 {
    padding-left: 10px;
  }

  .pr-10 {
    padding-right: 10px;
  }
  .colorWhite {
    color: white;
  }
  .colorDark {
    color: #353535;
  }
  .backgroundBlue {
    background: #2979ff;
  }
  .backgroundLight {
    background: #f3f3f3;
  }
`;

const Message = ({ message: { message, from_user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (from_user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div
      css={css`
        ${messagestyles}
        justify-content: flex-end;
      `}
    >
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message}</p>
      </div>
    </div>
  ) : (
    <div
      css={css`
        ${messagestyles}
        justify-content: flex-start;
      `}
    >
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message}</p>
      </div>
      <p className="sentText pl-10 ">{from_user}</p>
    </div>
  );
};

export default Message;
