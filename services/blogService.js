const Blog = require('../models/blog');
const Adimn = require('../models/admins');
const Tags = require('./tagsService')
const TagsModel = require('../models/tags')
const BtMaping = require('./blogtagmaping')
const BtModel = require('../models/blog-tag-mapping');
const  Seqeuelize = require('sequelize')
const Op = Seqeuelize.Op;
const md5 = require('md5');
exports.addBlog = async (blogObj)=>{
    try {
        const ins = await Blog.create(blogObj)
        const Bid = ins.toJSON().id;
        const tagsarr = blogObj.Btags.replace('，',',').split(',');
        tagsarr.forEach(async el => {
            let tid;
            let tins;
            const findData =  await TagsModel.findOne({
                where:{
                    Tag:el
                }
            })
            if(!findData){
                tins = await Tags.addTags(blogObj.Btags)
                console.log(tins.data ,';');
                
                tid =   tins.data.id;
            }else{
                tins = findData.toJSON()
                tid = findData.toJSON().id
                console.log(tins ,':');
            }
            console.log(findData,'??');
            
            const mapdata = await BtMaping.addBtMap(Bid,tid)
        });
      
        return {
            success: true,
            data: {
              blog:ins.toJSON(),
            },
            msg: '添加成功'
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


exports.updateBlog = async (blogId,newBlogObj)=>{
    try {
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
    } catch (error) {
        return {
            success:false,
            msg:'修改失败',
            data:''
        }
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
exports.selectByPage = async (page=1,limit=10)=>{
    try {     
    const result = await Blog.findAndCountAll({
        attributes:['id','Bauthor','Btitle','Bdesc','Btags','Bview','Blike','updatedAt'],//筛选查询指定列
        offset:(page-1)*limit,
        limit:+limit,
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
exports.selectBlogByType = async (data)=>{
    try {
        if(data.type == 'tag'){
            const tag = data.tag
            const tagdata = await TagsModel.findOne({
                where:{
                    Tag:tag
                },
                attributes:['id']
            })
            console.log(tagdata.dataValues.id);
            const tagID = tagdata.dataValues.id
           
            const bid = await BtModel.findAll({
                where:{
                    tid:tagID
                },
                attributes:['bid']
            }) 
            const bidarr = JSON.parse(JSON.stringify(bid)).map(el=>el.bid)
            const result = await Blog.findAndCountAll({
                attributes:['id','Bauthor','Btitle','Bdesc','Btags','Bview','Blike','updatedAt'],//筛选查询指定列
                offset:(data.page-1)*data.limit,
                limit:+data.limit,
                where:{
                    id:{[Op.in]: bidarr}
                }
            })
                return {
                    success:true,
                    totle:result.count,
                    data:JSON.parse(JSON.stringify(result.rows)),
                    msg:'查询成功'
                };
           
        }else if(data.type == 'id'){
            const result =  await Blog.findByPk(data.id,{
                attributes:['Bauthor','Bcontent','Bview','Blike']
            })
            return {
                success:true,
                data:result.dataValues,
                msg:'查询成功'
            };
        }
        
    } catch (error) {
        return {
            success:false,
            error:error,
            msg:'查询失败'
        }
    }
}
exports.getAllBlog =  async ()=>{
    try {
        const result = await  Blog.findAll({
            attributes:['id','Btitle','Btags','updatedAt'],//筛选查询指定列
        })
        console.log(JSON.stringify(result));
        
        return {
            success:true,
            data:JSON.parse(JSON.stringify(result)),
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

exports.selectBlogToUpdateById = async (id)=>{
    const result =  await Blog.findByPk(id,{
        attributes:['Bauthor','Bcontent','Btitle','Bdesc','Btags']
    })
    return {
        success:true,
        data:result.dataValues,
        msg:'查询成功'
    };
}