const { Sequelize} = require('sequelize')
let sequelize = new Sequelize('reactBlog', 'reactBlog', 'PnDnNEktnhaaAbAN', {
    host: "47.100.23.14",
    // host: "121.4.141.100",
    dialect:'mysql',
    // logging:null
  })
module.exports = sequelize;