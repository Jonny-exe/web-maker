import React, { useEffect } from 'react'
import { table } from './defaultTypes.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddTable = (props: any) => {
	const addTable = () => {
		props.setAddTableOverlayActive(true)
	}

	useEffect(() => {
		if (props.applyTableCount === 0) {
			return
		}
		var itemCopy = JSON.parse(JSON.stringify(table)); //You cant use Object.assign because its not a deep copy
		
		console.log("TableSizes: ", props.tableSizes)
		for (let i = 0; i < props.tableSizes.height; i++) {
			itemCopy.children.push({
				type: "tr",
				text: "Tr",
				style: {
					// margin: "1%",
					border: "1px solid"
				},
				children: []
			})
			
			for (let n = 0; n < props.tableSizes.width; n++) {
				itemCopy.children[i].children.push({
					type: "td",
					text: "Td",
					content: "",
					children: [],
					style: {
						width: `${100 / props.tableSizes.width - 1}`,
						// display: "block",
						textAlign: "center",
						// margin: "1%",
						border: "1px solid"
					},
				})
			}
		}
		// itemCopy.style.width = props.imageSizes.width + props.imageSizes.magnitude
		// itemCopy.style.height = props.imageSizes.height + props.imageSizes.magnitude
		console.log("itemcopy: ", itemCopy)
		props.content.push(itemCopy)
		
		props.setEditCount(props.editCount + 1)
	}, [props.applyTableCount])
	console.log("AddTable props.applyTableCount:", props.applyTableCount)

	return (
		<>
			<div onClick={addTable} className="dropdown">
				<FontAwesomeIcon size={"2x"} icon={props.icon} />
			</div>
		</>
	)
}

export default AddTable