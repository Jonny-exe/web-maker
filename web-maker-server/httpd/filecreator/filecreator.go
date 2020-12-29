package filecreator

import (
	"io/ioutil"
	"log"
	"os"

	_ "github.com/joho/godotenv/autoload"
)

// ImportHTMLToFile ...
func ImportHTMLToFile(code string, token string) {
	// Files have to be created there because they have to be in the same level or further than the main index.html which is in public directory
	f, err := os.Create(tempFilesDir + "temp-" + token + ".html")
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
	err := os.Remove(tempFilesDir + "temp-" + token + ".html")
	if err != nil {
		log.Fatal("Error removing file", err)
		return 500
	}
	return 200
}

var tempFilesDir string

// GetTempFilesDir ...
func GetTempFilesDir() {
	tempFilesDir = os.Getenv("TEMP_FILES_DIR")
	log.Println("TEMP_FILES_DIR: ", tempFilesDir)
}

//RemoveAllFiles ..
func RemoveAllFiles(wipe bool, oldMap map[string]bool) map[string]bool {
	log.Println("Removing unecessary temp files in: ", tempFilesDir)
	files, err := ioutil.ReadDir(tempFilesDir)
	if err != nil {
		log.Fatal("Error reading files: ", err)
	}
	resultMap := oldMap

	if wipe == true {
		for _, f := range files {
			if f.Name()[:5] == "temp-" {
				log.Println("Wipe: ", f.Name()[:5])
				if resultMap[f.Name()] == true {
					err = os.Remove(tempFilesDir + f.Name())
					if err != nil {
						log.Fatal(err)
					}
				}
			}
		}
	} else {
		for _, f := range files {
			if f.Name()[:5] == "temp-" {
				log.Println("Wipe check: ", f.Name()[:5])
				resultMap[f.Name()] = true
			}
		}
	}
	return resultMap
}
