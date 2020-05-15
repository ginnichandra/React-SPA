'use strict'
// first do > npm install express
// this is the express framework for a node web server
const express = require('express')
const app = express()

// 2 line below required to use request.body to get form inputs
// to get any data with an http request
// (equivalent to body-parser package required with the older express versions)
app.use(express.json()) // used to parse JSON bodies
app.use(express.urlencoded()) // Parse url-encoded bodies



// --ROUTES-------------------------------------------------------------------------------------------------

//serve all files in public_html without any furthur process
// good old static hyperlinked document
app.use(express.static('public_html'))

// using my own module for db connection, see dao.js
const DB = require('./dao')

// EJS template engine setup
// templates must be in views folder
app.set('view engine','ejs')

var cors=require('cors')
app.use(cors())


//GET request for tracks----------------------------------------------------------------------------------------------------------------
app.get('/get_all_tracks',function(request,response){

    DB.connect()

        DB.query('select * from track ',[],(result) =>{
                console.log("getting all tracks")
                let reply={}// initialize empty object
        if(result.rowCount !=0)
        {
            reply.message="OK found "+result.rowCount+" tracks"
            reply.db_data=result.rows
        response.status(200).send(reply)
        }
        else
        {
            reply.message="track table is empty"
            reply.db_data={}
            response.status(404).send("table is empty")
        }
    })
})

// TO DELETE TRACK------------------------------------------------------------------------------------------
app.delete('/delete_track/:id',function(request,response){

    let id_from_url=request.params.id
    DB.connect()
    console.log(request.body)
    DB.query("DELETE FROM track WHERE id=$1",[id_from_url],(result) =>
    {
        console.log("row deleted with id"+id_from_url)
        let reply={}// initialize empty object
        //result.rowcount=0; // for testing purpose only
        if(result.rowCount !=0)
        {
            reply.message="row deleted"
            reply.db_data=result.rows[0]
        response.status(200).send(reply)
        }
        else
        {
            reply.message="track table is empty"
            reply.db_data={}
            response.status(404).send("table is empty")
        }

    })

})

// TO INSERT OR ADD TRACK ------------------------------------------------------------------------------------------
app.post('/insert_into_playlist',function(request,response){

    DB.connect()
    console.log(request.body.type)

    // inserting into track table-----------------------------------
    DB.query("insert into track(playlist_id,title,uri,master_id) values (1,'"+request.body.title+"','"+request.body.uri+"','"+(100)+"')",[],(result) =>
    {
        console.log("inserted into track table")
        console.log('numbers of rows in table: ' + result.rowCount)
        let reply={}// initialize empty object
        //result.rowcount=0; // for testing purpose only
        if(result.rowCount !=0)
        {
            reply.message="row inserted into track table"
            reply.db_data=result.rows[0]
        response.status(200).send(reply)
        }
        else
        {
            reply.message="track table is empty"
            reply.db_data={}
            response.status(404).send("table is empty")
       }

    })
})


//---------------------------------------------------------------------------------------------------------
//check out localhost:3001
//use ctrl-c to stop server
app.listen(3001,function()
{
    console.log("Server listening to port 3001")
})
