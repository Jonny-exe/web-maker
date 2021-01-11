import React, { useState } from "react"
import { bodyObjectType } from "../constants/defaultTypes"
import SettingsButton from "./SettingsButton"
import SettingsModal from "./SettingsModal"
import ToggleDarkMode from "./ToggleDarkMode"

interface Props {
	previewMode: boolean
	content: any[] // Had to use because objecdt[] | bodyContentType[] doesnt work
	editCount: number
	setEditCount: (editCount: number) => void
	setDarkModeActive: (darkMode: boolean) => void
	darkModeActive: boolean
}

const Settings: React.FC<Props> = ({
	setEditCount,
	editCount,
	content,
	previewMode,
	setDarkModeActive,
	darkModeActive,
}) => {
	const [settingsModalActive, setSettingsModalActive] = useState(false)

	return (
		<div>
			<SettingsButton
				setSettingsModalActive={setSettingsModalActive}
				previewMode={previewMode}
			/>
			<SettingsModal
				setEditCount={setEditCount}
				editCount={editCount}
				content={content}
				contentBody={content[0]}
				setSettingsModalActive={setSettingsModalActive}
				settingsModalActive={settingsModalActive}
				setDarkModeActive={setDarkModeActive}
				darkModeActive={darkModeActive}
			/>
		</div>
	)
}

export default Settings
