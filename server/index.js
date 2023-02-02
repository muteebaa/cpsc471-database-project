const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Canada",
    database: "rentmyridedb",
    connectionLimit: 10
});

db.connect((err)=>{
    if(err){
       console.log(err) 
    }
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/fetch', (req, res)=>{
    db.query("SELECT * FROM rentmyridedb.users" , function(err,result,fields){
        if(err){
            console.log(err)
        }
        else{
            //res.send(result)
            console.log(result);
        }

    })

})

app.post('/api/Login', (req, res)=>{

    const username = req.body.username
    const pw = req.body.pw



    /* const sqlInsert = "INSERT INTO users (username, password) VALUES (?, ?);";
     db.query(sqlInsert, [username, pw], (err, result)=>{
        console.log(err)
     });*/

     db.query("SELECT * FROM rentmyridedb.users" , function(err,result,fields){
        if(err){
            console.log(err)
        }
        else{
            //res.send(result)
            var r = JSON.parse(JSON.stringify(result))
            
            for(const type of r){
                if(type.username == username && type.password == pw){  
                    console.log("LOGGED IN")
                }
                
            }
            
        }

    })
 });
/*
app.get("/", (req, res) => {
  
    const sqlInsert = "INSERT INTO users (username, password) VALUES ('', 'dfhpw');";

   // const sqlInsert = 'select * from rentmyridedb.users';
    db.query(sqlInsert, (err, result) => {
       /*if (err)  res.send(err);
      //  console.log("1 record inserted");
        else { res.send("hello !!!");}*/
       /* res.send
    });
});*/

app.listen(3001, () => {
    console.log("running on port 3001");
});