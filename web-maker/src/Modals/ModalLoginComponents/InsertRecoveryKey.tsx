import React from "react"
import { textStyle } from "../../exceptionItems"

interface Props {
  loginModalStateActive: boolean
  hideModal: () => void
  recoveryKeyInputValue: string
  setRecoveryKeyInputValue: (recoveryKey: string) => void
  checkRecoveryKeyStatus: number
  setCheckRecoveryKeyCount: (count: number) => void
  recoveryTooLong: boolean
  checkRecoveryKeyCount: number
}
const InsertRecoveryKey: React.FC<Props> = ({
  setCheckRecoveryKeyCount,
  checkRecoveryKeyCount,
  recoveryTooLong,
  checkRecoveryKeyStatus,
  loginModalStateActive,
  hideModal,
  recoveryKeyInputValue,
  setRecoveryKeyInputValue,
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
          <span style={textStyle}>
            Insert recovery key in case you forget your token
          </span>
          <input
            type="text"
            className="input loginInput"
            placeholder="Recovery key"
            value={recoveryKeyInputValue}
            onChange={(e: any) => setRecoveryKeyInputValue(e.target.value)}
          />
          <div className="informationDiv recoveryTooLong">
            Make sure you save this recovery key. You will need the key in case
            you forget your token.
          </div>
          <div
            className={`informationDiv ${
              recoveryTooLong ? "alertDiv unhide" : "hide"
            }`}
          >
            You recovery key is too long, make sure its under 30 carachters
          </div>
          <div
            className={`alertDiv ${
              checkRecoveryKeyStatus === 500 ? "unhide" : "hide"
            }`}
          >
            The recovery key is already taken
          </div>
          <button
            onClick={() => setCheckRecoveryKeyCount(checkRecoveryKeyCount + 1)}
            className="preview loginInput loginButton"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default InsertRecoveryKey
