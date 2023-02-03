const { MongoClient } = require("mongodb");

var url = "mongodb://localhost:27017/";

const dbName = "sternefutterdb-v1";

url = url + dbName;

const client = new MongoClient(url);

