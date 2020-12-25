package handler

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"reflect"
	"os"
	"log"
	"fmt"
	"path"
	"database/sql"
)

func Insert() {
	insert, err := db.Query("INSERT INTO test1(price, name) VALUES(3333, 'newTest')")
	if err != nil {
		panic(err.Error())
	}
	defer insert.Close()
}


var db *sql.DB 
func Connect() {
	var err error
	ex, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	log.Print("Executable is ", ex)
	dir := path.Dir(ex)
	log.Println("Dir of executable is ", "/homa/a/Documents/GitHub/web-maker/web-maker-server/httpd/")

	// e.g.: export GO_MESSAGES_DIR="/home/a/Documents/GitHub/go-server/httpd"
	dir = "/home/a/Documents/GitHub/web-maker/web-maker-server/httpd"
	log.Println("Env variable GO_MESSAGES_DIR is: ", dir)
	if dir == "" {
		log.Println("Error: GO_MESSAGES_DIR is not set.")
		log.Println("Error: Set it like: export GO_MESSAGES_DIR=\"/home/user/Documents/GitHub/go-server/httpd\"")
	}

	enverr := godotenv.Load(dir + "/.env")
	fmt.Println(enverr)
	fmt.Println("Connecting to MongoDB")
	connectionKey := os.Getenv("DB_CONNECTION")
	fmt.Println(connectionKey)

	db, err = sql.Open("mysql", connectionKey)
	log.Println(reflect.TypeOf(db))
	// hanlder.Insert()
	Insert()
}
