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
app.get('/createUserTable', (req,res) =>{
    let sql = 'CREATE TABLE users(userId int, name VARCHAR(255), score int, multiplier float, lastMessageNegative bool, lastMessagePositive bool, PRIMARY KEY (userId))';
    db.query(sql, err=> {
        if(err){
            throw err
        }
        res.send('Table Created')
    })
})

app.get('/createMessageTable', (req,res) =>{
    let sql = 'CREATE TABLE messages(messageId int, userId int, content VARCHAR(10000), rawScoreChange int, effectiveScoreChange int, score int, PRIMARY KEY (messageId))';
    db.query(sql, err=> {
        if(err){
            throw err
        }
        res.send('Table Created')
    })
})

//alter table
app.get('/alterTable', (req,res) =>{
    let sql = 'ALTER TABLE messages ADD FOREIGN KEY (userId) REFERENCES users(userId)';
    db.query(sql, err=> {
        if(err){
            throw err
        }
        res.send('Table Altered')
    })
})

//Delete Table
app.get('/dropTable', (req,res) =>{
    let sql = 'DROP TABLE userScores';
    db.query(sql, err=> {
        if(err){
            throw err
        }
        res.send('Table dropped')
    })
})

app.get('/loadUsers', (req,res) =>{
    const jsonData = require('D:\\repos\\socialCredit\\legacyFiles\\users.json');
    let post = [];
    jsonData.forEach(user => {
        let userId = user.userId;
        let name = user.name;
        let score = user.score;
        let multiplier = user.multiplier;
        post.push([userId, name, score, multiplier, 0, 0]);

    })
    let sql = "INSERT INTO users (userId, name, score, multiplier, messageStreak, rank) VALUES ?";

    console.log(post);

    let query = db.query(sql, [post], err=>{
        if(err) {
            throw err
        }
        res.send('added users to db')
    })

});



app.listen('3000', ()=> {
    console.log('Server started on port 3000')
})
