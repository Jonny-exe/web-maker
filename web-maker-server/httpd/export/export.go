package export

import (
	// "fmt"

	"bytes"
	"text/template"

	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/itemmodels"
	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/models"
	// "os"
	// "html/template" // You coulld use html/template but. This makes everything safer but it creates machine code which is not pleasent to read
)

var h1, err = template.New("h1").Parse(`<h1> {{.Text}} </h1>`)

// Export .
func Export(content models.Content) string {
	var finalHTML string
	// var objectContent []interface{} = json
	contentLength := len(content)
	for i := 0; i < contentLength; i++ {
		HTMLItem := createHTMLItem(content[i])
		finalHTML += HTMLItem
	}

	return finalHTML

}

// Test ...
func Test() {
}

func createHTMLItem(item models.ContentItem) string {
	buf := new(bytes.Buffer)
	inputs := item
	var err error
	err = itemmodels.Total.Execute(buf, inputs)

	if err != nil {
		panic(err)
	}
	return buf.String()
}
