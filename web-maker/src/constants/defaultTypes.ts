export const title: object = {
	type: "h1",
	text: "Title",
	content: "",
	style: {
		margin: "1%",
	},
	children: [],
}

export const subTitle: object = {
	type: "h2",
	text: "SubTitle",
	content: "",
	style: {
		margin: "1%",
	},
	children: [],
}

export const heading: object = {
	type: "h3",
	text: "Heading",
	content: "",
	style: {
		margin: "1%",
	},
	children: [],
}

export const span: object = {
	type: "span",
	text: "Text",
	content: "",
	style: {
		margin: "1%",
	},
	children: [],
}

export const div: object = {
	type: "div",
	text: "Text",
	content: "",
	style: {
		margin: "1%",
	},
	children: [],
}

export const image: object = {
	type: "img",
	// text: "Image",
	src:
		"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fcdn.ndtv.com%2Ftech%2Fimages%2Fgoogle_logo_redesign_2015_newest1.jpg&f=1&nofb=1",
	style: {
		margin: "1%",
		width: "",
		height: "",
	},
	children: null,
}

export const table: object = {
	type: "table",
	text: "Table",
	children: [],
	style: {
		textAlign: "center",
		tableLayout: "fixed",
		width: "98%",
		wordWrap: "break-word",
		margin: "1%",
		border: "1px solid",
	},
}

export const item: object = {
	type: "",
	text: "",
	content: "",
	style: {
		margin: "1%",
		maxWidth: "100%",
		wordWrap: "break-word",
		// opacity: 1
	},
	children: [],
}

export const columnItem: object = {
	type: "div",
	text: "Columns",
	content: "",
	style: {
		margin: "1%",
		maxWidth: "100%",
		padding: "2%",
		wordWrap: "break-word",
		display: "flex",
	},
	children: [
		{
			type: "p",
			text: "Text",
			content: "",
			style: {
				margin: "1%",
				width: "48%",
				maxWidth: "100%",
				wordWrap: "break-word",
			},
		},
		{
			type: "p",
			text: "Text",
			content: "",
			style: {
				margin: "1%",
				maxWidth: "100%",
				width: "48%",
				wordWrap: "break-word",
			},
		},
	],
}
