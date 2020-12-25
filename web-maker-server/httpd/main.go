package main

import (
	_ "encoding/json"
	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/handler"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"log"
	"net/http"
	"os"
	"path"
	"strconv"
)

func handleRequest() error {
	// err := sql.Register("mysql", &MySQLDriver{})
	// if err != nil {
	// 	log.Println("Error: Could NOT connect to database.")
	// 	log.Println(err)
	// 	return err
	// }

	myRouter := mux.NewRouter().StrictSlash(true)
	// myRouter.HandleFunc("/test", handler.Base64ToImage).Methods("POST", "OPTIONS")

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
	ex, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	log.Print("Executable is ", ex)
	dir := path.Dir(ex)
	log.Print("Dir of executable is ", dir)
	// e.g.: export GO_MESSAGES_DIR="/home/a/Documents/GitHub/go-server/httpd"
	log.Println("Env variable GO_MESSAGES_DIR is:", os.Getenv("GO_MESSAGES_DIR"))
	connect()
	log.Println("Db connection sucessfull")
	err = handleRequest()
	if err != nil {
		log.Fatal(err)
	}
}

func connect() {
	handler.Connect()
}
