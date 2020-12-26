import React, { useEffect, useState } from 'react'

const url = "http://localhost:5000/"
const headersContent = {}

export const SaveProject = (token: string, content: object, sentCount: number) => {
	const [state, setState] = useState({ response: "", loading: true })
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
			setState(state => ({ response: state.response, loading: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: string = await response.json()
				setState({ response: data, loading: false })
			}
			loadData()
		} else {
			setState({ response: "", loading: false })
		}
	}, [sentCount])
	return state
}

export const CreateProject = (recoverykey: string, createCount: number) => {
	const [state, setState] = useState({ responseToken: "", loading: true })
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
			setState(state => ({ responseToken: state.responseToken, loading: true }))
			const loadData = async () => {
				const response = await fetch(thisURL, requestOptions)
				var data: string = await response.json()
				setState({ responseToken: data, loading: false })
			}
			loadData()
		} else {
			setState({ responseToken: "", loading: false })
		}
	}, [createCount])
	return state
}

export const GetTokenFromRecovery = (recoverykey: string, recoveryCount: number) => {
	const [state, setState] = useState({ responseTokenFromRecovery: "", loading: true })
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
				var data: string = await response.json()
				setState({ responseTokenFromRecovery: data, loading: false })
			}
			loadData()
		} else {
			setState({ responseTokenFromRecovery: "", loading: false })
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
