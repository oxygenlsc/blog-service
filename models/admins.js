//学校里面的管理员模型创建
const sequelize = require('./db');
const { DataTypes} = require('sequelize')
//主键不用自己定义它会帮我们搞定 返回一个模型对象
const Admin = sequelize.define('Admin', {
    LoginId:{
        type:DataTypes.STRING, //字符串类型
        allowNull:false // 不允许为空
    },
    loginPwd:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,//这个模型会帮我们创表 这个为true的话模型名是啥表名就是啥要不然表名就会是加s的
    paranoid:true//从此以后该表的数据不会真的删除而是添加一列删除时间
});
module.exports = Admin;