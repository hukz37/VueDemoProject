const express = require("express")
const router = express.Router()
const {db,genid} = require("../db/DbUtils")

router.get('/test',async (req,res)=>{
    // db.query('select *from `admin`',[],(err,res)=>{
    //     if(err){
    //         console.log(err.message)
    //     }
    //     console.log(res)
    // })
    // db.async.query("select *from `admin`",[]).then((res)=>{
    //     console.log('-------------------')
    //     console.log(res)
    // })

    let out = await db.async.query("select *from `admin`",[])

    res.send({
        id: genid.NextId(),
        out
    })
})

module.exports = router