const express = require('express');
const app = express();
const path = require('path');
const {blogRouter} = require('./Blog');
const {TagRouter} = require('./tag')
const staticpath = path.resolve(__dirname,'../public')
app.use(express.static(staticpath))
app.use(express.urlencoded({
    extended:true
}))//解析body的中间件 是像地址传参那样的
app.use(express.json())//解析json格式的传参的
//常用中间件


// express路由 其实就是一个中间件
app.use('/app/blog',blogRouter) //基地址是、app/blog 的就交给这个路由去处理再匹配 这样页可以分模块
app.listen(12306,()=>{
    console.log('启动成功');
    
})