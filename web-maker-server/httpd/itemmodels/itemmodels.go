package itemmodels

import (
	"text/template"
)

// Item ..
var Item = template.Must(template.New("h3").Parse(`<{{.Type}} class="a{{.ClassIndex}}"> {{.Content}} </{{.Type}}>`))

// Image is for images because they must be done separtatly
var Image = template.Must(template.New("h3").Parse(`<{{.Type}} class="a{{.ClassIndex}}" src="{{.Src}}" ></{{.Type}}>`))

// var  = template.Must(template.New("h3").Parse(`<{{.Type}} class="a{{.ClassIndex}}"> {{.Content}} </{{.Type}}>`))

// CSSKeyValue ..
var CSSKeyValue = template.Must(template.New("h3").Parse(`{{.Key}}: {{.Value}};`))
var hTMLBegining string = "<!DOCTYPE html><html><body>"
var hTMLEnd string = "</body></html>"
var sTYLEBegingin string = "<steel"

// JoinHTMLandCSS ..
var JoinHTMLandCSS = template.Must(template.New("join").Parse(`<!DOCTYPE html><html><style>{{.CSS}}</style><body>{{.HTML}}</body></html>`))
