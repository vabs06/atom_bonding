const express = require('express');
const mysql  = require('mysql');
const bodyParser = require('body-parser');

//Create DB
const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'nodetest'
});

//Connect Db
db.connect((err)=>{
    if(err) { throw err; }
    console.log('Mysql connected');
});

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
const mainPage = '/';

//Main Page
app.get('/', (req, res)=>{
    res.render('main');
});

//Get data
app.get('/add',(req, res)=>{
    res.render('index');
});

app.post('/add',(req, res)=>{
    var qry =  "INSERT INTO `student`(`first`,`fname`, `family`, `age`,`contact`) VALUES ('"+req.body.first+"','"+req.body.fname+"','"+req.body.family+"','"+req.body.age+"','"+req.body.contact+"')";
    db.query(qry, (err, result)=>{
        res.redirect('/');
    });
});



//Display List
app.get('/display',(req, res)=>{
    db.query('Select * from student',(err, result)=>{
        res.render('test1',{ items:result });
    });
});


//Server
app.listen('9700', ()=>{
    console.log("start listening");
});







//Create DB
// app.get('/createdb',(req, res)=>{
//     let sql = 'CREATE DATABASE nodetest';
//     db.query(sql,(err, result)=>{
//         if(err) throw err;
//         console.log(result);
//         res.send("DB created");
//     });
// });

//Create Table

// app.get('/createtable',(req, res)=>{
//     let sql = 'CREATE TABLE student(rollno int AUTO_INCREMENT, first VARCHAR(255), fname VARCHAR(255), family VARCHAR(255), age int, contact int, PRIMARY KEY(rollno))';
//     db.query(sql,(err, result)=>{
//         if(err) {throw err;}
//         res.send("Table created");
//     });
// });
