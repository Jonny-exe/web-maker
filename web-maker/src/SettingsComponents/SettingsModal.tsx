import React, { useState } from "react"
import { bodyObject, bodyObjectType } from "../constants/defaultTypes"
import SettingsStylesModal from "./SettingsStylesModal"
import ToggleDarkMode from "./ToggleDarkMode"

interface Props {
	setSettingsModalActive: (settingsStatus: boolean) => void
	settingsModalActive: boolean
	contentBody: bodyObjectType
	content: object[] // I separte them so I am able to asing types to only content[0]
	editCount: number
	setEditCount: (editCount: number) => void
	setDarkModeActive: (darkMode: boolean) => void
	darkModeActive: boolean
}

const SettingsModal: React.FC<Props> = ({
	content,
	contentBody,
	setSettingsModalActive,
	settingsModalActive,
	editCount,
	setDarkModeActive,
	darkModeActive,
	setEditCount,
}) => {
	const [newTitleValue, setNewTitleValue] = useState("")
	const [newObject, setNewObject] = useState(contentBody)
	const [settingsStyleActive, setSettingsStyleActive] = useState(false)

	const applySettings = () => {
		for (let [style, value] of Object.entries(newObject)) {
			if (value === "" || value === null || value === undefined) {
				value = bodyObject[value] // This may not work and you have to do newObject[style] instead of bodyObject
			}
		}
		if (contentBody !== undefined && contentBody !== null) {
			content.splice(0, 1, newObject)
		}
		hideModal()
		setEditCount(editCount + 1)
	}

	const hideModal = () => {
		setSettingsStyleActive(false)
		setSettingsModalActive(false)
	}

	if (settingsStyleActive) {
		return (
			<SettingsStylesModal
				hideModal={hideModal}
				setNewObject={setNewObject}
				newObject={newObject}
				setSettingsStyleActive={setSettingsStyleActive}
				settingsStyleActive={settingsStyleActive}
			/>
		)
	}
	return (
		<>
			<div
				className={`modal settingsModal ${
					settingsModalActive ? "modalActive" : ""
				}`}>
				<h2>
					{" "}
					Settings{" "}
					<ToggleDarkMode
						setDarkModeActive={setDarkModeActive}
						darkModeActive={darkModeActive}
					/>{" "}
				</h2>
				<input
					className="defaultInput"
					style={{ display: "inline-block" }}
					placeholder="Your webpage title"
					value={newTitleValue}
					onChange={(e: any) => setNewTitleValue(e.target.value)}
				/>
				<div className="settingsButtonContainer">
					<button
						className="defaultButton settingsButtons"
						onClick={() => setSettingsStyleActive(true)}>
						{" "}
						Style{" "}
					</button>
					<button
						className="defaultButton settingsButtons"
						onClick={applySettings}>
						{" "}
						Apply{" "}
					</button>
				</div>
			</div>
			<div
				className={`overlay editOverlay ${
					settingsModalActive ? "overlayActive" : ""
				}`}
				onClick={() => setSettingsModalActive(false)}></div>
		</>
	)
}

export default SettingsModal
