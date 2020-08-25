const Blog = require('../models/blog');
exports.addBlog = async (blogObj)=>{
    try {
        const ins = await Blog.create(blogObj)
        return {
            success: true,
            data: ins.toJSON(),
            msg: '添加成功'
        }
    } catch (error) {
        const msgarr = error.errors.map(el=>({emsg:el.message,etype:el.type}))
        return {
            success:false,
            error:msgarr,
            msg:"添加失败"
        }
    }
    
}