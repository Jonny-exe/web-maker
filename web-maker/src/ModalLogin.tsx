import React, { useEffect, useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import ModalImageSizeTabel from './ModalImageSizeTable'
import { SaveProject, CreateProjectTokenRecovery, CreateProjectTokenObject, GetTokenFromRecovery, GetContentFromToken, GetFile, RemoveFile, CheckRecoveryKey } from './requests'


const ModalLogin = (props: any) => {
	const textStyle = { fontSize: "150%", margin: "1%" }
	const [waitingForTokenFromRecoveryKey, setWaitingForTokenFromRecoveryKey] = useState(false)
	const [getFileCount, setGetFileCount] = useState(0)
	const [removeFileCount, setRemoveFileCount] = useState(0)
	const [getFileActivated, setGetFileActivated] = useState(false)
	const [removeFileActivated, setRemoveFileActivated] = useState(false)
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
	const [checkRecoveryKeyCount, setCheckRecoveryKeyCount] = useState(0)
	const [recoveryTooLong, setRecoveryTooLong] = useState(false)
	const [saveClicked, setSaveClicked] = useState(false)
	const [recoveryKeyValid, setRecoveryKeyValid] = useState(false)
	const [tokenToSet, setTokenToSet] = useState("")
	var { responseSavedStatus, loadingSaved } = SaveProject(sentCount, props.token, props.content)
	var { responseToken, loadingResponseToken } = CreateProjectTokenRecovery(recoveryKeyInputValue, createCount)
	var { responseStatus } = CreateProjectTokenObject(props.content, props.token)
	var { responseTokenFromRecovery } = GetTokenFromRecovery(tokenFromRecoveryKeyInputValue, recoverTokenCount)
	var { getFileStatus, loadingGetFile } = GetFile(props.token, getFileCount)
	var { removeFileStatus, loadingRemoveFile} = RemoveFile(props.token, removeFileCount)
	var { responseContent } = GetContentFromToken(tokenInputValue, getContentCount)
	var { checkRecoveryKeyStatus, loadingCheckRecoveryKey } = CheckRecoveryKey(recoveryKeyInputValue, checkRecoveryKeyCount)
	console.log(checkRecoveryKeyCount)

	useEffect(() => {
		if (responseContent != null && responseContent != undefined && responseContent.length != null) {
			console.log(responseContent)
			props.setContent(responseContent)
		}
	}, [responseContent])

	useEffect(() => {
		console.log(loadingCheckRecoveryKey, checkRecoveryKeyStatus)
		if (!loadingCheckRecoveryKey && checkRecoveryKeyStatus == 200) {
			setRecoveryKeyValid(true)
			createProject()
		}
	}, [checkRecoveryKeyStatus, loadingCheckRecoveryKey	])

	useEffect(() => {
		if (!loadingResponseToken && responseToken != null && responseToken != "") {
			setTokenToSet(responseToken)
		}
	}, [responseToken])

	useEffect(() => {
		if (!props.loginModalState) {
			props.setToken(tokenToSet)
		}
	}, [tokenToSet, props.loginModalState])

	const handleLoginInput = (event: any) => {
		setInputValue(event.target.value)
	}

	const saveOnClick = () => {
		setSentCount(sentCount + 1)
		setSaveClicked(true)
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
		// props.setToken(tokenInputValue)
		setTokenToSet(tokenInputValue)
		hideModal()
	}

	console.log(responseContent)


	const hideModal = () => {
		props.setLoginModalStateActive(false)
		setRecoveryTooLong(false)
		setSaveClicked(false)
		setCreateProjectActivated(false)
		setWaitingForToken(false)
		props.setToken(tokenToSet)
		setWaitingForTokenFromRecoveryKey(false)
		setImportProjectActivated(false)
		setRecoverTokenActivated(false)
		setGetFileActivated(false)
		setRecoveryKeyValid(false)
		if (removeFileActivated) {
			setRemoveFileCount(removeFileCount + 1)
			setRemoveFileActivated(false)
		}
	}

	const getFile = () => {
		setGetFileActivated(true)
		setGetFileCount(getFileCount + 1)
		setRemoveFileActivated(true)
	}

	const recoverToken = () => {
		setRecoverTokenCount(recoverTokenCount + 1)
		setWaitingForTokenFromRecoveryKey(true)
	}

	console.log("Token: ", props.token)

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
	} else if (props.token !== "" && !waitingForToken && !getFileActivated) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> Save your current project </span>
					<button onClick={saveOnClick} className="preview loginInput loginButton"> Save </button>
					<span className={`informationDiv ${responseSavedStatus == 200 && !loadingSaved && saveClicked ? "unhide" : "hide"}`}> Saved successfully </span>
					<span className={`alertDiv ${responseSavedStatus == 500 && !loadingSaved && saveClicked ? "unhide" : "hide"}`}> Unsuccessfull save, please try again later </span>
					<button onClick={getFile} className="preview loginInput loginButton"> Get html file </button>
				</div>
			</div>
		);
	} else if (props.token !== "" && !waitingForToken && getFileActivated) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span> {loadingGetFile ? "Loading file" : ""} </span>
					<a href={`${props.token}.html`} className={`preview loginInput loginButton ${loadingGetFile ? "hide" : "unhide"}`} download="index.html" > Download file </a>
				</div>
			</div>
		)
	} else if (props.token === "" && createProjectActivated && !waitingForToken) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> Insert recovery key in case you forget your token </span>
					<input type="text" className="input loginInput" placeholder="Recovery key" value={recoveryKeyInputValue} onChange={(e: any) => setRecoveryKeyInputValue(e.target.value)}></input>
					<div className="informationDiv recoveryTooLong"> Make sure you save this recovery key. You will need the key in case you forget your token.</div>
					<div className={`informationDiv ${recoveryTooLong ? "alertDiv unhide" : "hide"}`}> You recovery key is too long, make sure its under 30 carachters </div>
					<div className={`alertDiv ${checkRecoveryKeyStatus == 500 ? "unhide" : "hide"}`}> The recovery key is already taken </div>
					<button onClick={() => setCheckRecoveryKeyCount(checkRecoveryKeyCount + 1)} className="preview loginInput loginButton"> Create </button>
				</div>
			</div>
		)
	} else if (props.token === "" && createProjectActivated && waitingForToken) {
		return (
			<div className="loginModalContainer">
				<div className={`overlay ${props.loginModalStateActive ? "overlayActive" : ""}`} onClick={hideModal}></div>
				<div className={`loginModal editModal ${props.loginModalStateActive ? "editModalActive" : ""}`}>
					<span style={textStyle}> This is your project token </span>
					<span>{responseToken != null ? responseToken : ""}</span>
					<div className={`informationDiv `}> Make sure you save this token. You will need the key to edit you project the next time you want to edit it.</div>
					<button onClick={hideModal} className="preview loginButton" style={{ margin: "1%" }}> Continue </button>
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
						<button onClick={importProject} className="preview loginInput loginButton" > Import </button>
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
					<div className="informationDiv"> This recovery key has to be unique so try with a personal phrase or something like that. </div>
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
					<span>{responseTokenFromRecovery != null ? responseTokenFromRecovery == 500 ? "Wrong recovery key" : responseTokenFromRecovery : ""}</span>
					<div className={`informationDiv`}> Make sure you save this token. You will need the key to edit you project the next time you want to edit it.</div>
					<button onClick={hideModal} className="preview"> Continue </button>
				</div>
			</div>
		)
	}
	return (<></>)
}


export default ModalLogin;
