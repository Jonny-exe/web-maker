import React, { useState } from 'react'
import { image } from './defaultTypes.js'

const AddImage = (props: any) => {
	const [isModalSet, setIsModalSet] = useState(false)
	const addImage = () => {
		setIsModalSet(true)
		console.log(props.content)
		// var content = props.content
		var itemCopy: any = {}
		Object.assign(itemCopy, image)
		console.log(props)
		itemCopy.text = props.text
		itemCopy.type = props.type
		props.content.push(itemCopy)
		props.setEditCount(props.editCount + 1)
	}
	return (
		<>
			<div onClick={addImage} className="dropdown">
				Add {props.text}
			</div>
		</>
	)
}

export default AddImage