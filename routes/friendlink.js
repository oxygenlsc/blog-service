const express = require('express');
const router =  express.Router();
const friendLinkS = require('../services/friendLink')
router.get('/selectAllFriendLink',async (req,resp)=>{
    const data =  await friendLinkS.getAllFriend();
    resp.send(data)
})
router.post('/addFriendLink',async (req,resp)=>{
    const LinkObj =  req.body.jsonData;
    const backdata = await friendLinkS.addFriendLink(JSON.parse(LinkObj) );
    resp.send(backdata);
})
router.get('/upDateisShow',async (req,resp)=>{
    const isshow = req.query.isShow;
    const data = await friendLinkS.upDateisShow({
        isShow:isshow
    })
    resp.send(data);
})
router.get('/deletLink',async (req,resp)=>{
    const delid = req.query.id;
    const data = await friendLinkS.deletLink(delid);
    resp.send(data);
})