import React, { useEffect, useState } from 'react';

const ModalImageSizeTable = (props: any) => {
	const [numberInputValue, setNumberInputValue] = useState({input1: "", input2: ""})
	const handleNumberInput1 = (event: any) => {
		setNumberInputValue(event.target.value)
		props.imageSizes.width = 1
	} 

	return (
		<table className="imageModalTable">
			<tr>
				<td>
					<div> Select magnitude </div>
				</td>
				<td>
					<select onChange={(e: any) => props.imageSizes.magnitude = e.target.value} className="preview imageModalSelect">
						<option value=""></option>
						<option value="%"> Percentage </option>
						<option value="px"> Pixel </option>
					</select>
				</td>
			</tr>
			<tr className="imageModalTable">
				<td>
					<span> Width </span>
				</td>
				<td>
					<input type="number" onChange={(e: any) => props.imageSizes.width = e.target.value} placeholder="Desired Image width" className="preview"></input>
				</td>
			</tr>
			<tr>
				<td>
					<span> Height </span>
				</td>
				<td>
					<input type="number" placeholder="Desired Image width" onChange={(e: any) => props.imageSizes.height = e.target.value} className="preview"></input>
				</td>
			</tr>
		</table>
	);
}


export default ModalImageSizeTable;
