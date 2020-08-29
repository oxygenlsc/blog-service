const express = require('express');
const router =  express.Router();
const BlogS = require('../services/blogService')
router.post('/addblog', async (req,res)=>{
    const BlogData =  req.query.jsonData
    const backdata = await BlogS.addBlog(JSON.parse(BlogData) );
    res.send(backdata);
})
router.post('/selectBlogByPage',async (req,resp)=>{
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
//跟新一个博客
router.post('/updateblog',async (req,res)=>{
    const id = req.query.id;
    const content = req.query.content
    const data = await BlogS.updateBlog(id,{
        Bcontent:content
    })
    res.send(data)
})
exports.blogRouter = router;