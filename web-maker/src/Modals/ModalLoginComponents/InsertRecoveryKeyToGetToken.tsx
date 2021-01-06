import React from "react"
import { textStyle } from "../../constants/exceptionItems"

interface Props {
	setTokenFromRecoveryKeyInputValue: (value: string) => void
	hideModal: () => void
	loginModalStateActive: boolean
	tokenFromRecoveryKeyInputValue: string
	recoverToken: () => void
}

const InsertRecoveryKeyToGetToken: React.FC<Props> = ({
	hideModal,
	loginModalStateActive,
	tokenFromRecoveryKeyInputValue,
	recoverToken,
	setTokenFromRecoveryKeyInputValue,
}) => {
	return (
		<div className="loginModalContainer">
			<div
				className={`overlay ${loginModalStateActive ? "overlayActive" : ""}`}
				onClick={hideModal}></div>
			<div
				className={`loginModal modal ${
					loginModalStateActive ? "modalActive" : ""
				}`}>
				<span style={textStyle}>Introduce recovery key to get your token</span>
				<div className="informationDiv">
					This recovery key has to be unique so try with a personal phrase or
					something like that.
				</div>
				<input
					type="text"
					className="defaultInput"
					placeholder="Recovery key"
					value={tokenFromRecoveryKeyInputValue}
					onChange={(e: any) =>
						setTokenFromRecoveryKeyInputValue(e.target.value)
					}
				/>
				<button onClick={recoverToken} className="defaultButton">
					Submit
				</button>
			</div>
		</div>
	)
}

export default InsertRecoveryKeyToGetToken
