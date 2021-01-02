import React, { useEffect, useState } from 'react';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalLogin from './Modals/ModalLogin'


/* <FontAwesomeIcon icon={faPlusSquare} style={{ width: "" }} onClick={props.addToDivCount} className={props.previewMode ? "previewMode" : ""} /> */
const Login = (props: any) => {
	const handleClick = () => {
		props.setLoginModalStateActive(true)
	}
	return (
		<>
			<FontAwesomeIcon size={"1x"} icon={faUser} className={`preview ${props.previewMode ? "previewMode" : ""}`} onClick={handleClick} />
			<ModalLogin content={props.content} setContent={props.setContent} token={props.token} setToken={props.setToken} loginModalStateActive={props.loginModalStateActive} setLoginModalStateActive={props.setLoginModalStateActive} />
		</>
	);
}


export default Login;

