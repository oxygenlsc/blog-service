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
            // const msgarr = error.errors.map(el=>({emsg:el.message,etype:el.type}))
            return {
                success:false,
                error:error,
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
exports.selectAllTags = async ()=>{
    try {     
        const result = await tags.findAndCountAll({
            attributes:['id','Tag'],//筛选查询指定列
        })
            return {
                success:true,
                totle:result.count,
                data:JSON.parse(JSON.stringify(result.rows)),
                msg:'查询成功'
            };
        } catch (error) {
            return {
                success:false,
                totle:error,
                data:'',
                msg:'查询失败'
            };
        }
    
}