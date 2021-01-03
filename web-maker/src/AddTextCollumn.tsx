import React from 'react'
import { columnItem } from './defaultTypes.js'
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddTextCollumns = (props: any) => {
	const addTitle = () => {
		var itemCopy = JSON.parse(JSON.stringify(columnItem));
		props.content.push(itemCopy)
		props.setEditCount(props.editCount + 1)
	}
	return (
		<div onClick={addTitle} className="dropdown">
			<FontAwesomeIcon size={"2x"} icon={faColumns}  />
		</div>
	)
}

export default AddTextCollumns