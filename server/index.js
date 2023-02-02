const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "rentmyridedb",
    connectionLimit: 10
});

app.post('/api/insert', (req, res)=>{
    const sqlInsert = "INSERT INTO users (username, password) VALUES (?, ?);";
    db.query(sqlInsert, [username, pw], (err, result)=>{
        
    });
});

// app.get("/", (req, res) => {
  
//     const sqlInsert = "INSERT INTO users (username, password) VALUES ('trst', 'dfhpw');";

//    // const sqlInsert = 'select * from rentmyridedb.users';
//     db.query(sqlInsert, (err, result) => {
//        if (err)  res.send(err);
//       //  console.log("1 record inserted");
//         else { res.send("hello !!!");}
//     });
// });

app.listen(3001, () => {
    console.log("running on port 3001");
});