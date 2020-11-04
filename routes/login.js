const express = require('express');
const router =  express.Router();
const LgS = require('../services/adminService')
router.get('/selectAdmin', async (req,res)=>{
    const data = req.query
    const backdata = await LgS.selectAdmin(data);
    if(backdata.success){
        //之前我们是前端写cookie现在我们后端写Cookie 用一个第3放库
        res.cookie('loginSuccess',true,{
            maxAge:3600*1000
        })//对于pc段的浏览器会自动加入到cookie里 但是移动端我们就给个header
        res.header('mloginSuccess','true')
    }
    res.send(backdata);
})

exports.LoginRouter = router;