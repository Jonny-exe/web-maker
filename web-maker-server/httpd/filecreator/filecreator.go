package filecreator

import (
	"log"
	"os"
)

// ImportHTMLToFile ...
func ImportHTMLToFile(code string, token string) {
	f, err := os.Create("/home/a/Documents/GitHub/web-maker/web-maker/public/" + token + ".html")
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

// RemoveFile ..
func RemoveFile(token string) int {
	err := os.Remove("/home/a/Documents/GitHub/web-maker/web-maker/public/" + token + ".html")
	if err != nil {
		return 500
		log.Fatal("Error removing file", err)
	}
	return 200
}
