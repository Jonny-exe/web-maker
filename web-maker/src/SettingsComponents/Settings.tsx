import React, { useState } from "react"
import { bodyObjectType } from "../constants/defaultTypes"
import SettingsButton from "./SettingsButton"
import SettingsModal from "./SettingsModal"

interface Props {
	previewMode: boolean
	content: any[] // Had to use because objecdt[] | bodyContentType[] doesnt work
	setContent: (newContent: { [key: string]: string }[]) => void
	editCount: number
	setEditCount: (editCount: number) => void
}

const Settings: React.FC<Props> = ({
	setEditCount,
	editCount,
	content,
	previewMode,
	setContent,
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
				setContent={setContent}
				contentBody={content[0]}
				setSettingsModalActive={setSettingsModalActive}
				settingsModalActive={settingsModalActive}
			/>
		</div>
	)
}

export default Settings
