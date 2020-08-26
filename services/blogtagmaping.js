const btmap = require('../models/blog-tag-mapping');

exports.addBtMap = async (blogid,tagid)=>{
    try {
     const ins = await  btmap.create({
            BlogId:blogid,
            TagId:tagid
        })
        return {
            success:true,
            data:ins.toJSON(),
            msg:'添加成功'
        }
    } catch (error) {
            // const msgarr = error.errors.map(el=>({emsg:el.message,etype:el.type}))
            return {
                success:false,
                error:error,
                msg:"添加失败"
            }
    }
   
}