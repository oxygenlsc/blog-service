const sequelize = require('./db');
const { DataTypes} = require('sequelize');
const Blog = sequelize.define('Blog',{
            Bauthor:{
                type:DataTypes.STRING,
                allowNull:false // 不允许为空
            },
            Btitle:{
                type:DataTypes.STRING,
                allowNull:false // 不允许为空
            },
            Bdesc:{
                type:DataTypes.STRING,
                allowNull:false // 不允许为空
            },
            Bcontent:{
                type:DataTypes.TEXT,
                allowNull:false // 不允许为空
            },
            Blike:{
                type:DataTypes.NUMBER,
                allowNull:true
            },

},{
    freezeTableName:true,//这个模型会帮我们创表 这个为true的话模型名是啥表名就是啥要不然表名就会是加s的
    paranoid:true//从此以后该表的数据不会真的删除而是添加一列删除时间
})
module.exports = Blog;