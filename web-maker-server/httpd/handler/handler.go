package handler

import (
	// "go.mongodb.org/mongo-driver/bson" 
	"crypto/rand"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/models"
	"reflect"
	"os"
	"log"
	"fmt"
	"path"
	"database/sql"
	"net/http"
	"encoding/json"
)

func InsertTokenRecovery(w http.ResponseWriter, r *http.Request) {
	var req models.Recovery_key
	json.NewDecoder(r.Body).Decode(&req)
	b := make([]byte, 16)
	_, err := rand.Read(b)
	if err != nil {
		log.Fatal(err)
	}
	uuid := fmt.Sprintf("%x-%x-%x-%x-%x",
		b[0:4], b[4:6], b[6:8], b[8:10], b[10:])
	fmt.Println(uuid)
	// insForm, err := db.Prepare("insert into token_recovery(token, recovery) values(?,?)")
	insert, err := db.Prepare("INSERT INTO token_recovery(token, recovery) VALUES(?, ?)")
	if err != nil {
		panic(err.Error())
	}

	uuid = uuid[0:29] // This has to be cut because mysql char(30)
	log.Println(reflect.TypeOf(uuid))
	insert.Exec(uuid, req.Recovery_key)
	defer insert.Close()
	json.NewEncoder(w).Encode(uuid)
}

func InsertTokenObject(w http.ResponseWriter, r *http.Request) {
	// Before doing this you have to check if the token alredy exists
	var req models.TokenAndObject
	json.NewDecoder(r.Body).Decode(&req)

	bytes, err := json.Marshal(req.Object)
	stringyfiedObject := string(bytes)

	insert, err := db.Prepare("INSERT INTO token_object(token, object) VALUES(?, ?)")
	if err != nil {
		panic(err.Error())
	}

	insert.Exec(req.Token, stringyfiedObject)
	defer insert.Close()
	json.NewEncoder(w).Encode(req.Object)
}

func UpdateTokenObject(w http.ResponseWriter, r *http.Request) {
	var req models.TokenAndObject
	json.NewDecoder(r.Body).Decode(&req)

	bytes, err := json.Marshal(req.Object)
	if err != nil {
		panic(err.Error())
	}
	stringyfiedObject := string(bytes)

	update, err := db.Prepare("update token_object set object=? where token=?")
	if err != nil {
		panic("Update error: " +  err.Error())
	}
	res, err := update.Exec(stringyfiedObject, req.Token)
	if err != nil {
		panic(err.Error())
	}
	rowAffected, err := res.RowsAffected()
	if err != nil {
		panic("Row Affectd error: " + err.Error())
	}

	log.Println(rowAffected)
	defer update.Close()
	json.NewEncoder(w).Encode(http.StatusOK)
}

func GetTokenFromRecovery(w http.ResponseWriter, r *http.Request) {
	var req models.Recovery_key
	var token string
	json.NewDecoder(r.Body).Decode(&req)
	err := db.QueryRow("select token from token_recovery where recovery=?", req.Recovery_key).Scan(&token)
	if err != nil {
		panic(err.Error())
	}
	log.Println(token)
	json.NewEncoder(w).Encode(token)
}

func GetObjectFromToken(w http.ResponseWriter, r *http.Request) {
	var req models.Token
	var objectString string
	var object interface{}
	json.NewDecoder(r.Body).Decode(&req)
	err := db.QueryRow("select object from token_object where token=? ", req.Token).Scan(&objectString)
	if err != nil {
		panic(err.Error())
	}
	log.Println(objectString)
	bytes := []byte(objectString)
	json.Unmarshal(bytes, &object)
	log.Println(reflect.TypeOf(object))
	json.NewEncoder(w).Encode(object)
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
}


