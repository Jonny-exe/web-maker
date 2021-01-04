import React from "react"
import { textStyle } from "../../exceptionItems"

interface Props {
  hideModal: () => void
  loginModalStateActive: boolean
  responseToken: string
}
const GiveNewProjectToken: React.FC<Props> = ({
  loginModalStateActive,
  hideModal,
  responseToken,
}) => {
  return (
    <div>
      <div className="loginModalContainer">
        <div
          className={`overlay ${loginModalStateActive ? "overlayActive" : ""}`}
          onClick={hideModal}
        ></div>
        <div
          className={`loginModal modal ${
            loginModalStateActive ? "modalActive" : ""
          }`}
        >
          <span style={textStyle}> This is your project token </span>
          <span>{responseToken != null ? responseToken : ""}</span>
          <div className={`informationDiv `}>
            Make sure you save this token. You will need the key to edit you
            project the next time you want to edit it.
          </div>
          <button
            onClick={hideModal}
            className="preview loginButton"
            style={{ margin: "1%" }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default GiveNewProjectToken
