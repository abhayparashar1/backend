// const express =require("express");
// const cors= require("cors");
// const mysql= require("mysql2");
// const path =require('path');

// const app =express();
// app.use(express.static(path.join(__dirname + "/public")));

// app.use(express.json());
// app.use(cors());
// const db =mysql.createConnection({
//         host: 'localhost',
//         port: 3306,
//         user: "root",
//         password:'root',
//         database: 'claimsfinal'
    
// })

// // Endpoint to get a single policy
// app.get('/policy/:id', (req, res) => {
//     const { id } = req.params;
//     const sql = 'SELECT * FROM policy WHERE PolicyID = ?';
//     db.query(sql, [id], (err, result) => {
//         if (err) throw err;
//         res.json(result[0]);
//     });
// });

// // Endpoint to submit a claim
// app.post('/claims', (req, res) => {
//     const { policyId, claimAmount, reason } = req.body;
//     const sql = 'INSERT INTO claims (PolicyID, ClaimAmount, Reason) VALUES (?, ?, ?)';
//     db.query(sql, [policyId, claimAmount, reason], (err, result) => {
//         if (err) throw err;
//         res.json({ message: 'Claim submitted successfully', claimId: result.insertId });
//     });
// });

// // app.post('/signup', (req, res) => {
// //     const { name, email, dob, password } = req.body;
 
// //     // Insert user into database with actual password
// //     const sql = "INSERT INTO login (`Name`, `email`, `DOB`, `Password`)  VALUES (?,?,?,?);"
// //     const values = [name, email, dob, password];
   
// //     db.query(sql, values, (dbErr, result) => {
// //         if (dbErr) {
// //             console.error('Error inserting user into database:', dbErr);
// //             return res.status(500).json({ error: 'Internal server error' });
// //         }
// //         console.log('User inserted successfully');
// //         return res.status(201).json({ message: 'User signed up successfully' });
// //     });
// // });


// app.post('/signup', (req, res) => {
//     const { Name, email, DOB, Password } = req.body;
 
//     // Insert user into database with actual password
//     const sql = "INSERT INTO login (Name, email, DOB, Password) VALUES (?, ?, ?, ?)";
//     const values = [Name, email, DOB, Password];
   
//     db.query(sql, values, (dbErr, result) => {
//         if (dbErr) {
//             console.error('Error inserting user into database:', dbErr);
//             return res.status(500).json({ error: 'Internal server error' });
//         }
//         console.log('User inserted successfully');
//         return res.status(201).json({ message: 'User signed up successfully' });
//     });
// });


// app.post('/login', (req, res) => {
//     // Fetch user from database using email
//     const sql = "SELECT * FROM login WHERE email=? AND Password=?";
//     db.query(sql, [req.body.email, req.body.password], (err, data) => {
//         if(err) {
//             return res.json("error");
//         }
//         return res.json(data);
//     })
// })


// app.get("/policy", (req,res) => {
   
//     const sql ="SELECT * FROM policy";
//     db.query(sql, (err, data)=> { 
//      if(err) return res.json("Error")
//      return res.json(data);
//     })
 
//      // res.json("Hello from backend")
//  })

//  app.get("/claim-info", (req,res) => {
   
//     const sql ="SELECT * FROM claims";
//     db.query(sql, (err, data)=> { 
//      if(err) return res.json("Error")
//      return res.json(data);
//     })
 
//      // res.json("Hello from backend")
//  })
// // app.get("/", (req,res) => {
// //      res.json("Hello from backend Abhay Parashar")
// // })


// app.listen(8082, ()=>{
//     console.log("listening....");
// })

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: "localhost",   //mysql_srv
    user: "root",
    password: "root",
    port: 3306,
    database: "claimsfinal" // Keep your database name here
});

// const db = mysql.createConnection({
//     host: "mysql_srv",
//     port: "3307", // Use port 3307 for MySQL service
//     user: "root",
//     password: "root",
//     database: "claimsfinal", // Keep your database name here
// });
// Establish database connection
db.connect((err) => {
    if (err) {
        console.log("Database Connection Failed !!!", err);
    } else {
        console.log("Connected to Database");
        console.log("Creating database table")
        let tableName = 'policy'; // Keep your table name here

        // Query to create table
        let query = `CREATE TABLE IF NOT EXISTS ${tableName} 
        (PolicyID INT AUTO_INCREMENT PRIMARY KEY,
        // Add your table columns here
        )`;

        db.query(query, (err, rows) => {
            if (err) {
                console.log("Table Exists");
            } else {
                console.log(`Successfully Created Table - ${tableName}`)
            }
        })
    }
});

// Your existing routes
app.get("/", (req, res) => {
    res.json("Testing Node.js Server")
 
});

app.get("/policy/:id", (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM policy WHERE PolicyID = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.send(result);
        }
    });
});

app.post("/claims", (req, res) => {
    const { policyId, claimAmount, reason } = req.body;
    const sql = 'INSERT INTO policy (PolicyID, P ClaimAmount, Reason) VALUES (?, ?, ?)';
    db.query(sql, [policyId, claimAmount, reason], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.json({ message: "Claim submitted successfully", claimId: result.insertId });
        }
    });
});

// Additional routes
app.get("/policy", (req,res) => {
    console.log("inside policy")
    const sql ="SELECT * FROM policy";
    db.query(sql, (err, data)=> { 
        if(err) return res.json("Error")
        return res.json(data);
    });
});

app.get("/claim-info", (req,res) => {
    const sql ="SELECT * FROM claims";
    db.query(sql, (err, data)=> { 
        if(err) return res.json("Error")
        return res.json(data);
    });
});

// Start the server
const PORT = process.env.PORT || 8082; // Adjust the port number as per your requirement
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
