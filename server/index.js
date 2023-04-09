const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
auth = false;


const multer = require("multer");


var fileName = multer({
    filename:(req,file,callback)=>{
        callback(null,`image-${file.originalname}`)
    }
});

// img storage confing
var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../client/src/imgs");
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${file.originalname}`)
    }
});


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowd"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

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

app.post('/api/registerCar', upload.single('photo'), (req, res)=>{
    
    const username = req.body.username;
    const make = req.body.make;
    const model = req.body.model;
    const filename = `image-${req.body.photoName}`;
    const reg = req.body.reg;
    const pickupAddress = req.body.pickupAddress;
    const features = req.body.features;
    const price = req.body.price;
    const colour = req.body.colour;
    const year = req.body.year;
    const description = req.body.description;
    const type = req.body.type;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const recalls = req.body.recalls;
    const status = req.body.status;
    const damage = req.body.damage;

    
    
   
    db.query("INSERT INTO cars (username, make, model, year, regNumber, price, features, type, colour, startDate, endDate, pickupAddress, description, photo, recalls, status, damage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [username, make, model, year, reg, price,features, type, colour, startDate, endDate, pickupAddress, description, filename, recalls, status, damage ], (err, result)=>{
        if(err) throw err;
        else console.log("worked")
    });

   

    
}); 


app.post('/api/registerpremiumplan', (req, res)=>{
    
    const username = req.body.username;
    const premiumPlan = req.body.premiumPlan;
    var detailing = "";
    var car_wash = "";
    

    if(premiumPlan == "Both"){
        detailing = "Active";
        car_wash = "Active"
    } 
    else if(premiumPlan == "Detailing"){
        detailing = "Active";
        car_wash = "Not Active"
    } 
    else if(premiumPlan == "Car_wash"){
        detailing = "Not Active";
        car_wash = "Active"
    }  
   
    db.query("INSERT INTO premium_plan (username, detailing, car_wash) VALUES (?, ?, ?)", [username, detailing, car_wash ], (err, result)=>{
        if(err) throw err;
        else console.log("worked")
    });

   

    
}); 

app.post('/api/cancelpremiumplan', (req, res)=>{
    const username = req.body.username;
    
    db.query("DELETE FROM premium_plan WHERE username = ?", [username], (err, result)=>{
        if(err) throw err;
        else console.log("worked")
    });
    
}); 

app.post('/api/renterHistory', (req, res)=>{
    const username = req.body.username;

    db.query("SELECT * FROM reservation WHERE user = ?", [username], (err, result)=>{
        if(err) throw err;
        else res.send(result);
    });
    
}); 

app.post('/api/editCarEndDate', (req, res)=>{
    
    const regNumber = req.body.regNumber;
    const extendedEndDate = req.body.extendedEndDate;
    console.log(extendedEndDate)
    
   
    db.query("UPDATE cars SET endDate=? WHERE regNumber = ?", [extendedEndDate, regNumber], (err, result)=>{
        if(err) throw err;
        else console.log("worked")
    });

   

    
}); 


app.post("/api/UserInfo",(req, res)=>{
    const username = req.body.username
    
    db.query("SELECT * FROM rentmyridedb.users WHERE username = ?" , 
    [username],
    function(err,result){
        
       if(err){
           res.send({err: err})
       }
       else{
           res.send(result)
           
       }
   }
  
   )

});

app.post("/api/planInfo",(req, res)=>{
    const username = req.body.username
    
    db.query("SELECT * FROM rentmyridedb.premium_plan WHERE username = ?" , 
    [username],
    function(err,result){
        
       if(err){
           res.send({err: err})
       }
       else{
           res.send(result)
           
       }
   }
  
   )

});
app.post("/api/submitReview",(req, res)=>{
    const username = req.body.username
    const location = req.body.location
    const condition = req.body.cond
    const comment = req.body.comment
    const regNo = req.body.regNo

    db.query("INSERT INTO rentmyridedb.review (username, location_rating, consdition_rating, writting_comments, car_reg) VALUES (?, ?, ?, ?, ?)", 
    [username, location, condition, comment, regNo], 

    function(err,result){
        
       if(err){
            console.log(err)
           res.send({err: err})
       }
       else{
           res.send(result)
           
       }
   }
  
   )

});
app.post("/api/alreadyReviewed",(req, res)=>{
    const username = req.body.username
    db.query("SELECT COUNT(1) FROM rentmyridedb.review WHERE username = ?", 
    [username], 
    function(err,result){      
        if(err){
            console.log(err)
           res.send({err: err})
        }
        else{
            if(result[0]['COUNT(1)'] == 0){
                res.send("notreviewed")  
            }
            else{   
                res.send("reviewed")  
            }            
       }
    })
});

app.post("/api/prevRenter",(req, res)=>{
    const username = req.body.username
    db.query("SELECT COUNT(1) FROM rentmyridedb.reservation WHERE user = ?", 
    [username], 
    function(err,result){      
       if(err){
            console.log(err)
           res.send({err: err})
       }
       else{
            if(result[0]['COUNT(1)'] == 0){
                res.send(false)  
            }
            else{   
                res.send(true)  
            }            
       }
    })
});

app.post("/api/renterCheck",(req, res)=>{
    const username = req.body.username
    db.query("SELECT COUNT(1) FROM rentmyridedb.users WHERE username = ? AND type = 1", 
    [username], 
    function(err,result){      
       if(err){
            console.log(err)
           res.send({err: err})
       }
       else{
            if(result[0]['COUNT(1)'] == 0){
                res.send(false)  
            }
            else{   
                res.send(true)  
            }            
       }
    })
});

app.post("/api/getReviews",(req, res)=>{
    const reg_number = req.body.regNumber

    db.query("SELECT * FROM rentmyridedb.review WHERE car_reg = ?", 
    [reg_number], 

    function(err,result){
        
       if(err){
            console.log(err)
           res.send({err: err})
       }
       else{
           res.send(result)
           
       }
   }
  
   )

});
// app.post("/api/getHistory",(req, res)=>{
//     db.query("SELECT * FROM rentmyridedb.users WHERE ?",
//     function(err,result){
         
//         if(err){
//             res.send({err: err})
//         }
//         else{
//             res.send(result)
            
//         }
//     }
//     )
// });

app.post("/api/getHistory",(req, res)=>{
    const reg_number = req.body.reg_number
    db.query("SELECT * FROM rentmyridedb.reservation WHERE reg_number = ?", [reg_number],
    function(err,result){
         
        if(err){
            res.send({err: err})
        }
        else{
            res.send(result)
            
        }
    }
    )
});

app.post("/api/Cars",(req, res)=>{
    db.query("SELECT * FROM rentmyridedb.cars",
    function(err,result){
         
        if(err){
            res.send({err: err})
        }
        else{
            res.send(result)
            
        }
    }
    )
});

app.post('/api/Login', (req, res)=>{
    const username = req.body.username
    const password = req.body.pw
    const type = req.body.type

    console.log("in the backend")
    console.log(username)
    console.log("in the backend")
    console.log(password)

     db.query("SELECT * FROM rentmyridedb.users WHERE username = ? AND password = ? AND type = ?" , 
     [username, password, type],
     function(err,result){
        if(err){
            res.send({err: err})
        }
        else{
         //   console.log(result)
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

 app.post('/api/unavailableDates',  (req, res)=>{
    const reservationNumber = req.body.regNo; 

    const sqlSelect = "SELECT start_date, end_date FROM reservation WHERE reg_number = ?";
    
    db.query(sqlSelect, [reservationNumber], (err, result)=>{
        if(err){
            res.send("Reservation failed");
        }
        else{
            res.send(result);
        }
    });

}); 

app.post('/api/reservationDetails',  (req, res)=>{
    const day = req.body.date; 

    const sqlSelect = "SELECT reservationNumber, start_date, end_date, reg_number, insurance FROM reservation WHERE start_date <= ? AND end_date >= ?";
    
    db.query(sqlSelect, [day, day], (err, result)=>{
        if(err){
            res.send("Reservation failed");
        }
        else{
            console.log(result.length);
            res.send(result);
        }
    });

}); 

 app.post('/api/reserve',  (req, res)=>{
    const reservationNumber = req.body.reservationNumber; 
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const regNo = req.body.regNo;
    const user = req.body.user;
    const insurance = req.body.insurance;

    const sqlInsert = "INSERT INTO reservation (reservationNumber, start_date, end_date, reg_number, user, insurance) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sqlInsert, [reservationNumber, startDate, endDate, regNo, user, insurance], (err, result)=>{
        if(err){
            console.log(err);
            res.send("Reservation failed");
        }
        else{
            console.log(result);
           
            res.send("Successful reservation");
        }
    });

}); 

//// can use this code for registration
app.post('/api/insert',  (req, res)=>{
    const username = req.body.username; 
    const pw = req.body.pw;
    const type = req.body.type;
    const fName = req.body.fName;
    const lName = req.body.lName;
    const phone = req.body.phone;
    const email = req.body.email;

    const sqlInsert = "INSERT INTO users (username, password, type, FirstName, LastName, PhoneNumber, EmailAddress) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const check = "SELECT * FROM users WHERE username = ?";
    
    console.log("okkk")
    
    db.query(check, [username], (err, result)=>{
        //console.log(result)
        if (result.length == 0){
            console.log("registeringg")
            db.query(sqlInsert, [username, pw, type, fName, lName, phone, email], (err, result)=>{
                res.send("Successful registration");
            });
        }
        else{
            res.send("Username already in use");
        }
    })
}); 



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