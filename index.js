const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const {blogRouter} = require('./routes/Blog')
const {TagRouter} = require('./routes/tag')
const {LoginRouter} = require('./routes/login')
const {FriendRouter} = require('./routes/friendlink')

const staticpath = path.resolve(__dirname,'../public')
app.use(express.static(staticpath))
app.use(express.urlencoded({
    extended:true
}))//解析body的中间件 是像地址传参那样的
// 之前我们是前端写cookie现在我们后端写Cookie 用一个第3放库
app.use(cookieParser());
app.use(express.json())//解析json格式的传参的
app.use('/app/blog',blogRouter) //基地址是、app/blog 的就交给这个路由去处理再匹配 这样页可以分模块
app.use('/app/tag',TagRouter)
app.use('/app/Login',LoginRouter)
app.use('/app/friend',FriendRouter)
app.listen(12306,()=>{
    console.log('启动成功');
})