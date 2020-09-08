const FriendLink = require('../models/friendLink');

exports.getAllFriend =  async ()=>{
    try {
        const ins =   await  FriendLink.findAll({
            where:{
                isShow:true
            }
        })
        return {
            success:true,
            data:ins,
            msg:'查询成功'
        };
    } catch (error) {
        return {
            success:false,
            data:error,
            msg:'查询失败'
        };
    }

}
exports.selectFriendLinkByPage = async (page)=>{
        try {
            const result = await FriendLink.findAndCountAll({
                offset:(page-1)*10,
                limit:10,
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
exports.addFriendLink = async (LinkObj)=>{
    try {
        const ins = await FriendLink.create(LinkObj)
        return {
            success: true,
            data: {
              friendlink:ins.toJSON(),
            },
            msg: '添加成功'
        }
    } catch (error) {
        return {
            success: false,
            error,
            msg: '添加成功'
        }
    }
}
exports.upDateisShow = async (linkid,newLink)=>{
    try {
        const ins = await FriendLink.update(newLink,{
            where:{
                id:linkid
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
            error
        }
    }
}
exports.deletLink = async (linkid)=>{
    try {
      const ins =  FriendLink.destroy({
            where:{
                id:linkid
            }
        })
        return {
            success:true,
            data:ins,
            msg:'删除成功'
        }
    } catch (error) {
        return {
            success:false,
            error,
            msg:'删除失败'
        }
    }
}