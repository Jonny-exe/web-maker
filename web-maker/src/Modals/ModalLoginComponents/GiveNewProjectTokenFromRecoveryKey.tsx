import React from "react"
import { textStyle } from "../../constants/exceptionItems"

interface Props {
	loginModalStateActive: boolean
	hideModal: () => void
	responseTokenFromRecovery: number | null
}
const GiveNewProjectTokenFromRecoveryKey: React.FC<Props> = ({
	loginModalStateActive,
	hideModal,
	responseTokenFromRecovery,
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
				<span style={textStyle}> This is your project token </span>
				<span>
					{responseTokenFromRecovery !== null
						? responseTokenFromRecovery == 500
							? "Wrong recovery key"
							: responseTokenFromRecovery
						: ""}
				</span>
				<div className={`informationDiv`}>
					Make sure you save this token. You will need the key to edit you
					project the next time you want to edit it.
				</div>
				<button onClick={hideModal} className="preview loginButton loginInput">
					Continue
				</button>
			</div>
		</div>
	)
}

export default GiveNewProjectTokenFromRecoveryKey
