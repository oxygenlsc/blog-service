const {addBlog} = require('./blogService')
addBlog({}).then(res=>{
    console.log(res);
    
})