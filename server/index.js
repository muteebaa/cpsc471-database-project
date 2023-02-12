const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "rentmyridedb",
    connectionLimit: 10
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/fetch', (req, res)=>{
    db.query("SELECT * FROM rentmyridedb.users" , function(err,result,fields){
        if(err){
            console.log(err)
        }
        else{
            //res.send(result)
            res.send(true);
        }
    })
})

app.get('/api/test', (req, res)=>{
    console.log("hello?");
}); 

app.get('/api/Login', (req, res)=>{
    res.send(true);
    const username = req.body.username
    const pw = req.body.pw
    const auth = false;

     db.query("SELECT * FROM rentmyridedb.users" , function(err,result,fields){
        if(err){
            console.log(err)
        }
        else{
            //res.send(result)
            var r = JSON.parse(JSON.stringify(result))
            
            for(const type of r){
                if(type.username == username && type.password == pw){  
                    console.log("LoGGED IN")
                    auth = true;
               
                }
                
            }
           
        }
      
    })
    if(auth == true) res.send(true);
    else res.send(false);
  //  res.redirect('http://google.com');
   
 });

//// can use this code for registration
// app.post('/api/insert', (req, res)=>{
//     const username = req.body.username; 
//     const pw = req.body.pw;

//     const sqlInsert = "INSERT INTO users (username, password) VALUES (?, ?);";
//     db.query(sqlInsert, [username, pw], (err, result)=>{
//         console.log(result);
//     });
// }); 

// app.get("/api/get", (req, res) => {
//     res.send("hello");
//    // const sqlSelect = "INSERT INTO users (username, password) VALUES ('er', 'et');";

//     const sqlSelect = 'select * from users';
//     db.query(sqlSelect, (req, res) => {
//     //  if (err)  res.send(err);
//        console.log(res);
//      //   else { res.send("hello !!!");}
//     });
// });

app.listen(3001, () => {
    console.log("running on port 3001");
});