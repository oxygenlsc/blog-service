const Adimn = require('../models/admins')
const md5 = require('md5')
exports.addAdimn = async function (adminObj) {

    // 1 因该判断数据库里面管理员是不是存在，前面进行业务判断 oprID谁再操作这个方法
    if (!adminObj.LoginId || !adminObj.loginPwd) {
        return {
            success: false,
            data: '',
            msg: '密码或账号传入字段名错误'
        }
    }
    if (typeof adminObj.LoginId != 'string' || typeof adminObj.loginPwd != 'string') {
        return {
            success: false,
            data: '',
            msg: '密码或账号传入类型不为字符串类型'
        }
    }
    const adminer =await Adimn.findOne({
        where: {
            LoginId: adminObj.LoginId
        }
    })
    if(adminer){
        return {
            success: false,
            data: adminer.toJSON(),
            msg: '用户已存在！'
        }
    }

    let insertData = {
        LoginId: adminObj.LoginId,
        loginPwd: md5(adminObj.loginPwd)
    }
    const ins = await Adimn.create(insertData)
    //   Adimn.bulkCreate() 传入数组插入多条数据
    return {
        success: true,
        data: ins.toJSON(),
        msg: '添加成功'
    }
}
exports.deletAdimn = async function (adminid, nowAdmin) {
    if (!nowAdmin) {
        return {
            success: false,
            data: '',
            msg: '没有传入当前管理员账号密码'
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
            msg: '没有传入当前管理员'
        }
    }
    Adimn.destroy({
        where: {
            id: adminid
        }
    })

}
//修改
exports.updateAdimn = async function (id, adminObj, nowAdmin) {
    if (!nowAdmin) {
        return {
            success: false,
            data: '',
            msg: '没有传入当前管理员账号密码'
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
            data: adminer,
            msg: '没有管理员权限'
        }
    }
    adminObj.loginPwd = md5(adminObj.loginPwd)
    const ins = await  Adimn.update(adminObj, {
        where: {
            LoginId: id
        }
    })
    return {
        success:true,
        msg:'修改成功',
        data:ins
    }
}