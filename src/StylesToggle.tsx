import React, { useState } from 'react'

export const StylesToggle = (props: any) => {
	const handleCheckbox = (event: any) => {
		if (event.target.checked) {
			props.savedStyle[props.propertyToToggle] = "solid"
		} else {
			props.savedStyle[props.propertyToToggle] = "none"
		}
	}

	console.log(props.html)
	return (
		<div className="stylesBorderContainer">
			<label className="checkboxContainer">
				<input onChange={(e: any) => handleCheckbox(e)} type="checkbox" className="checkbox"></input>
				<div className="checkboxFill"></div>
			</label>
			<span> {props.nameOfStyle} </span>
		</div>
	)
}

export default StylesToggle