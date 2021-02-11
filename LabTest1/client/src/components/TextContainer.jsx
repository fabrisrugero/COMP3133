/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import onlineIcon from "../icons/onlineIcon.png";

const textcontainer = css`
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  color: white;
  height: 60%;
  justify-content: space-between;
  
  .activeContainer {
    display: flex;
    align-items: center;
    margin-bottom: 50%;
  }

  .activeItem {
    display: flex;
    align-items: center;
  }

  .activeContainer img {
    padding-left: 10px;
  }

  .textContainer h1 {
    margin-bottom: 0px;
  }

  @media (min-width: 320px) and (max-width: 1200px) {
    .textContainer {
      display: none;
    }
  }
`;

const TextContainer = ({ users }) => (
  <div css={textcontainer}>
    {users ? (
      <div>
        <h1>People currently chatting:</h1>
        <div className="activeContainer">
          <h2>
            {users.map(({ name }) => (
              <div key={name} className="activeItem">
                {name}
                <img alt="Online Icon" src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);

export default TextContainer;
