const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const fs = require('fs')
const http = require('http');
const PORT = 9800



//--------------------------ALways Run to Open Database Connection-----------------------------

const dbObj = openDatabaseConnection();
checkUserTable();


//--------------------------ALways Run to Open Database Connection and check Table-----------------------------





app.get('/users',(req,res)=>{
    console.log('GET Method Called')
    dbObj.serialize(()=>{

        dbObj.all("SELECT * FROM users", (err, row) => {
            res.send(row)
       });
       dbObj.close((err)=>{

        if(err)
        return console.error(err.message)
        else
        console.log("Connection Closed Successfully")
    
    
    });

    })
    

    

})


app.listen(PORT,(req,res)=>{
    console.log(`Listening On Port : ${PORT}`)
})


//----------------Function to Open Connection--------------------------
function openDatabaseConnection(){
    return new sqlite3.Database('./main.db',sqlite3.OPEN_READWRITE,(err)=>{
    
        if(err)
         console.error(err.message)
        else
        return    
    
    });
    }
//----------------Function to Open Connection--------------------------
//-----------------Function to Create and Check Existing Table----------

    function checkUserTable(){

        const temp = openDatabaseConnection();
        temp.serialize(() => {

    
    
            temp.run('create table if not exists users '+
            
                ' (id INTEGER PRIMARY KEY AUTOINCREMENT,' +
                ' mail varchar(100) NOT NULL,' + 
                ' phonenum INTEGER ,  '+
                ' password varchar(100) NOT NULL)'
                )
        });
        temp.close();


    }


//-----------------Function to Create and Check Existing Table----------





/*----------------------------------------------------------------------

const db = new sqlite3.Database('./main.db',sqlite3.OPEN_READWRITE,(err)=>{

    if(err)
    return console.error(err.message)
    else
    console.log("Connected to Database")


});



//----------------- Change this to Database.js-----------------------------------------------

db.serialize(() => {

    
    
    db.run('create table if not exists users '+
    
        ' (id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        ' mail varchar(100) NOT NULL,' + 
        ' phonenum INTEGER ,  '+
        ' password varchar(100) NOT NULL)'
        )

    //const stmt = db.prepare("INSERT INTO users(mail,phonenum,password) VALUES (?,?,?)");

   // for (let i = 0; i < 5; i++) {
   //     stmt.run("Ipsum " ,10,"dell");
  //  }
  //  stmt.finalize();
    
    db.all("select name from sqlite_master where type='table'", function (err, tables) {
        console.log(tables);
    });
     
    

    db.each("SELECT * FROM users", (err, row) => {
        console.log(row.id + ": " + row.mail + ":" + row.phonenum+ ":"+ row.password );
   });
});

db.close((err)=>{

    if(err)
    return console.error(err.message)
    else
    console.log("Connection Closed Successfully")


});

//----------------- Change this to Database.js-----------------------------------------------


*/