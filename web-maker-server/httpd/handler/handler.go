package handler

import (
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
	"github.com/Jonny-exe/web-maker/web-maker-server/httpd/models" // "go.mongodb.org/mongo-driver/bson"
	"github.com/joho/godotenv"

	_ "github.com/go-sql-driver/mysql"
)

// Blank

// InsertTokenRecovery ..
func InsertTokenRecovery(w http.ResponseWriter, r *http.Request) {
	db := getConnection()
	defer db.Close()
	var req models.Recovery_key
	json.NewDecoder(r.Body).Decode(&req)
	// insForm, err := db.Prepare("insert into token_recovery(token, recovery) values(?,?)")
	insert, err := db.Prepare("INSERT INTO token_recovery(token, recovery) VALUES(?, ?)")
	if err != nil {
		log.Fatal(err)
	}
	uuid := createUUID()

	uuid = uuid[0:29] // This has to be cut because mysql char(30)
	log.Println(reflect.TypeOf(uuid))
	insert.Exec(uuid, req.Recovery_key)
	defer insert.Close()
	json.NewEncoder(w).Encode(uuid)
	return
}

func createUUID() string {
	db := getConnection()
	defer db.Close()
	b := make([]byte, 16)
	_, err := rand.Read(b)

	if err != nil {
		log.Fatal(err)
	}
	uuid := fmt.Sprintf("%x-%x-%x-%x-%x",
		b[0:4], b[4:6], b[6:8], b[8:10], b[10:])

	var uuidResult interface{}

	err = db.QueryRow("select token from token_recovery where token=?", uuid).Scan(&uuidResult)
	log.Println(uuidResult)
	if uuidResult != nil {
		createUUID()
	}
	return uuid
}

// InsertTokenObject ...
func InsertTokenObject(w http.ResponseWriter, r *http.Request) {
	db := getConnection()
	defer db.Close()
	// Before doing this you have to check if the token alredy exists
	var req models.TokenAndObject
	json.NewDecoder(r.Body).Decode(&req)

	bytes, err := json.Marshal(req.Object)
	stringyfiedObject := string(bytes)

	insert, err := db.Prepare("INSERT INTO token_object(token, object) VALUES(?, ?)")
	if err != nil {
		log.Fatal(err)
	}

	insert.Exec(req.Token, stringyfiedObject)
	defer insert.Close()
	json.NewEncoder(w).Encode(http.StatusOK)
	return
}

// UpdateTokenObject ..
func UpdateTokenObject(w http.ResponseWriter, r *http.Request) {
	db := getConnection()
	defer db.Close()
	var req models.TokenAndObject
	json.NewDecoder(r.Body).Decode(&req)

	err := db.Ping()
	log.Println("Ping: ", db.Ping())
	if err != nil {
		log.Fatal("Ping failed: ", err)
	}
	bytes, err := json.Marshal(req.Object)
	if err != nil {
		log.Fatal(err)
	}
	stringyfiedObject := string(bytes)

	update, err := db.Prepare("update token_object set object=? where token=?")
	defer update.Close()
	if err != nil {
		json.NewEncoder(w).Encode(http.StatusInternalServerError)
		log.Fatal("Update error: ", err)
	}
	res, err := update.Exec(stringyfiedObject, req.Token)
	if err != nil {
		json.NewEncoder(w).Encode(http.StatusInternalServerError)
		log.Fatal(err)
	}
	rowAffected, err := res.RowsAffected()
	if err != nil {
		json.NewEncoder(w).Encode(http.StatusInternalServerError)
		log.Fatal("Row Affectd error: ", err)
	}

	log.Println(rowAffected)
	json.NewEncoder(w).Encode(http.StatusOK)
	return
}

// GetTokenFromRecovery ...
func GetTokenFromRecovery(w http.ResponseWriter, r *http.Request) {
	db := getConnection()
	defer db.Close()
	var req models.Recovery_key
	var token string
	json.NewDecoder(r.Body).Decode(&req)
	err := db.QueryRow("select token from token_recovery where recovery=?", req.Recovery_key).Scan(&token)
	if err != nil {
		// log.Fatal(err) not check
		json.NewEncoder(w).Encode(500)
		return
	}
	log.Println(token)
	json.NewEncoder(w).Encode(token)
	return
}

// GetObjectFromToken ..
func GetObjectFromToken(w http.ResponseWriter, r *http.Request) {
	db := getConnection()
	defer db.Close()
	var req models.Token
	var objectString string
	var object interface{}
	json.NewDecoder(r.Body).Decode(&req)
	err := db.QueryRow("select object from token_object where token=? ", req.Token).Scan(&objectString)
	if err != nil {
		// log.Fatal(err) not check
	}
	log.Println(objectString)
	bytes := []byte(objectString)
	json.Unmarshal(bytes, &object)
	log.Println(reflect.TypeOf(object))
	json.NewEncoder(w).Encode(object)
	return
}

// var db *sql.DB
var connectionKey string

// EnvDir is the .env directory path
var EnvDir string

// TempFilesDir is the directory for creating temp files
// var TempFilesDir string

// Connect ...
func Connect() {
	// sql.Register("mysql", &MySQLDriver{})

	// db, err = sql.Register("mysql")
	db, err := sql.Open("mysql", connectionKey)

	if err != nil {
		log.Fatal("Error login in mysql: ", err)
	}
	defer db.Close()
	err = db.Ping()
	log.Println("Ping: ", db.Ping())
	if err != nil {
		log.Fatal("Ping failed: ", err)
	}

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
	return
}

func getConnection() *sql.DB {
	var db *sql.DB
	db, err := sql.Open("mysql", connectionKey)

	if err != nil {
		log.Fatal("Error login in mysql: ", err)
	}
	_, err = db.Exec("USE web_maker")
	return db
}

// ExportIntoHTML ...
func ExportIntoHTML(w http.ResponseWriter, r *http.Request) {
	db := getConnection()
	defer db.Close()
	var req models.Token
	var objectString string
	var object models.Content
	// connectionKey := os.Getenv("BEAUTIFY_CODE")
	json.NewDecoder(r.Body).Decode(&req)
	err := db.QueryRow("select object from token_object where token=? ", req.Token).Scan(&objectString)
	if err != nil {
		log.Fatal(err)
	}
	bytes := []byte(objectString)
	json.Unmarshal(bytes, &object)

	// export.ClassIndex = 0
	HTMLResult, CSSResult := export.Export(object, 0)
	// result = HTMLBegining + result + HTMLEnd

	beautifiedHTMLResult := beautifyHTMLCode(HTMLResult)
	beautifiedCSSResult := beautifyCSSCode(CSSResult)

	result := joinCSSandHTML(beautifiedHTMLResult, beautifiedCSSResult)
	log.Println("Final result", result)
	filecreator.ImportHTMLToFile(result, req.Token)

	json.NewEncoder(w).Encode(http.StatusOK)
	return
}

func joinCSSandHTML(HTML string, CSS string) string {
	index := strings.Index(HTML, "<head>")
	result := HTML[:index+6] + "<style>" + CSS + "</style>" + HTML[index+6:] // maybe add '\n' between html and style
	return result
}

func beautifyHTMLCode(htmlCode string) string {
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

func beautifyCSSCode(CSSCode string) string {
	endpoint := "https://www.10bestdesign.com/dirtymarkup/api/css"
	data := url.Values{}
	data.Set("code", CSSCode)

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

// DoesRecoveryKeyExist ..
func DoesRecoveryKeyExist(w http.ResponseWriter, r *http.Request) {
	db := getConnection()
	defer db.Close()
	var req models.Recovery_key
	json.NewDecoder(r.Body).Decode(&req)
	var checkResult interface{}
	err := db.QueryRow("select token from token_recovery where recovery=?", req.Recovery_key).Scan(&checkResult)

	log.Println(checkResult)
	if err != nil {
		// This is error will appear every time the recovery doesnt exist yet.
	}
	if checkResult != nil {
		json.NewEncoder(w).Encode(500)
		return
	}

	json.NewEncoder(w).Encode(http.StatusOK)
	return
}

// Test ...
func Test(w http.ResponseWriter, r *http.Request) {
	export.Test()
}

// GetDirs ..
func GetDirs() {
	var err error
	ex, err := os.Executable()
	if err != nil {
		log.Fatal(err)
	}
	log.Print("Executable is ", ex)
	dir := path.Dir(ex)
	log.Println("Dir of executable is ", "/homa/a/Documents/GitHub/web-maker/web-maker-server/httpd/")

	if err != nil {
		log.Fatal("Error connecting to db: ", err)
	}
	log.Println("Passed ping")
	dir = os.Getenv("WEB_MAKER_ROOT")
	log.Println("Env variable GO_MESSAGES_DIR is: ", dir)
	if dir == "" {
		log.Println("Error: GO_MESSAGES_DIR is not set.")
		log.Println("Error: Set it like: export GO_MESSAGES_DIR=\"/home/user/Documents/GitHub/go-server/httpd\"")
	}

	enverr := godotenv.Load(dir + "/.env")
	if enverr != nil {
		log.Println("Error loading .env file: ", enverr)
	}

	// e.g.: export GO_MESSAGES_DIR="/home/a/Documents/GitHub/go-server/httpd"
	dir = os.Getenv("WEB_MAKER_ROOT")
	// dir = "/home/a/Documents/GitHub/web-maker/web-maker-server/httpd"
	log.Println("Env variable WEB_MAKER_ROOT is: ", dir)
	if dir == "" {
		log.Println("Error: WEB_MAKER_ROOT is not set.")
		log.Println("Error: Set it like: export WEB_MAKER_ROOT=\"/home/user/Documents/GitHub/web-maker\"")
	}

	// enverr := godotenv.Load()
	// log.Fatal("Error loading env file", enverr)
	log.Println("Connecting to MongoDB")
	connectionKey = os.Getenv("DB_CONNECTION")
	log.Println("DB_CONNECTION: ", connectionKey)

	// TempFilesDir = os.Getenv("TEMP_FILES_DIR")
	// log.Println("TEMP_FILES_DIR: ", TempFilesDir)
	// filecreator.RemoveAllFiles()
}
