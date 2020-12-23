import React, { useState } from 'react'
import { item } from './defaultTypes.js'

const AddItem = (props: any) => {
	const addTitle = () => {
		console.log(props.content)
		// var content = props.content
		var itemCopy: any = {}
		Object.assign(itemCopy, item)
		console.log(props)
		itemCopy.text = props.text
		itemCopy.type = props.type
		props.content.push(itemCopy)
		props.setEditCount(props.editCount + 1)
	}
	return (
		<div onClick={addTitle} className="dropdown">
			Add {props.text}
		</div>
	)
}

export default AddItem