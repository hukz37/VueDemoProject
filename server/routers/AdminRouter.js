const express = require("express")
const router = express.Router()
const {v4:uuidv4} = require("uuid")
const {db,genid} = require("../db/DbUtils")

router.post("/login",async (req,res) => {
    let {account,password} = req.body
    console.log(account)
    let {err,rows} = await db.async.query("select *from `admin` where `account` = ? AND `password` = ?",[account,password])
    console.log(rows)
    if(err == null && rows.length > 0){

        let login_token = uuidv4()
        let update_token_sql = "UPDATE `admin` SET `token` = ? where `id` = ?"

        await db.async.query(update_token_sql,[login_token,rows[0].id])
        let admin_info = rows[0]
        admin_info.token = login_token

        res.send({
            code: 200,
            msg: '登录成功',
            data: admin_info
        })
    }else{
        res.send({
            code: 500,
            msg: '登录失败'
        })
    }
})

module.exports = router