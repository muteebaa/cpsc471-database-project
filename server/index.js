const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
auth = false;
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Canada",
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

app.post("/api/UserInfo",(req, res)=>{
    const username = req.body.username
    
    console.log(username)
    db.query("SELECT * FROM rentmyridedb.users WHERE username = ?" , 
    [username],
    function(err,result){
        
       if(err){
           res.send({err: err})
       }
       else{
           console.log(result)
           res.send(result)
           // if (result.length == 0) { 
           //     console.log(result)
           //     res.send({message: "Wrong username/password"})   
           // } else {
           //     console.log("found")
           //     res.send(result)
           // }
       }
   }
   //         var r = JSON.parse(JSON.stringify(result))
           
   //         for(const type of r){
   //             if(type.username == username && type.password == pw){  
   //               //  console.log("LoGGED IN")
   //                 auth = true;
              
   //             }
               
   //         }
          
   //     }
     
   // }
   )
   
 //  res.redirect('http://google.com');
  


});

app.post('/api/Login', (req, res)=>{
    const username = req.body.username
    const password = req.body.pw

    console.log("in the backend")
    console.log(username)
    console.log("in the backend")
    console.log(password)

     db.query("SELECT * FROM rentmyridedb.users WHERE username = ? AND password = ?" , 
     [username, password],
     function(err,result){
        if(err){
            res.send({err: err})
        }
        else{
            console.log(result)
            res.send(result)
            // if (result.length == 0) { 
            //     console.log(result)
            //     res.send({message: "Wrong username/password"})   
            // } else {
            //     console.log("found")
            //     res.send(result)
            // }
        }
    }
    //         var r = JSON.parse(JSON.stringify(result))
            
    //         for(const type of r){
    //             if(type.username == username && type.password == pw){  
    //               //  console.log("LoGGED IN")
    //                 auth = true;
               
    //             }
                
    //         }
           
    //     }
      
    // }
    )
    
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