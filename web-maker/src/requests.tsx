import React, { useEffect, useState } from 'react'

const url = "http://localhost:5000/"
const headersContent = {}

export const SaveProject = (content: object, sentCount: number) => {
	const [state, setState] = useState({ response: "", loading: true })
	const thisURL = url + "updateTokenObject"
	useEffect(() => {
		if (sentCount != 0) {
			var bodyContent = {
				token: "hi",
				object: "tesFromReactyhqy"
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