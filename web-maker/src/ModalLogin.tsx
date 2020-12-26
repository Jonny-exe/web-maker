import React, { useEffect, useState } from 'react';
import ModalImageSizeTabel from './ModalImageSizeTable'
import { SaveProject } from './requests'


const ModalLogin = (props: any) => {
	const textStyle = { fontSize: "150%" }
	const [inputValue, setInputValue] = useState("")
	const [sentCount, setSentCount] = useState(1)
	var { response } = SaveProject(props.token, props.content, sentCount)
	console.log(response)

	const handleLoginInput = (event: any) => {
		setInputValue(event.target.value)
	}

	const saveOnClick = () => {
		setSentCount(sentCount + 1)
	}
	if (props.token === "") {
		return (
		<div className="loginModalContainerCreate">
			<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={() => props.setLoginModalStateActive(false)}></div>
			<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
				<span style={textStyle}> Create new project </span>
				<button className="preview loginInput"> Create </button>
				<span style={textStyle}> Import existing project </span>
				<input type="text" className="input loginInput" placeholder="Project token" value={inputValue} onChange={handleLoginInput}></input>
			</div>
		</div>
		);
	}
	return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={() => props.setLoginModalStateActive(false)}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> Save your current project </span>
					<button onClick={saveOnClick} className="preview loginInput"> Save </button>
				</div>
			</div>
	);
}


export default ModalLogin;
