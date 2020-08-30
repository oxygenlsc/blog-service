const express = require('express');
const router =  express.Router();
const LgS = require('../services/adminService')
router.get('/selectAdmin', async (req,res)=>{
    const data = req.query
    const backdata = await LgS.selectAdmin(data);
    res.send(backdata);
})

exports.LoginRouter = router;