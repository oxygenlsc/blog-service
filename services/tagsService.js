const tags = require('../models/tags')

exports.addTags = async (tag)=>{
        try {
           const ins =  await tags.create({
               Tag:tag
           })
           return {
               success:true,
               msg:'插入成功',
               data:ins.toJSON()
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

exports.deletTags = async (tagid)=>{
    try {
     const ins = await tags.destroy({
            where:{
                id:tagid
            }
        })
        return {
            success:true,
            data:ins,
            msg:'删除成功'
        }
    } catch (error) {
        const msgarr = error.errors.map(el=>({emsg:el.message,etype:el.type}))
        return {
            success:false,
            error:msgarr,
            msg:'错误'
        }
    }
}