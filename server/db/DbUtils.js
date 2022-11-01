// const sqlite3 = require("sqlite3").verbose()
const mysql = require("mysql")
const path = require("path")
const GenId = require("../utils/SnowFlake")

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '12345678',
    database: 'blog'
})

// var db = new sqlite3.Database(path.join(__dirname,"blog.sql"))
const genid = new GenId({
    WorkerId: 1,
})

db.async = {}

db.async.query = (sql,params) => {
    return new Promise((resolve,reject)=>{
        db.query(sql,params,(err,rows)=>{
            resolve({err,rows})
        })
    })
}

db.async.run = (sql,params) => {
    return new Promise((resolve,reject)=>{
        db.run(sql,params,(err,rows)=>{
            resolve({err,rows})
        })
    })
}

module.exports = {db, genid}