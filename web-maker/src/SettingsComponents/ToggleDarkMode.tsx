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
					setDarkModeActive(true)
					localStorage.setItem("dark-mode", "true")
				}}
				className={`${darkModeActive ? "notDisplay" : "display"}`}
				icon={faMoon}
			/>
			<FontAwesomeIcon
				onClick={() => {
					setDarkModeActive(false)
					localStorage.setItem("dark-mode", "false")
				}}
				className={`${darkModeActive ? "display" : "notDisplay"}`}
				icon={faSun}
			/>
		</>
	)
}

export default ToggleDarkMode
