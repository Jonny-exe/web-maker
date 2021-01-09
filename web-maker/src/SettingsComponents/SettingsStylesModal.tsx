import React, { useState } from "react"
import { bodyObject, bodyObjectType } from "../constants/defaultTypes"

interface Props {
	settingsStyleActive: boolean
	setSettingsStyleActive: (value: boolean) => void
	newObject: bodyObjectType
	setNewObject: (newBodyObject: bodyObjectType) => void
	hideModal: () => void
}

const SettingsStylesModal: React.FC<Props> = ({
	hideModal,
	newObject,
	setNewObject,
	settingsStyleActive,
	setSettingsStyleActive,
}) => {
	const updateStyles = (newStyleObject: object) => {
		var itemCopy: bodyObjectType = JSON.parse(JSON.stringify(newObject))
		Object.assign(itemCopy, newStyleObject)
		setNewObject(itemCopy)
	}

	const setStyleDefault = (light: boolean) => {
		if (light) {
			updateStyles(bodyObject)
		} else {
			var itemCopy: bodyObjectType = JSON.parse(JSON.stringify(bodyObject))
			itemCopy.style.background = "#292C35"
			itemCopy.style.color = "white"
			updateStyles(itemCopy)
		}
	}

	return (
		<>
			<div
				className={`modal settingsModal ${
					settingsStyleActive ? "modalActive" : ""
				}`}>
				<div>
					<div className="settingsStylesPairsContainer">
						<span> Font size </span>
						<input
							type="number"
							className="defaultInput settingsStyleInput"
							placeholder={newObject.style.fontSize}
							onChange={(e: any) =>
								updateStyles({ style: { fontSize: e.target.value + "%" } })
							}
						/>{" "}
						%
					</div>
					<div className="settingsStylesPairsContainer">
						<span> Text color </span>
						<input
							className="defaultInput settingsStyleInput"
							placeholder={newObject.style.color}
							onChange={(e: any) =>
								updateStyles({ style: { color: e.target.value } })
							}
						/>
					</div>
					<div className="settingsStylesPairsContainer">
						<span> Text Align </span>
						<input
							className="defaultInput settingsStyleInput"
							placeholder={newObject.style.textAlign}
							onChange={(e: any) =>
								updateStyles({ style: { textAlign: e.target.value } })
							}
						/>
					</div>
					<div className="settingsStylesPairsContainer">
						<span> Background color </span>
						<input
							className="defaultInput settingsStyleInput"
							placeholder={newObject.style.background}
							onChange={(e: any) =>
								updateStyles({ style: { background: e.target.value } })
							}
						/>
					</div>
					<div className="settingsStylesPairsContainer">
						<button
							className="defaultButton"
							onClick={() => setStyleDefault(true)}>
							{" "}
							Default{" "}
						</button>
					</div>
					<div className="settingsStylesPairsContainer">
						<button
							className="defaultButton"
							onClick={() => setStyleDefault(false)}>
							{" "}
							Default dark{" "}
						</button>
					</div>
				</div>
				<button
					onClick={() => setSettingsStyleActive(false)}
					className="defaultButton">
					Apply
				</button>
			</div>
			<div
				className={`overlay editOverlay ${
					settingsStyleActive ? "overlayActive" : ""
				}`}
				onClick={hideModal}></div>
		</>
	)
}

export default SettingsStylesModal
