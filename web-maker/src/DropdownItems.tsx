import React from 'react'
import DropdownItem from './DropdownItem'
import AddItem from './AddItem'
import AddImage from './AddImage'
import AddTable from './AddTable'
import AddTextCollumns from './AddTextCollumn'
import { faParagraph } from "@fortawesome/free-solid-svg-icons";
import { faHeading } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faColumns } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
// import types from "./types.js"

export const DropdownItems = (props: any) => {
	return (
		<div className={`dropdownMenuItems ${props.menuState ? "showDropdownItems" : "notShowDropdownItems"}`}>
			<AddItem type={"h1"} text={"Title"} content={props.content} size={1} icon={faHeading} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} />
			<AddItem type={"h2"} text={"SubTitle"} content={props.content} size={0.9} icon={faHeading} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} />
			<AddItem type={"h3"} text={"Heading"} content={props.content} size={0.8} icon={faHeading} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} />
			<AddItem type={"p"} text={"Text"} content={props.content} icon={faParagraph} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} />
			<AddImage type={"img"} text={"Image"} imageSizes={props.imageSizes} icon={faImage} src={props.imageSrc} applyImageCount={props.applyImageCount} content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} setAddImageOverlayActive={props.setAddImageOverlayActive} />
			<AddTable type={"table"} text={"Table"} tableSizes={props.tableSizes} icon={faTable} applyTableCount={props.applyTableCount} setApplyTableCount={props.setApplyTableCount} content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} setAddTableOverlayActive={props.setAddTableOverlayActive} />
			<AddTextCollumns content={props.content} setEditCount={props.setEditCount} icon={faColumns} />
		</div>
	)
}

export default DropdownItems