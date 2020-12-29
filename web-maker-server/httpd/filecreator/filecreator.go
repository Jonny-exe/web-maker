package filecreator

import (
	"log"
	"os"

	_ "github.com/joho/godotenv/autoload"
)

// ImportHTMLToFile ...
func ImportHTMLToFile(code string, token string) {
	// Files have to be created there because they have to be in the same level or further than the main index.html which is in public directory
	f, err := os.Create(tempFilesDir + token + ".html")
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
	err := os.Remove(tempFilesDir + token + ".html")
	if err != nil {
		log.Fatal("Error removing file", err)
		return 500
	}
	return 200
}

var tempFilesDir string

// GetTempFilesDir ...
func GetTempFilesDir() {
	// envDir := os.Getenv("WEB_MAKER_ENV")
	// // enverr := godotenv.Load(envDir)
	// log.Fatal("Error loading .env file: ", enverr)
	tempFilesDir = os.Getenv("TEMP_FILES_DIR")
	log.Println("TEMP_FILES_DIR: ", tempFilesDir)
}
