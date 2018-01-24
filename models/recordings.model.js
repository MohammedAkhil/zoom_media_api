const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const RECORDINGS_COLLECTION = "recordings";

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect('mongodb://127.0.0.1:27017/zoom_api', function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    database.db("zoom_api").createCollection(RECORDINGS_COLLECTION, (err, db) => {
        if (err) {
            console.log(err);
            process.exit(1);
        } else {
            console.log("Collection created!");
        }
    });

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");
});


const saveRecordings = (body, callback) => {
    db.db("zoom_api").collection(RECORDINGS_COLLECTION).insertOne(body, (err, doc) => {
        if (err) {
            callback(err)
        } else {
            callback(null, doc)
        }
    });
};

const findRecordings = callback => {
    db.db("zoom_api").collection(RECORDINGS_COLLECTION).find({}).toArray((err, result) => {
        if (err) callback(err);
        else callback(null, result)
    });
};

module.exports = {
    saveRecordings: saveRecordings,
    findRecordings: findRecordings
};