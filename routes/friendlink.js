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
    const id = req.query.id;
    const data = await friendLinkS.upDateisShow(id,{
        isShow:isshow
    })
    resp.send(data);
})
router.get('/deletLink',async (req,resp)=>{
    const delid = req.query.id;
    const data = await friendLinkS.deletLink(delid);
    resp.send(data);
})
router.get('/selectFriendLinkByPage',async (req,resp)=>{
    const page = req.query.page;
    const data = await friendLinkS.selectFriendLinkByPage(page)
    resp.send(data);
})
exports.FriendRouter = router;
