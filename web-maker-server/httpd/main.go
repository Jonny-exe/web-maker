package main

import (
	_ "encoding/json"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	_ "github.com/joho/godotenv/autoload"

	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/filecreator"
	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/handler"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func handleRequest() error {
	// err := sql.Register("mysql", &MySQLDriver{})
	// if err != nil {
	// 	log.Println("Error: Could NOT connect to database.")
	// 	log.Println(err)
	// 	return err
	// }

	myRouter := mux.NewRouter().StrictSlash(true)
	myRouter.HandleFunc("/insertTokenRecovery", handler.InsertTokenRecovery).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/updateTokenObject", handler.UpdateTokenObject).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/insertTokenObject", handler.InsertTokenObject).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/getTokenFromRecovery", handler.GetTokenFromRecovery).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/getObjectFromToken", handler.GetObjectFromToken).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/exportIntoHTML", handler.ExportIntoHTML).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/removeFile", handler.RemoveFile).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/doesRecoveryKeyExist", handler.DoesRecoveryKeyExist).Methods("POST", "OPTIONS")
	myRouter.HandleFunc("/test", handler.Test).Methods("POST", "OPTIONS")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		//AllowedOrigins:   []string{"http://localhost:3000", "http://jonny.sytes.net", "http://192.168.0.19"},
		AllowCredentials: false,
		AllowedMethods:   []string{"POST", "GET", "OPTIONS"},
		AllowedHeaders:   []string{"*"},

		// Enable Debugging for testing, consider disabling in production
		// To debug turn this to true
		Debug: false,
	})

	var port string = os.Getenv("SERVE_PORT")
	PORT, err := strconv.Atoi(port)
	if err != nil {
		log.Fatal("Error converting string to number: ", err)
	}
	corsHandler := c.Handler(myRouter)
	log.Println("Listening on port: ", PORT)
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(PORT), corsHandler))
	return nil
}

func main() {

	go tempFilesWipe()
	connect()
	log.Println("Db connection sucessfull")
	err := handleRequest()
	if err != nil {
		log.Fatal(err)
	}
}

func connect() {
	filecreator.GetTempFilesDir()
	handler.GetDirs()
	handler.Connect()
}

// tempFilesWipe is used to remove all the files that arent used and have not been removed because the user closed the browser
func tempFilesWipe() {
	frequency := os.Getenv("WIPE_INTERVAL")
	frequencyNum, err := strconv.Atoi(frequency)
	if err != nil {
		log.Fatal("Error converting string to int: ", err)
	}
	ticker := time.NewTicker(time.Duration(frequencyNum) * time.Second)
	log.Println("Interval to remove temp files created. Called each", frequency, "s")

	// for every `tick` that our `ticker`
	// emits, we print `tock`
	var wipeMap map[string]bool = make(map[string]bool)
	var wipe bool = false
	for range ticker.C {
		filecreator.RemoveAllFiles(wipe, wipeMap)
		wipe = !wipe
	}
}
