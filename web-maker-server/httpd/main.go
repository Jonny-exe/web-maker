package main

import (
	_ "encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

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

	var PORT int = 5000
	corsHandler := c.Handler(myRouter)
	fmt.Println("Listening on port: ", PORT)
	log.Fatal(http.ListenAndServe(":"+strconv.Itoa(PORT), corsHandler))
	return nil
}

func init() {
}

func main() {
	connect()
	log.Println("Db connection sucessfull")
	err := handleRequest()
	if err != nil {
		log.Fatal(err)
	}
}

func connect() {
	handler.Connect()
}
