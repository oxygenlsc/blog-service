const admins = require('./admins')
const blog = require('./blog')
const tags = require('./tags')
const btmapping = require('./blog-tag-mapping')
const commit = require('./commit')
const FriendLink = require('./friendLink')
const sequelize = require('./db');
sequelize.sync({alter:true}).then(()=>{
    console.log('所有表同步完成');
})


