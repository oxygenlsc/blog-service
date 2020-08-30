const express = require('express');
const router =  express.Router();
const TagS = require('../services/tagsService')
router.get('/selectAllTag', async (req,res)=>{
    const backdata = await TagS.selectAllTags();
    res.send(backdata);
})

exports.TagRouter = router;