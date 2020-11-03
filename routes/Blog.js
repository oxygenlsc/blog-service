const express = require('express');
const router =  express.Router();
const BlogS = require('../services/blogService')
router.post('/addblog', async (req,res)=>{
    const BlogData =  req.body.jsonData;
    const backdata = await BlogS.addBlog(JSON.parse(BlogData) );
    res.send(backdata);
})
router.get('/selectBlogByPage',async (req,resp)=>{
    const page = +req.query.page;
    const limit = +req.query.limit
    const data =  await BlogS.selectByPage(page,limit)
    resp.send(data)
})
//根据条件查询博客一个是id查细节，一个是tags查列表  
router.get('/selectBlogByType',async (req,resp)=>{
        const Bid = req.query.id;
        const type = req.query.type;
         const tag = req.query.tag
         const page = req.query.page
         const limit = req.query.limit
         if(type=='id'){
            const data =   await BlogS.selectBlogByType({
                type:type,
                id:Bid})
            resp.send(data)
         }else if(type=='tag'){
            const data =   await BlogS.selectBlogByType({
                type:type,
                tag:tag,
                limit,
                page
            })
            resp.send(data)
         }else{
             resp.send('type错误')
         } 
})
//跟新一个博客先获取到内容
router.get('/getBlogDetail',async (req,resp)=>{
    const Bid = req.query.id;
    const data = await BlogS.selectBlogToUpdateById(Bid)
    resp.send(data)
})
router.get('/updateBlog',async(req,resp)=>{
    const Bid = req.query.id;
    const content = req.query.content;
    const data = await BlogS.updateBlog(Bid,{
        Bcontent:content
    })
    resp.send(data)
})
router.get('/getAllblog' ,async (req,res)=>{
   const data = await BlogS.getAllBlog()
   res.send(data)
})
router.get('/BlikeBlog',async (req,res)=>{
    const Bid = req.query.id;
    const ip = getClientIp(req)
    const data = await BlogS.BlikeBlogToUpdateById(Bid,ip)
    res.send(data)
})
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};
exports.blogRouter = router;