import React, { useEffect, useState } from 'react'

const url = "http://localhost:5000/"
const headersContent = {}

export const SaveProject = (sentCount: number, token: string, content: object) => {
	const [state, setState] = useState({ responseSavedStatus: 0, loadingSaved: true })
	const thisURL = url + "updateTokenObject"
	useEffect(() => {
		if (sentCount != 0) {
			var bodyContent = {
				token: token,
				object: content
			}
			const requestOptions = {
				method: 'POST',
				headers: headersContent,
				// credentials: 'same-origin',
				body: JSON.stringify(bodyContent)
			}
			setState(state => ({ responseSavedStatus: state.responseSavedStatus, loadingSaved: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: number = await response.json()
				setState({ responseSavedStatus: data, loadingSaved: false })
			}
			loadData()
		} else {
			setState({ responseSavedStatus: 0, loadingSaved: false })
		}
	}, [sentCount])
	return state
}

export const CreateProjectTokenRecovery = (recoverykey: string, createCount: number) => {
	const [state, setState] = useState({ responseToken: "", loadingResponseToken: true })
	const thisURL = url + "insertTokenRecovery"
	useEffect(() => {
		console.log(createCount)
		if (createCount > 0 && createCount != null && createCount != undefined) {
			var bodyContent = {
				recovery_key: recoverykey
			}
			const requestOptions = {
				method: 'POST',
				headers: headersContent,
				// credentials: 'same-origin',
				body: JSON.stringify(bodyContent)
			}
			setState(state => ({ responseToken: state.responseToken, loadingResponseToken: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: string = await response.json()
				setState({ responseToken: data, loadingResponseToken: false })
			}
			loadData()
		} else {
			setState({ responseToken: "", loadingResponseToken: false })
		}
	}, [createCount])
	return state
}

export const CreateProjectTokenObject = (content: any, token: string) => {
	const [state, setState] = useState({ responseStatus: "", loading: true })
	const thisURL = url + "insertTokenObject"
	useEffect(() => {
		if (token != "" && token != null && token != undefined) {
			var bodyContent = {
				content: content,
				token: token
			}
			const requestOptions = {
				method: 'POST',
				headers: headersContent,
				// credentials: 'same-origin',
				body: JSON.stringify(bodyContent)
			}
			setState(state => ({ responseStatus: state.responseStatus, loading: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: string = await response.json()
				setState({ responseStatus: data, loading: false })
			}
			loadData()
		} else {
			setState({ responseStatus: "", loading: false })
		}
	}, [token])
	return state
}

export const GetTokenFromRecovery = (recoverykey: string, recoveryCount: number) => {
	const [state, setState] = useState({ responseTokenFromRecovery: null, loading: true })
	const thisURL = url + "getTokenFromRecovery"
	useEffect(() => {
		if (recoveryCount > 0 && recoveryCount != null && recoveryCount != undefined) {
			var bodyContent = {
				recovery_key: recoverykey
			}
			const requestOptions = {
				method: 'POST',
				headers: headersContent,
				// credentials: 'same-origin',
				body: JSON.stringify(bodyContent)
			}
			setState(state => ({ responseTokenFromRecovery: state.responseTokenFromRecovery, loading: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: any = await response.json()
				setState({ responseTokenFromRecovery: data, loading: false })
			}
			loadData()
		} else {
			setState({ responseTokenFromRecovery: null, loading: false })
		}
	}, [recoveryCount])
	return state
}


export const GetContentFromToken = (token: string, getContentCount: number) => {
	const [state, setState] = useState({ responseContent: [], loading: true })
	const thisURL = url + "getObjectFromToken"
	useEffect(() => {
		if (getContentCount > 0 && getContentCount != null && getContentCount != undefined) {
			var bodyContent = {
				token: token
			}
			const requestOptions = {
				method: 'POST',
				headers: headersContent,
				// credentials: 'same-origin',
				body: JSON.stringify(bodyContent)
			}
			setState(state => ({ responseContent: state.responseContent, loading: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: [] = await response.json()
				setState({ responseContent: data, loading: false })
			}
			loadData()
		} else {
			setState({ responseContent: [], loading: false })
		}
	}, [getContentCount])
	return state
}

export const GetFile = (token: string, getFileCount: number) => {
	const [state, setState] = useState({ getFileStatus: 0, loadingGetFile: true })
	const thisURL = url + "exportIntoHTML"
	useEffect(() => {
		if (getFileCount > 0 && getFileCount != null && getFileCount != undefined) {
			var bodyContent = {
				token: token
			}
			const requestOptions = {
				method: 'POST',
				headers: headersContent,
				// credentials: 'same-origin',
				body: JSON.stringify(bodyContent)
			}
			setState(state => ({ getFileStatus: state.getFileStatus, loadingGetFile: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: number = await response.json()
				setState({ getFileStatus: data, loadingGetFile: false })
			}
			loadData()
		} else {
			setState({ getFileStatus: 500, loadingGetFile: false })
		}
	}, [getFileCount])
	return state
}

export const RemoveFile = (token: string, removeFileCount: number) => {
	const [state, setState] = useState({ removeFileStatus: 0, loadingRemoveFile: true })
	const thisURL = url + "removeFile"
	useEffect(() => {
		if (removeFileCount > 0 && removeFileCount != null && removeFileCount != undefined) {
			var bodyContent = {
				token: token
			}
			const requestOptions = {
				method: 'POST',
				headers: headersContent,
				// credentials: 'same-origin',
				body: JSON.stringify(bodyContent)
			}
			setState(state => ({ removeFileStatus: state.removeFileStatus, loadingRemoveFile: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: number = await response.json()
				setState({ removeFileStatus: data, loadingRemoveFile: false })
			}
			loadData()
		} else {
			setState({ removeFileStatus: 500, loadingRemoveFile: false })
		}
	}, [removeFileCount])
	return state
}


export const CheckRecoveryKey = (recoveryKey: string, checkRecoveryKeyCount: number) => {
	const [state, setState] = useState({ checkRecoveryKeyStatus: 0, loadingCheckRecoveryKey: true })
	const thisURL = url + "doesRecoveryKeyExist"
	useEffect(() => {
		if (checkRecoveryKeyCount > 0 && checkRecoveryKeyCount != null && checkRecoveryKeyCount != undefined) {
			var bodyContent = {
				recovery_key: recoveryKey
			}
			const requestOptions = {
				method: 'POST',
				headers: headersContent,
				// credentials: 'same-origin',
				body: JSON.stringify(bodyContent)
			}
			setState(state => ({ checkRecoveryKeyStatus: state.checkRecoveryKeyStatus, loadingCheckRecoveryKey: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: number = await response.json()
				setState({ checkRecoveryKeyStatus: data, loadingCheckRecoveryKey: false })
			}
			loadData()
		} else {
			setState({ checkRecoveryKeyStatus: 0, loadingCheckRecoveryKey: false })
		}
	}, [checkRecoveryKeyCount])
	return state
}