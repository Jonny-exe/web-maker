package itemmodels

import (
	"text/template"
)

var H1 = template.Must(template.New("h1").Parse(`<h1> {{.Text}} </h1>`))
var H2 = template.Must(template.New("h2").Parse(`<h2> {{.Text}} </h2>`))
var H3 = template.Must(template.New("h3").Parse(`<h3> {{.Text}} </h3>`))

// var H3 = template.Must(template.New("h3").Parse(`<h3> {{.Text}} </h3>`))
var Total = template.Must(template.New("h3").Parse(`<{{.Type}}> {{.Content}} </{{.Type}}>`))

// var H1, err = template.New("h1").Parse(`<h1> {{.Text}} </h1>`)
// var H1, err = template.New("h1").Parse(`<h1> {{.Text}} </h1>`)

// type types struct {
// 	H1 *template.Template `json:"h1"`
// 	H2 *template.Template `json:"h1"`
// 	H3 *template.Template `json:"h1"`
// }

// var TypesObject types = types{H1: template.Must(template.New("h1").Parse(`<h1> {{.Text}} </h1>`))}

// H1 ...
