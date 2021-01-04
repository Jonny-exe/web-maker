import React from "react"

interface Props {
  hideModal: () => void
  loginModalStateActive: boolean
  loadingGetFile: boolean
  token: string
}

const DownloadProject: React.FC<Props> = ({
  hideModal,
  loginModalStateActive,
  loadingGetFile,
  token,
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
        <span> {loadingGetFile ? "Loading file" : ""} </span>
        <a
          href={`temp-${token}.html`}
          className={`preview loginInput loginButton ${
            loadingGetFile ? "hide" : "unhide"
          }`}
          download="index.html"
        >
          Download file
        </a>
      </div>
    </div>
  )
}

export default DownloadProject
