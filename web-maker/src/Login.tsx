import React from "react"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ModalLogin from "./Modals/ModalLogin"

const Login = (props: any) => {
	const handleClick = () => {
		props.setLoginModalStateActive(true)
	}
	return (
		<>
			<FontAwesomeIcon
				title="Project settings"
				size={"1x"}
				icon={faUser}
				className={`preview ${props.previewMode ? "previewMode" : ""}`}
				onClick={handleClick}
			/>
			<ModalLogin
				content={props.content}
				setContent={props.setContent}
				token={props.token}
				setToken={props.setToken}
				loginModalStateActive={props.loginModalStateActive}
				setLoginModalStateActive={props.setLoginModalStateActive}
			/>
		</>
	)
}

export default Login
