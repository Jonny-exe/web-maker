import React, { useEffect, useState } from 'react'
import { image } from './defaultTypes.js'

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
		console.log(props.imageSizes.width)
		itemCopy.style = {width: props.imageSizes.width + props.imageSizes.magnitude, height: props.imageSizes.width + props.imageSizes.magnitude}
		console.log(itemCopy.style)
		// itemCopy.style.width = props.imageSizes.width + props.imageSizes.magnitude
		// itemCopy.style.height = props.imageSizes.height + props.imageSizes.magnitude
		props.content.push(itemCopy)
		props.setEditCount(props.editCount + 1)
	}, [props.applyCount])

	return (
		<>
			<div onClick={addImage} className="dropdown">
				Add {props.text}
			</div>
		</>
	)
}

export default AddImage