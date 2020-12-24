import React, { useEffect, useState } from 'react'

export const StylesToggle = (props: any) => {
	const [style, setStyle] = useState(false)

	const handleCheckbox = (event: any) => {
		if (event.target.checked) {
			props.savedStyle[props.propertyToToggle] = props.on
			setStyle(true)
		} else {
			props.savedStyle[props.propertyToToggle] = props.off
			setStyle(false)
		}
	}


	useEffect(() => {
		if (props.modalStateActive) {
			if (props.savedStyle[props.propertyToToggle] == props.on) {
				setStyle(true)
			} else {
				setStyle(false)
			}
		}
	}, [props.modalStateActive])

	return (
		<div className="stylesBorderContainer">
			<label className="checkboxContainer">
				<input onClick={(e: any) => handleCheckbox(e)} type="checkbox" checked={style} className="checkbox"></input>
				<div className="checkboxFill"></div>
			</label>
			<span> {props.nameOfStyle} </span>
		</div>
	)
}

export default StylesToggle