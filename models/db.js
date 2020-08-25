const { Sequelize} = require('sequelize')
let sequelize = new Sequelize('reactBlog', 'reactBlog', 'PnDnNEktnhaaAbAN', {
    host: "47.100.23.14",
    dialect:'mysql',
    // logging:null
  })
module.exports = sequelize;