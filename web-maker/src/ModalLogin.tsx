import React, { useEffect, useState } from 'react';
import ModalImageSizeTabel from './ModalImageSizeTable'
import { SaveProject } from './requests'


const ModalLogin = (props: any) => {
	const textStyle = { fontSize: "150%" }
	const [inputValue, setInputValue] = useState("")
	const [sentCount, setSentCount] = useState(1)
	var { response } = SaveProject({}, sentCount)
	console.log(response)

	const handleLoginInput = (event: any) => {
		setInputValue(event.target.value)
	}

	const saveOnClick = () => {
		setSentCount(sentCount + 1)
	}
	return (
		<div className="imageModalContainer">
			<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={() => props.setLoginModalStateActive(false)}></div>
			<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
				<span style={textStyle}> Use the project token to edit a started project </span>
				<input type="text" className="input loginInput" placeholder="Project token" value={inputValue} onChange={handleLoginInput}></input>
				<span style={textStyle}> Save your current project </span>
				<button onClick={saveOnClick} className="preview loginInput"> Save </button>
			</div>
		</div>
	);
}


export default ModalLogin;
