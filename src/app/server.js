const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const fs = require('fs')
const http = require('http');
const PORT = 9800
const cors = require('cors')

app.use(express.json())
app.use(cors())


//--------------------------ALways Run to Open Database Connection-----------------------------

openDatabaseConnection();
checkUserTable();


//--------------------------ALways Run to Open Database Connection and check Table-----------------------------





app.get('/users',(req,res)=>{
    console.log('GET Method Called')
    const dbObj = openDatabaseConnection();
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


app.post('/addUser',(req,res)=>{
    console.log('POST Method Called')
    const dbObj = openDatabaseConnection();
    dbObj.serialize(()=>{

        const stmt = dbObj.prepare("INSERT INTO users(mail,phonenum,password) VALUES (?,?,?)");
        stmt.run(`${req.body.mail}`,req.body.phonenum,`${req.body.password}`)
        stmt.finalize((err)=>{
            if(err)
            res.send(null)
            else
            res.json(req.body)
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