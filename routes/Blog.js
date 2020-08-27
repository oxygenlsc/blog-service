const express = require('express');
const router =  express.Router();
router.post('/addblog',(req,res)=>{
    console.log('添加一个文章');
    console.log(req);
    res.send(req.body);
})

exports.blogRouter = router;