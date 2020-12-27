package export
import (
	"fmt"
	"log"
	"text/template"
	// "html/template" // You coulld use html/template but. This makes everything safer but it creates machine code which is not pleasent to read
)

func Export(content: string) {
	var finalHtml: string
	contentLength := len(content)
	for  i = 0; i < contentLength; i++ {
		content[i] 
	}

}

func createHtmlItem(item: interface{}) string {
	var resultItem: string
	var output interface
	t, err := template.New("foo").Parse(`{{define "T"}}Hello, {{.}}!{{end}}`)
	if err != nil {panic(err)}
	err = tmpl.Execute(output, "hi")
	log.Println(output)
	if err != nil {panic(err)}
	return tmpl
}
createHtmlItem()