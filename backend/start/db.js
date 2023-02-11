const { MongoClient } = require("mongodb");

const uri = "mongodb://root:rootpassword@db:27017/?authMechanism=DEFAULT";
const client = new MongoClient(uri);
client.connect().then(console.log("Connected to DB"));
const db = client.db("dataVisualizer");

module.exports = db;
