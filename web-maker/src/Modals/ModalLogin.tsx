import React, { useEffect, useState } from "react"
import { textStyle } from "../constants/exceptionItems"
import {
	SaveProject,
	CreateProjectTokenRecovery,
	CreateProjectTokenObject,
	GetTokenFromRecovery,
	GetContentFromToken,
	GetFile,
	RemoveFile,
	CheckRecoveryKey,
} from "../requests"
import CreateOrImportProject from "./ModalLoginComponents/CreateOrImportProject"
import DownloadProject from "./ModalLoginComponents/DownloadProject"
import GiveNewProjectToken from "./ModalLoginComponents/GiveNewProjectToken"
import GiveNewProjectTokenFromRecoveryKey from "./ModalLoginComponents/GiveNewProjectTokenFromRecoveryKey"
import ImportProject from "./ModalLoginComponents/ImportProject"
import InsertRecoveryKey from "./ModalLoginComponents/InsertRecoveryKey"
import InsertRecoveryKeyToGetToken from "./ModalLoginComponents/InsertRecoveryKeyToGetToken"
import SaveOrExportProject from "./ModalLoginComponents/SaveOrExportProject"

const ModalLogin = (props: any) => {
	const [
		waitingForTokenFromRecoveryKey,
		setWaitingForTokenFromRecoveryKey,
	] = useState(false)
	const [getFileCount, setGetFileCount] = useState(0)
	const [removeFileCount, setRemoveFileCount] = useState(0)
	const [getFileActivated, setGetFileActivated] = useState(false)
	const [removeFileActivated, setRemoveFileActivated] = useState(false)
	const [waitingForToken, setWaitingForToken] = useState(false)
	const [recoveryKeyInputValue, setRecoveryKeyInputValue] = useState("")
	const [
		tokenFromRecoveryKeyInputValue,
		setTokenFromRecoveryKeyInputValue,
	] = useState("")
	const [tokenInputValue, setTokenInputValue] = useState(props.token)
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
	const [tokenToSet, setTokenToSet] = useState("")
	var { responseSavedStatus, loadingSaved } = SaveProject(
		sentCount,
		props.token,
		props.content
	)
	var { responseToken, loadingResponseToken } = CreateProjectTokenRecovery(
		recoveryKeyInputValue,
		createCount
	)
	CreateProjectTokenObject(props.content, props.token)
	var { responseTokenFromRecovery } = GetTokenFromRecovery(
		tokenFromRecoveryKeyInputValue,
		recoverTokenCount
	)
	var { loadingGetFile } = GetFile(props.token, getFileCount)
	RemoveFile(props.token, removeFileCount)
	var { responseContent } = GetContentFromToken(
		tokenInputValue,
		getContentCount
	)
	var { checkRecoveryKeyStatus, loadingCheckRecoveryKey } = CheckRecoveryKey(
		recoveryKeyInputValue,
		checkRecoveryKeyCount
	)

	useEffect(() => {
		if (
			responseContent !== null &&
			responseContent !== undefined &&
			responseContent.length !== 0
		) {
			props.setContent(responseContent)
			debugger
		}
	}, [responseContent])

	useEffect(() => {
		if (!loadingCheckRecoveryKey && checkRecoveryKeyStatus === 200) {
			createProject()
		}
	}, [checkRecoveryKeyStatus, loadingCheckRecoveryKey])

	useEffect(() => {
		if (
			!loadingResponseToken &&
			responseToken !== null &&
			responseToken !== ""
		) {
			setTokenToSet(responseToken)
		}
	}, [responseToken])

	useEffect(() => {
		if (!props.loginModalState && tokenToSet != "") {
			props.setToken(tokenToSet)
			localStorage.setItem("web-maker-token", tokenToSet)
		}
	}, [tokenToSet, props.loginModalState])

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

	const hideModal = () => {
		props.setLoginModalStateActive(false)
		setRecoveryTooLong(false)
		setSaveClicked(false)
		setCreateProjectActivated(false)
		setWaitingForToken(false)
		if (tokenToSet != "") {
			props.setToken(tokenToSet)
		}
		setWaitingForTokenFromRecoveryKey(false)
		setImportProjectActivated(false)
		setRecoverTokenActivated(false)
		setGetFileActivated(false)
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

	if (
		props.token === "" &&
		!createProjectActivated &&
		!importProjectActivated
	) {
		return (
			<CreateOrImportProject
				hideModal={hideModal}
				loginModalStateActive={props.loginModalStateActive}
				setCreateProjectActivated={setCreateProjectActivated}
				setImportProjectActivated={setImportProjectActivated}
			/>
		)
	} else if (props.token !== "" && !waitingForToken && !getFileActivated) {
		return (
			<SaveOrExportProject
				hideModal={hideModal}
				setContent={props.setContent}
				loginModalStateActive={props.loginModalStateActive}
				saveOnClick={saveOnClick}
				getFile={getFile}
				loadingSaved={loadingSaved}
				responseSavedStatus={responseSavedStatus}
				saveClicked={saveClicked}
				setToken={props.setToken}
			/>
		)
	} else if (props.token !== "" && !waitingForToken && getFileActivated) {
		return (
			<DownloadProject
				hideModal={hideModal}
				loadingGetFile={loadingGetFile}
				token={props.token}
				loginModalStateActive={props.loginModalStateActive}
			/>
		)
	} else if (props.token === "" && createProjectActivated && !waitingForToken) {
		return (
			<InsertRecoveryKey
				checkRecoveryKeyCount={checkRecoveryKeyCount}
				checkRecoveryKeyStatus={checkRecoveryKeyStatus}
				hideModal={hideModal}
				loginModalStateActive={props.loginModalStateActive}
				recoveryKeyInputValue={recoveryKeyInputValue}
				recoveryTooLong={recoveryTooLong}
				setCheckRecoveryKeyCount={setCheckRecoveryKeyCount}
				setRecoveryKeyInputValue={setRecoveryKeyInputValue}
			/>
		)
	} else if (createProjectActivated && waitingForToken) {
		return (
			<GiveNewProjectToken
				hideModal={hideModal}
				loginModalStateActive={props.loginModalStateActive}
				responseToken={responseToken}
			/>
		)
	} else if (
		props.token === "" &&
		importProjectActivated &&
		!recoverTokenActivated
	) {
		return (
			<ImportProject
				hideModal={hideModal}
				importProject={importProject}
				loginModalStateActive={props.loginModalStateActive}
				setRecoverTokenActivated={setRecoverTokenActivated}
				setTokenInputValue={setTokenInputValue}
				tokenInputValue={tokenInputValue}
			/>
		)
	} else if (
		props.token === "" &&
		importProjectActivated &&
		recoverTokenActivated &&
		!waitingForTokenFromRecoveryKey
	) {
		return (
			<InsertRecoveryKeyToGetToken
				hideModal={hideModal}
				loginModalStateActive={props.loginModalStateActive}
				recoverToken={recoverToken}
				setTokenFromRecoveryKeyInputValue={setTokenFromRecoveryKeyInputValue}
				tokenFromRecoveryKeyInputValue={tokenFromRecoveryKeyInputValue}
			/>
		)
	} else if (
		props.token === "" &&
		importProjectActivated &&
		recoverTokenActivated &&
		waitingForTokenFromRecoveryKey
	) {
		return (
			<GiveNewProjectTokenFromRecoveryKey
				hideModal={hideModal}
				loginModalStateActive={props.loginModalStateActive}
				responseTokenFromRecovery={responseTokenFromRecovery}
			/>
		)
	}
	return <>hi </>
}

export default ModalLogin
