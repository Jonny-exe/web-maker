package handler

import (

	// "go.mongodb.org/mongo-driver/bson"

	"crypto/rand"
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"path"
	"reflect"
	"strconv"
	"strings"

	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/export"
	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/filecreator"
	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/models"
	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
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
	json.NewEncoder(w).Encode(http.StatusOK)
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
		panic("Update error: " + err.Error())
		json.NewEncoder(w).Encode(http.StatusInternalServerError)
	}
	res, err := update.Exec(stringyfiedObject, req.Token)
	if err != nil {
		panic(err.Error())
		json.NewEncoder(w).Encode(http.StatusInternalServerError)
	}
	rowAffected, err := res.RowsAffected()
	if err != nil {
		panic("Row Affectd error: " + err.Error())
		json.NewEncoder(w).Encode(http.StatusInternalServerError)
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
	dir = os.Getenv("WEB_MAKER_ROOT")
	// dir = "/home/a/Documents/GitHub/web-maker/web-maker-server/httpd"
	log.Println("Env variable WEB_MAKER_ROOT is: ", dir)
	if dir == "" {
		log.Println("Error: WEB_MAKER_ROOT is not set.")
		log.Println("Error: Set it like: export WEB_MAKER_ROOT=\"/home/user/Documents/GitHub/web-maker\"")
	}

	enverr := godotenv.Load(dir + "/web-maker-server/httpd/.env")
	fmt.Println(enverr)
	fmt.Println("Connecting to MongoDB")
	connectionKey := os.Getenv("DB_CONNECTION")
	fmt.Println(connectionKey)

	db, err = sql.Open("mysql", connectionKey)
	if err != nil {
		log.Fatal("Error login in mysql: ", err)
	}

	// defer db.Close()
	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS web_maker")
	if err != nil {
		log.Fatal("Error creating database: ", err)
	}
	_, err = db.Exec("USE web_maker")
	if err != nil {
		log.Fatal("Error selecting database: ", err)
	}
	_, err = db.Exec("CREATE TABLE IF NOT EXISTS token_object ( token varchar(30), object longtext)")
	if err != nil {
		log.Fatal("Error creating token_object table: ", err)
	}

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS token_recovery ( token varchar(30), recovery varchar(30))")
	if err != nil {
		log.Fatal("Error creating token_recovery table: ", err)
	}

	log.Println(reflect.TypeOf(db))
	// hanlder.Insert()
}

// ExportIntoHTML ...
func ExportIntoHTML(w http.ResponseWriter, r *http.Request) {
	var req models.Token
	var objectString string
	var object models.Content
	var HTMLBegining string = "<!DOCTYPE html><html><body>"
	var HTMLEnd string = "</body></html>"
	// connectionKey := os.Getenv("BEAUTIFY_CODE")
	json.NewDecoder(r.Body).Decode(&req)
	err := db.QueryRow("select object from token_object where token=? ", req.Token).Scan(&objectString)
	if err != nil {
		panic(err.Error())
	}
	bytes := []byte(objectString)
	json.Unmarshal(bytes, &object)
	export.Export(object)

	result := export.Export(object)
	result = HTMLBegining + result + HTMLEnd
	beautifiedResult := beautifyCode(result)
	filecreator.ImportHTMLToFile(beautifiedResult, req.Token)

	json.NewEncoder(w).Encode(http.StatusOK)
}

func beautifyCode(htmlCode string) string {
	endpoint := "https://www.10bestdesign.com/dirtymarkup/api/html"
	data := url.Values{}
	data.Set("code", htmlCode)

	client := &http.Client{}
	r, err := http.NewRequest("POST", endpoint, strings.NewReader(data.Encode())) // URL-encoded payload
	if err != nil {
		log.Fatal(err)
	}
	r.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	r.Header.Add("Content-Length", strconv.Itoa(len(data.Encode())))

	res, err := client.Do(r)
	if err != nil {
		log.Fatal(err)
	}
	log.Println(res.Status)
	defer res.Body.Close()
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		log.Fatal(err)
	}
	stringBody := string(body)

	type req struct {
		Clean string `json:"clean"`
	}

	var result req

	bytes := []byte(stringBody)
	json.Unmarshal(bytes, &result)
	log.Println(result)
	return string(result.Clean)
}

// RemoveFile ...
func RemoveFile(w http.ResponseWriter, r *http.Request) {
	var req models.Token
	json.NewDecoder(r.Body).Decode(&req)
	resultStatus := filecreator.RemoveFile(req.Token)
	json.NewEncoder(w).Encode(resultStatus)
}

// Test ...
func Test(w http.ResponseWriter, r *http.Request) {
	export.Test()
}

func main() {
	// log.Println(export.Test)
}

func removeHTMLFile() {
	//TODO: do this
}
