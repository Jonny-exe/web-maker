import React from "react"
import { textStyle } from "../../constants/exceptionItems"

interface Props {
	hideModal: () => void
	loginModalStateActive: boolean
	tokenInputValue: string
	setTokenInputValue: (token: string) => void
	importProject: () => void
	setRecoverTokenActivated: (isRecoverTokenActivated: boolean) => void
}
const ImportProject: React.FC<Props> = ({
	loginModalStateActive,
	hideModal,
	tokenInputValue,
	setTokenInputValue,
	importProject,
	setRecoverTokenActivated,
}) => {
	return (
		<div className="loginModalContainer">
			<div
				className={`overlay ${loginModalStateActive ? "overlayActive" : ""}`}
				onClick={hideModal}></div>
			<div
				className={`loginModal modal ${
					loginModalStateActive ? "modalActive" : ""
				}`}>
				<span style={textStyle}>
					Import your project with your project token
				</span>
				<div className={`informationDiv `}>
					If you cant remember your token click recover token. You will be able
					to recover your token with your recovery key
				</div>
				<input
					type="text"
					className="defaultInput"
					placeholder="Token"
					value={tokenInputValue}
					onChange={(e: any) => setTokenInputValue(e.target.value)}
				/>
				<div
					style={{ display: "flex", width: "50%", justifyContent: "center" }}>
					<button
						onClick={() => setRecoverTokenActivated(true)}
						className="defaultButton">
						Recovery
					</button>
					<button onClick={importProject} className="defaultButton">
						Import
					</button>
				</div>
			</div>
		</div>
	)
}

export default ImportProject
