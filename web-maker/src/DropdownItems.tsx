import React from 'react'
import DropdownItem from './DropdownItem'
import AddItem from './AddItem'
import AddImage from './AddImage'
// import types from "./types.js"

export const DropdownItems = (props: any) => {
	return (
		<div className={`dropdownMenuItems ${props.menuState ? "showDropdownItems" : "notShowDropdownItems"}`}>
			<AddItem type={"h1"} text={"Title"} content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} />
			<AddItem type={"h2"} text={"SubTitle"} content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} />
			<AddItem type={"h3"} text={"Heading"} content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} />
			<AddItem type={"p"} text={"Text"} content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} />
			<AddImage type={"img"} text={"Image"} imageSizes={props.imageSizes} src={props.imageSrc} applyCount={props.applyCount} content={props.content} setContent={props.setContent} editCount={props.editCount} setEditCount={props.setEditCount} setAddImageOverlayActive={props.setAddImageOverlayActive}/>
		</div>
	)
}

export default DropdownItems