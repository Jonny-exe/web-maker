import React, { useEffect, useState } from 'react'

const Alerts = (props: any) => {
	const [alertsActive, setAlertsActive] = useState(false)
	const showAlert = () => {
		setAlertsActive(true)
		setTimeout(() => setAlertsActive(false), 7000)
	}
	console.log("Alerts: ", alertsActive)
  useEffect(() => {
    const interval = setInterval(() => {
			showAlert()
		}, 20 * 60000);
		return () => clearInterval(interval);
  }, []);
	return (
		<div className={`informationDiv ${alertsActive ? "alert": "hideAlert"}`}>
			Remember that you have to save your file. It wont save itself.
		</div>
	)
}

export default Alerts