/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { Link } from "react-router-dom";
import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";

const infobar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2979ff;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
  .leftInnerContainer {
    flex: 0.5;
    display: flex;
    align-items: center;
    margin-left: 5%;
    color: white;
  }
  .rightInnerContainer {
    display: flex;
    flex: 0.5;
    justify-content: flex-end;
    margin-right: 5%;
  }
  .onlineIcon {
    margin-right: 5%;
  }
`;
const InfoBar = ({ name, room, socket }) => (
  <div css={infobar}>
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <Link onClick={() => socket.emit("disconect")} to={`/lobby?name=${name}`}>
        <img src={closeIcon} alt="close icon" />
      </Link>
    </div>
  </div>
);

export default InfoBar;
