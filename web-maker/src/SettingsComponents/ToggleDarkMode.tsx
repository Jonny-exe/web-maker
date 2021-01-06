import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon } from "@fortawesome/free-solid-svg-icons"
import { faSun } from "@fortawesome/free-solid-svg-icons"

interface Props {
	setDarkModeActive: (darkMode: boolean) => void
	darkModeActive: boolean
}

const ToggleDarkMode: React.FC<Props> = ({
	darkModeActive,
	setDarkModeActive,
}) => {
	return (
		<>
			<FontAwesomeIcon
				onClick={() => {
					setDarkModeActive(false)
					localStorage.setItem("dark-mode", "true")
				}}
				className={`${darkModeActive ? "display" : "notDisplay"}`}
				icon={faMoon}
			/>
			<FontAwesomeIcon
				onClick={() => {
					setDarkModeActive(true)
					localStorage.setItem("dark-mode", "false")
				}}
				className={`${darkModeActive ? "notDisplay" : "display"}`}
				icon={faSun}
			/>
		</>
	)
}

export default ToggleDarkMode
