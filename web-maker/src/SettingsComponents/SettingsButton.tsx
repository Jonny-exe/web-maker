import React from "react"
import { faCog } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
	previewMode: boolean
	setSettingsModalActive: (settingsStatus: boolean) => void
}

const SettingsButton: React.FC<Props> = ({
	previewMode,
	setSettingsModalActive,
}) => {
	return (
		<div title="Settings / Styles">
			<FontAwesomeIcon
				size={"2x"}
				icon={faCog}
				className={`settingsButton ${previewMode ? "previewMode" : ""}`}
				onClick={() => setSettingsModalActive(true)}
			/>
		</div>
	)
}

export default SettingsButton
