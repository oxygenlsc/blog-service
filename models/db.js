const { Sequelize} = require('sequelize')
let sequelize = new Sequelize('reactBlog', 'reactBlog', '数库密码', {
    host: "自己数据库地址",
    dialect:'mysql',
    // logging:null
  })
module.exports = sequelize;