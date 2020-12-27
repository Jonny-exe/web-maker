package filecreator

import (
	"log"
	"os"
)

// ImportHTMLToFile ...
func ImportHTMLToFile(code string) {

	f, err := os.Create("temp.html")
	if err != nil {
		log.Fatal("Error creating: ", err)
	}
	l, err := f.WriteString(code)
	if err != nil {
		log.Fatal(err)
		f.Close()
	}
	log.Println(l, "bytes written successfully")
	err = f.Close()
	if err != nil {
		log.Fatal(err)
	}
}
