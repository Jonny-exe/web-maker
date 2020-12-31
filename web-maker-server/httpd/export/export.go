package export

import (
	"strings"
	// "fmt"

	"bytes"
	"log"
	"strconv"

	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/itemmodels"
	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/models"
	// "os"
	// "html/template" // You coulld use html/template but. This makes everything safer but it creates machine code which is not pleasent to read
)

// ClassIndex is used to set the number of the class, if I dont use this there would be conflicts when creating children
// var ClassIndex int = 0

// Export .
func Export(content models.Content, index int) (string, string) {
	var finalHTML string
	var finalCSS string
	var idx int = index
	var childrenCSS string
	var HTMLItem string
	// var result stringº
	// var objectContent []interface{} = json
	contentLength := len(content)
	for i := 0; i < contentLength; i++ {
		// ClassIndex++

		idx++

		// HTMLItem = item + itemChildren
		HTMLItem, childrenCSS = createHTMLItem(content[i], idx)

		// CSSItem = itemcss
		CSSItem := createCSSItem(content[i].Style, idx)
		finalHTML += HTMLItem
		finalCSS += CSSItem + childrenCSS
	}

	// result = joinCSSandHTML(finalHTML, finalCSS)
	return finalHTML, finalCSS

}

// Test ...
func Test() {
}

func createHTMLItem(item models.ContentItem, index int) (string, string) {
	buf := new(bytes.Buffer)
	inputs := item
	var children string
	var childrenStyle string
	inputs.ClassIndex = index
	log.Println("ClassIndex HTML: ", inputs.ClassIndex)

	if len(inputs.Children) > 0 {
		// Create children
		children, childrenStyle = Export(inputs.Children, index*100)
		inputs.Content = children
	}
	var err error

	// Create parent
	err = itemmodels.Total.Execute(buf, inputs)

	if err != nil {
		log.Fatal(err)
	}
	return buf.String(), childrenStyle
}

func createCSSItem(item map[string]string, index int) string {
	var result string
	var CSSBegining = "{"
	var CSSEnd = "}"
	// var resultMap map[string]string
	if item == nil {
		return ""
	}
	for key, value := range item {
		buf := new(bytes.Buffer)
		newKey := convertToCSS(key)
		type input struct {
			Key   string `json:"key"`
			Value string `json:"value"`
		}
		var inputs input = input{newKey, value}
		err := itemmodels.CSSKeyValue.Execute(buf, inputs)
		if err != nil {
			log.Fatal("Error parsing css template: ", err)
		}
		result += buf.String()
	}

	log.Println("ClassIndex CSS: ", index)
	result = "a" + strconv.Itoa(index) + CSSBegining + result + CSSEnd // "a" is added because css styles cant begin with a number
	return result
}

func convertToCSS(key string) string {
	var finalKey string
	if key == strings.ToLower(key) {
		finalKey = key
	} else {
		keyArray := strings.Split(key, "")
		for i, caracter := range keyArray {
			if caracter != strings.ToLower(caracter) {
				keyArray[i] = strings.ToLower(caracter)
				withoutMinus := strings.Join(keyArray, "")
				finalKey = withoutMinus[:i] + "-" + withoutMinus[i:]
				break
			}
		}
	}
	return finalKey
}
