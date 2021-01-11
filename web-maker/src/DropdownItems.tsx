import React from "react"
import AddItem from "./AddComponents/AddItem"
import AddImage from "./AddComponents/AddImage"
import AddTable from "./AddComponents/AddTable"
import AddTextCollumns from "./AddComponents/AddTextCollumn"
import { faParagraph } from "@fortawesome/free-solid-svg-icons"
import { faHeading } from "@fortawesome/free-solid-svg-icons"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { faColumns } from "@fortawesome/free-solid-svg-icons"
import { faTable } from "@fortawesome/free-solid-svg-icons"

export const DropdownItems = (props: any) => {
	return (
		<div
			className={`dropdownMenuItems ${
				props.menuState ? "showDropdownItems" : "notShowDropdownItems"
			}`}>
			<AddItem
				title={"Add Title"}
				type={"h1"}
				text={"Title"}
				content={props.content}
				size={1}
				icon={faHeading}
				setContent={props.setContent}
				editCount={props.editCount}
				setEditCount={props.setEditCount}
			/>
			<AddItem
				title={"Add subtitle"}
				type={"h2"}
				text={"SubTitle"}
				content={props.content}
				size={0.9}
				icon={faHeading}
				setContent={props.setContent}
				editCount={props.editCount}
				setEditCount={props.setEditCount}
			/>
			<AddItem
				title={"Add header"}
				type={"h3"}
				text={"Heading"}
				content={props.content}
				size={0.8}
				icon={faHeading}
				setContent={props.setContent}
				editCount={props.editCount}
				setEditCount={props.setEditCount}
			/>
			<AddItem
				title={"Add text"}
				type={"p"}
				text={"Text"}
				content={props.content}
				icon={faParagraph}
				setContent={props.setContent}
				editCount={props.editCount}
				setEditCount={props.setEditCount}
			/>
			<AddImage
				title={"Add image"}
				type={"img"}
				text={"Image"}
				imageSizes={props.imageSizes}
				icon={faImage}
				src={props.imageSrc}
				applyImageCount={props.applyImageCount}
				content={props.content}
				setContent={props.setContent}
				editCount={props.editCount}
				setEditCount={props.setEditCount}
				setAddImageOverlayActive={props.setAddImageOverlayActive}
			/>
			<AddTable
				title={"Add table"}
				type={"table"}
				text={"Table"}
				tableSizes={props.tableSizes}
				icon={faTable}
				applyTableCount={props.applyTableCount}
				setApplyTableCount={props.setApplyTableCount}
				content={props.content}
				setContent={props.setContent}
				editCount={props.editCount}
				setEditCount={props.setEditCount}
				setAddTableOverlayActive={props.setAddTableOverlayActive}
			/>
			<AddTextCollumns
				title={"Add collumns"}
				content={props.content}
				setEditCount={props.setEditCount}
				icon={faColumns}
			/>
		</div>
	)
}

export default DropdownItems
