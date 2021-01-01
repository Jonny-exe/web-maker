import React from "react"
import "./AppLandingPage.css"
const AppLandingPage = () => {
	return (
		<div className="landingPage">
			<p className="mainHeader"> Hi, this is web-maker</p>
			<div style={{ borderBottom: "solid 1px", margin: "2%" }}>
				<p className="seccondaryHeader"> Web-maker is a tool to create simple web applications with zero coding skills </p>
			</div>
			<p className="seccondaryHeader"> Make you own web in three easy steps </p>
			<p className="explication">
				1. Creat a project
			</p>
			<p className="explication">
				2. Add all the items you need
			</p>
			<p className="explication">
				3. Export it into a finished HTML file
			</p>
			<p className="seccondaryHeader">
				Your new web is on a click of a button
			</p>
			<a href="/web-maker">
				<button className="button"> Start </button>
			</a>
			<p className="seccondaryHeader">
				Good luck on your jouney
			</p>
		</div>
	);
}

export default AppLandingPage