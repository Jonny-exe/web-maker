import React from "react"
import { textStyle } from "../../exceptionItems"

interface Props {
  loginModalStateActive: boolean
  hideModal: () => void
  setCreateProjectActivated: (value: boolean) => void
  setImportProjectActivated: (value: boolean) => void
}

const CreateOrImportProject: React.FC<Props> = ({
  loginModalStateActive,
  hideModal,
  setCreateProjectActivated,
  setImportProjectActivated,
}) => {
  return (
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
        <span style={textStyle}> Create new project </span>
        <button
          className="preview loginInput loginButton"
          onClick={() => setCreateProjectActivated(true)}
        >
          Create
        </button>
        <span style={textStyle}> Import existing project </span>
        <button
          className="preview loginInput loginButton"
          onClick={() => setImportProjectActivated(true)}
        >
          Import
        </button>
      </div>
    </div>
  )
}

export default CreateOrImportProject
