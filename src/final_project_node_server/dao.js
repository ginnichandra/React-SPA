// database access object
// reusable model to connect DB_test database

const { Client } = require('pg')

let DB = {}

function connect () {
    DB = new Client({
        host: 'localhost',
        port: 5432,
        database: 'tp_music',
        user: 'postgres',
        password: 'postgre'
    })

    DB.connect((error) => {
        if (error) {
            throw error
        }
        else
        console.log("connected to database")
    })
}

function query (query_str, values, CallbackFunction) {
    DB.query(query_str, values, (error, result) => {
        if (error) {
            throw error
        }
        CallbackFunction(result)
    })
}

function disconnect () {
    DB.end()
}


//export 3 functions using same names to available outside

module.exports = {
    connect: connect,
    disconnect: disconnect,
    query: query
}

