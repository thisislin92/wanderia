const { MongoClient, ServerApiVersion } = require('mongodb');
const config = require('.');

const uri = `${config.mongodb.protocol}://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}/?retryWrites=true&w=majority`; // managed-mongodb in cloud
const databaseName = config.mongodb.collectionName;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let db

async function runConnection() {
    try {
        db = client.db(databaseName);
        return db
    } catch (error) {
        await client.close()
        throw error
    }
    
}

function getDatabase() {
    return db
}

module.exports = { runConnection, getDatabase }