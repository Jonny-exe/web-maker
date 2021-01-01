import React, { useEffect, useState } from 'react'
import { image } from './defaultTypes.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddImage = (props: any) => {
	const addImage = () => {
		props.setAddImageOverlayActive(true)
	}

	useEffect(() => {
		if (props.applyCount == 0) {
			return
		}
		console.log(props.content)
		// var content = props.content
		var itemCopy: any = {}
		Object.assign(itemCopy, image)
		console.log(props)
		itemCopy.text = props.text
		itemCopy.type = props.type
		itemCopy.src = props.src
		itemCopy.style = {width: props.imageSizes.width + props.imageSizes.magnitude, height: props.imageSizes.width + props.imageSizes.magnitude, margin: "1%"}
		console.log(itemCopy.style)
		console.log(itemCopy.style)
		// itemCopy.style.width = props.imageSizes.width + props.imageSizes.magnitude
		// itemCopy.style.height = props.imageSizes.height + props.imageSizes.magnitude
		props.content.push(itemCopy)
		props.setEditCount(props.editCount + 1)
	}, [props.applyImageCount])
	console.log(props.applyImageCount)

	return (
		<>
			<div onClick={addImage} className="dropdown">
				<FontAwesomeIcon size={"2x"} icon={props.icon}  />
			</div>
		</>
	)
}

export default AddImage