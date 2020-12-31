import React, { useEffect, useState } from 'react'

export const StylesToggle = (props: any) => {
	const [checkbox, setCheckbox] = useState(false)

	const handleCheckbox = (event: any) => {
		if (event.target.checked) {
			props.savedStyle[props.propertyToToggle] = props.on
			setCheckbox(true)
		} else {
			props.savedStyle[props.propertyToToggle] = props.off
			setCheckbox(false)
		}
	}

	useEffect(() => {
		props.savedCSSStyle[props.propertyToToggle] = props.on
		console.log("savedCSSStle changed")
	}, [props.savedStyle[props.propertyToToggle]])


	useEffect(() => {
		if (props.modalStateActive) {
			if (props.savedStyle[props.propertyToToggle] == props.on) {
				setCheckbox(true)
			} else {
				setCheckbox(false)
			}
		}
	}, [props.modalStateActive])

	return (
		<div className="stylesBorderContainer">
			<label className="checkboxContainer">
				<input onClick={(e: any) => handleCheckbox(e)} type="checkbox" checked={checkbox} className="checkbox"></input>
				<div className="checkboxFill"></div>
			</label>
			<span> {props.nameOfStyle} </span>
		</div>
	)
}

export default StylesToggle