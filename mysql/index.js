const express = require('express')
const mysql = require('mysql')

//Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

//Connect to mysql environment  
db.connect(err => {
    if(err){
        throw err
    }
    console.log('MySql Connected')
})

const app = express()

//Create Database
app.get('/createdb', (req,res) =>{
    let sql = 'CREATE DATABASE nodeMySql';
    db.query(sql, err=> {
        if(err){
            throw err
        }
        res.send('Database Created')
    })
})

//Create Table
app.get('/createTable', (req,res) =>{
    let sql = 'CREATE TABLE userScores(id int, name VARCHAR(255), score int)';
    db.query(sql, err=> {
        if(err){
            throw err
        }
        res.send('Table Created')
    })
})

app.get('/loadLegacy', (req,res) =>{
    const jsonData = require('D:\\repos\\socialCredit\\legacyFiles\\legacyScores2.json');
    let post = [];
    jsonData.forEach(user => {
        let id = user.authorID;
        let score = user.score;
        post.push([id,'temp',score]);

    })
    let sql = "INSERT INTO userscores (id, name, score) VALUES ?";

    console.log(post);

    let query = db.query(sql, [post], err=>{
        if(err) {
            throw err
        }
        res.send('added legacy to db')
    })

});

app.listen('3000', ()=> {
    console.log('Server started on port 3000')
})
