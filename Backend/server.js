const express = require("express");
const app = express();
const port = 2500; // or any other desired port
//setting up DB
const mysql = require("mysql2");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "BowlingEmpire",
    port: 3306,
});

//serving static website
// app.use("/", express.static("website"));
// app.use("/", express.static("./website/JS"));

app.use("/", express.static("./website"));

// const formValidat = formValidate();

// Insert data route
app.use(express.json());
//TODO MAKE SURE THIS IS NOT THE REASON 
app.use(express.urlencoded({ extended: true }));
app.post("/insert", (req, res) => {
    const data = { firstName: req.body.firstName, lastName: req.body.lastName, email:req.body.email,mobile:req.body.mobile,
        gender:req.body.gender,dateOfBirth:req.body.dateOfBirth, language:req.body.language,message:req.body.message };
    const query = "INSERT INTO contactus SET ?";

    pool.query(query, data, (error, result) => {
        if (error) 
        throw error;
        // result.send("Data inserted successfully!");
        res.send("Data inserted successfully!");
    });
});

// View data route
app.get("/view", (req, res) => {
    const query = "SELECT * FROM contactus";

    pool.query(query, (error, result) => {
        if (error) throw error;

        res.json(result);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// function formValidate() {

//     return [

//         check('fname').isLength({ min: 1, max: 100 }).withMessage('First name must be between 1 and 100')//length
//             .isString().withMessage('first name must be string')//string
//             .matches('[A-Za-z]+').withMessage('first name should be english')
//             .trim().escape(),

//         check('lname').isLength({ min: 1, max: 100 }).withMessage('Last name must be between 1 and 100')//length           
//             .isString().withMessage('last name must be string')//string
//             .matches('[A-Za-z]+').withMessage('last name should be english')
//             .trim().escape(),

//         check('phone').isLength({ min: 10, max: 10 }).withMessage('Phone must be exactly 10 digits')//length          
//             .isNumeric().withMessage('Phone must consist of numbers only')//type
//             .matches('[0-9]{10}').withMessage('Phone must be exactly 12 digits and start with 05')
//             .trim().escape(),//sanitize and clean

//         check('email').isLength({ min: 2, max: 200 }).withMessage('Email must be between 2 and 200 chars in length')//length
//             .isString().withMessage("Email must be of type string")//validate type
//             .isEmail().withMessage('Email must be in the correct email format e.g., x@y.com')//format
//             .trim().escape(),//sanitize and clean

//         check('birth').isDate().withMessage('it is not adate!')//length
//             .trim().escape(),//sanitize and clean

//         check('message').isLength({ min: 2, max: 300 }).withMessage('Message must more than 2 digits')//length
//             .trim().escape()//sanitize and clean

//     ];

// }

// // to print error message
function printErrors(errArray) {
    let errors = [];
    for (let index = 0; index < errArray.length; index++) {
        let err = errArray[index]["msg"];
        let msg = "<p>-" + err + "</p>";
        errors.push(msg);
    }
    return errors.join("");
}

















// //1. npm initiation 1.1 install js modules(expess, express-validator, mysql2)

// //2.create server

// const express = require('express');
// const app = express();
// //3. roating server-serve static website
// app.use('/', express.static('./website'));
// app.use(express.urlencoded({ extended: false }));

// //return object will saved in check and result
// const { check, validationResult } = require('express-validator');

// const formValidat = formValidate();

// //5. read user input from the form
// app.post('/server', formValidat, (request, response) => {

//     const errors = validationResult(request);

//     if (!errors.isEmpty()) {

//         const msg = "<h1>Sorry, we found errors with your submission.</h1>" +
//             printErrors(errors.array());
//         response.send(msg);

//     } else {

//         const fname = request.body.fname;
//         const lname = request.body.lname;
//         const mobile = request.body.phone;
//         const email = request.body.email;
//         const gend = request.body.gender;
//         const dob = request.body.birth;
//         const language = request.body.lang;
//         const message = request.body.message;

//         addUser(fname, lname, mobile, email, gend, dob, language, message);

//         const msg = "<h1>User Data Recieved:</h1>" +
//             "<p>Name :" + fname + " " + lname + "</p>" +
//             "<p>Phone :" + mobile + "</p>" +
//             "<p>Email :" + email + "</p>" +
//             "<p>Gender :" + gend + "</p>" +
//             "<p>DOB :" + dob + "</p>" +
//             "<p>Language :" + language + "</p>" +
//             "<p>Message :" + message + "</p>";
//         response.send(msg);
//     }

// });

// app.get('/GETDB',(request, response) => {
//     display();
// });


// //6. Function to validate user input















// //4. server listening
// app.listen(2500, () => {

//     console.log("The server is listening on provided port");

// });

// //7. connect to db

// //create connection with mysql


// function addUser(fname, lname, mobile, email, gend, dob, language, message) {
//     const mysql = require("mysql2");
//     let db = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         port: '3306',
//         database: 'babyflix'
//     });
//     //connect to db
//     db.connect(function (err) {
//         //check for errors
//         if (err) throw err;
//         //create SQL command
//         var sql = "INSERT INTO contactus (firstName, lastName, email, phoneNumber, birthday,gender, language, message) VALUES ('" + fname + "', '" + lname + "','" + email + "', '" + mobile + "', '" + dob + "' , '" + gend + "', '" + language + "','" + message + "')";
//         //execute SQL command
//         db.query(sql, function (err, result) {
//             //check for errors
//             if (err) throw err;
//             //if no errors, then successful
// db.query('SELECT * FROM company', function (err, rows) {
//         if (err) throw err;

//         console.log('Data received');
//         console.log(rows);
//     });

//         });
//     });
// }

// function display(){
    

// }



