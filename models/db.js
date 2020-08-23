const { Sequelize} = require('sequelize')
let sequelize = new Sequelize('nodetest', 'nodetest', '695288', {
    host: "47.100.23.14",
    dialect:'mysql',
    // logging:null
  })
module.exports = sequelize;