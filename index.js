const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser')
const {blogRouter} = require('./routes/Blog')
const {TagRouter} = require('./routes/tag')
const {LoginRouter} = require('./routes/login')
const {FriendRouter} = require('./routes/friendlink')
const os = require('os');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'./public/upload'))
    },
    filename: function (req, file, cb) {
        const tiemStap = Date.now();
        const randomStr = Math.random().toString(36).slice(-6);
        const ext = path.extname(file.originalname)
        const filename = `${tiemStap}-${randomStr}${ext}`
        cb(null, filename)
    }
  })
  
const upload = multer({ 
    storage,
    limits:{
        fileSize:500*1024
    }
})
const staticpath = path.resolve(__dirname,'./public')
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
app.post('/uploadImg', upload.single('file'), function (req, res) {
    const url = `http://${myHost}:9999/upload/${req.file.filename}`
    res.send({
        code:0,
        msg:req.file.filename,
        data:url
    })
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
  })
app.listen(9999,()=>{
    console.log('启动成功');
})
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const myHost = getIPAdress();