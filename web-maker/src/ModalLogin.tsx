import React, { useEffect, useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import ModalImageSizeTabel from './ModalImageSizeTable'
import { SaveProject, CreateProject, GetTokenFromRecovery, GetContentFromToken } from './requests'


const ModalLogin = (props: any) => {
	const textStyle = { fontSize: "150%", margin: "1%" }
	const [waitingForTokenFromRecoveryKey, setWaitingForTokenFromRecoveryKey] = useState(false)
	const [waitingForToken, setWaitingForToken] = useState(false)
	const [inputValue, setInputValue] = useState("")
	const [recoveryKeyInputValue, setRecoveryKeyInputValue] = useState("")
	const [tokenFromRecoveryKeyInputValue, setTokenFromRecoveryKeyInputValue] = useState("")
	const [tokenInputValue, setTokenInputValue] = useState("")
	const [createProjectActivated, setCreateProjectActivated] = useState(false)
	const [recoverTokenActivated, setRecoverTokenActivated] = useState(false)
	const [importProjectActivated, setImportProjectActivated] = useState(false)
	const [sentCount, setSentCount] = useState(0)
	const [createCount, setCreateCount] = useState(0)
	const [getContentCount, setGetContentCount] = useState(0)
	const [recoverTokenCount, setRecoverTokenCount] = useState(0)
	const [recoveryTooLong, setRecoveryTooLong] = useState(false)
	var { response } = SaveProject(props.token, props.content, sentCount)
	var { responseToken } = CreateProject(recoveryKeyInputValue, createCount)
	var { responseTokenFromRecovery } = GetTokenFromRecovery(tokenFromRecoveryKeyInputValue, recoverTokenCount)
	var { responseContent } = GetContentFromToken(tokenInputValue, getContentCount)
	console.log(response)

	useEffect(() => {
		if (responseContent != null && responseContent != undefined && responseContent.length != null) {
			console.log(responseContent)
			props.setContent(responseContent)
		}
	}, [responseContent])

	const handleLoginInput = (event: any) => {
		setInputValue(event.target.value)
	}

	const saveOnClick = () => {
		setSentCount(sentCount + 1)
	}

	const createProject = () => {
		if (recoveryKeyInputValue.length > 29) {
			setRecoveryTooLong(true)
		} else {
			setCreateCount(createCount + 1)
			setWaitingForToken(true)
		}
	}

	const importProject = () => {
		setGetContentCount(getContentCount + 1)
		hideModal()
	}

	console.log(responseContent)


	const hideModal = () => {
		props.setLoginModalStateActive(false)
		setRecoveryTooLong(false)
		setCreateProjectActivated(false)
		setWaitingForToken(false)
		props.setToken(responseToken)
		setWaitingForTokenFromRecoveryKey(false)
		setImportProjectActivated(false)
		setRecoverTokenActivated(false)
	}

	const recoverToken = () => {
		setRecoverTokenCount(recoverTokenCount + 1)
		setWaitingForTokenFromRecoveryKey(true)
	}

	console.log(props.token, createProjectActivated)

	if (props.token === "" && !createProjectActivated && !importProjectActivated) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> Create new project </span>
					<button className="preview loginInput loginButton" onClick={() => setCreateProjectActivated(true)}> Create </button>
					<span style={textStyle}> Import existing project </span>
					<button className="preview loginInput loginButton" onClick={() => setImportProjectActivated(true)}> Import </button>
				</div>
			</div>
		);
	} else if (props.token !== "") {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> Save your current project </span>
					<button onClick={saveOnClick} className="preview loginInput"> Save </button>
				</div>
			</div>
		);
	} else if (props.token === "" && createProjectActivated && !waitingForToken) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> Insert recovery key in case you forget your token </span>
					<input type="text" className="input loginInput" placeholder="Recovery key" value={recoveryKeyInputValue} onChange={(e: any) => setRecoveryKeyInputValue(e.target.value)}></input>
					<div className="informationDiv recoveryTooLong"> Make sure you save this recovery key. You will need the key in case you forget your token.</div>
					<div className={`informationDiv ${recoveryTooLong ? "alertDiv unhide" : "hide"}`}> You recovery key is too long, make sure its under 30 carachters </div>
					<button onClick={createProject} className="preview loginInput loginButton"> Create </button>
				</div>
			</div>
		)
	} else if (props.token === "" && createProjectActivated && waitingForToken) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> This is your project token </span>
					<span> {responseToken != null ? responseToken : ""} </span>
					<div className={`informationDiv `}> Make sure you save this token. You will need the key to edit you project the next time you want to edit it.</div>
					<button onClick={hideModal} className="preview"> Continue </button>
				</div>
			</div>
		)
	} else if (props.token === "" && importProjectActivated && !recoverTokenActivated) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> Import your project with your project token </span>
					<div className={`informationDiv `}> If you cant remember your token click recover token. You will be able to recover your token with your recovery key</div>
					<input type="text" className="input loginInput" placeholder="Token" value={tokenInputValue} onChange={(e: any) => setTokenInputValue(e.target.value)}></input>
					<div style={{ display: "flex", width: "50%", justifyContent: "center" }}>
						<button onClick={() => setRecoverTokenActivated(true)} className="preview loginInput loginButton" > Recovery </button>
						<button onClick={() => importProject()} className="preview loginInput loginButton" > Import </button>
					</div>
				</div>
			</div>
		)
	} else if (props.token === "" && importProjectActivated && recoverTokenActivated && !waitingForTokenFromRecoveryKey) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> Introduce recovery key to get your token </span>
					<input type="text" className="input loginInput" placeholder="Recovery key" value={tokenFromRecoveryKeyInputValue} onChange={(e: any) => setTokenFromRecoveryKeyInputValue(e.target.value)}></input>
					<button onClick={recoverToken} className="preview loginInput loginButton"> Submit </button>
				</div>
			</div>
		)
	} else if (props.token === "" && importProjectActivated && recoverTokenActivated && waitingForTokenFromRecoveryKey) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> This is your project token </span>
					<span> {responseTokenFromRecovery != null ? responseTokenFromRecovery : ""} </span>
					<div className={`informationDiv`}> Make sure you save this token. You will need the key to edit you project the next time you want to edit it.</div>
					<button onClick={hideModal} className="preview"> Continue </button>
				</div>
			</div>
		)
	} 
	return (<></>)
}


export default ModalLogin;
