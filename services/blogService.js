const Blog = require('../models/blog');
const Adimn = require('../models/admins');
const md5 = require('md5');
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
exports.updateBlog = async (blogId,newBlogObj)=>{
    const ins = await  Blog.update(newBlogObj, {
        where: {
            id: blogId
        }
    })
    return {
        success:true,
        msg:'修改成功',
        data:ins
    }
}
exports.deletBlog = async (blogId,nowAdmin)=>{
        if(!nowAdmin){
            return{
                success:false,
                msg:"没有传入当前管理员'",
                data:''
            }
        }

        const adminer = await Adimn.findOne({
            where: {
                LoginId: nowAdmin.LoginId,
                loginPwd: md5(nowAdmin.loginPwd)
            }
        })
        if (!adminer) {
            return {
                success: false,
                data: '',
                msg: '数据库没有此管理员'
            }
        }
        Blog.destroy({
            where:{
                id:blogId
            }
        })
}