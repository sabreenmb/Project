const express = require("express");
const app = express();
const port = 3001; // or any other desired port
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
app.use("/", express.static("./website"));
const {check ,validationResult}=require("express-validator");
const formValidat = formValidate();

// Insert data route
app.use(express.json());
//TODO MAKE SURE THIS IS NOT THE REASON 
app.use(express.urlencoded({ extended: true }));
app.post("/insert", formValidat,(req, res) => {
    const errors=validationResult(req);
    console.log(errors);
    if(errors.isEmpty()){
               const data = { firstName: req.body.firstName, lastName: req.body.lastName, email:req.body.email,mobile:req.body.mobile,
            gender:req.body.gender,dateOfBirth:req.body.dateOfBirth, language:req.body.language,message:req.body.message };
        const query = "INSERT INTO contactus SET ?";
    
        pool.query(query, data, (error, result) => {
            if (error) 
            throw error;
            // result.send("Data inserted successfully!");
            res.send("Data inserted successfully!");
        });
 
    }else{
        res.send("<h1>Sorry we found validation errors with your submition</h1>"+printErrors(errors.array())+"<h2><a href='contact.html'>Click here</a> to return</h2>");
    }
 
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

function formValidate() {
    return [
        check('firstName').isLength({ min: 1, max: 100 }).withMessage('First name must be between 1 and 100')//length
            .isString().withMessage('first name must be string')//string
            .matches('[A-Za-z]+').withMessage('first name should be english')
            .trim().escape(),

        check('lastName').isLength({ min: 1, max: 100 }).withMessage('Last name must be between 1 and 100')//length           
            .isString().withMessage('last name must be string')//string
            .matches('[A-Za-z]+').withMessage('last name should be english')
            .trim().escape(),

        check('mobile').isLength({ min: 10, max: 10 }).withMessage('Phone must be exactly 10 digits')//length          
            .isNumeric().withMessage('Phone must consist of numbers only')//type
            .matches('[0-9]{10}').withMessage('Phone must be exactly 12 digits and start with 05')
            .trim().escape(),//sanitize and clean

        check('email').isLength({ min: 2, max: 200 }).withMessage('Email must be between 2 and 200 chars in length')//length
            .isString().withMessage("Email must be of type string")//validate type
            .isEmail().withMessage('Email must be in the correct email format e.g., x@y.com')//format
            .trim().escape(),//sanitize and clean

        check('dateOfBirth').isDate().withMessage('it is not adate!')//length
            .trim().escape(),//sanitize and clean

        check('message').isLength({ min: 2, max: 300 }).withMessage('Message must more than 2 digits')//length
            .trim().escape()//sanitize and clean

    ];
}

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
