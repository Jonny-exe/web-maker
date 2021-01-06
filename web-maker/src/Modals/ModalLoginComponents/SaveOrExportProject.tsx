import React from "react"
import { setTokenSourceMapRange } from "typescript"
import { textStyle } from "../../constants/exceptionItems"

interface Props {
	hideModal: () => void
	loginModalStateActive: boolean
	saveOnClick: () => void
	responseSavedStatus: number
	loadingSaved: boolean
	saveClicked: boolean
	getFile: () => void
	setToken: (token: string) => void
	setContent: (content: []) => void
}
const SaveOrExportProject: React.FC<Props> = ({
	setContent,
	setToken,
	loginModalStateActive,
	hideModal,
	getFile,
	saveClicked,
	loadingSaved,
	responseSavedStatus,
	saveOnClick,
}) => {
	const logOut = () => {
		setToken("")
		localStorage.removeItem("web-maker-token")
		hideModal()
		setContent([])
	}

	return (
		<div className="loginModalContainer">
			<div
				className={`overlay ${loginModalStateActive ? "overlayActive" : ""}`}
				onClick={hideModal}></div>
			<div
				className={`loginModal modal ${
					loginModalStateActive ? "modalActive" : ""
				}`}>
				<span style={textStyle}> Save your current project </span>
				<button onClick={saveOnClick} className="defaultButton">
					Save
				</button>
				<span
					className={`informationDiv ${
						responseSavedStatus === 200 && !loadingSaved && saveClicked
							? "unhide"
							: "hide"
					}`}>
					Saved successfully
				</span>
				<span
					className={`alertDiv ${
						responseSavedStatus === 500 && !loadingSaved && saveClicked
							? "unhide"
							: "hide"
					}`}>
					Unsuccessfull save, please try again later
				</span>
				<button type="button" onClick={getFile} className="defaultButton">
					Get html file
				</button>
				<button type="button" onClick={logOut} className="defaultButton">
					Log out
				</button>
			</div>
		</div>
	)
}

export default SaveOrExportProject
