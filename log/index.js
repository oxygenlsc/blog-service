const log4js = require('log4js');
log4js.configure({
    appenders:{
        sql:{
            type:'dateFile',
            filename:'./logs/sql.log',
            maxLogSize:1024*1024,//配置文件的最大字节数 当类容超过这个之后就会备份一个出来再重新在这个文件里写
            keepFileExt:true,//让备份的文件以log为后缀
            // daysToKeep:1,保存几天的
            layout:{
                type:'pattern',
                pattern:'%d{yyyy年MM月dd日 hh小时mm分ss秒} %p %c: %m%n'
            }//配置格式
        },
        default:{
            type:'file',
            filename:'./logs/common.log',
            layout:{
                type:'pattern',
                pattern:'%d{yyyy年MM月dd日 hh小时mm分ss秒} %p %c: %m%n'
            }//配置格式
        }
    },//出口
    categories:{
        sql:{
            appenders:['sql'],//该分类使用sql日志出口
            level:'all'
        },
        default:{
            appenders:['default'],
            level:'all'
        }
    }
})
process.on('exit',()=>{
    log4js.shutdown()
})
const logger = log4js.getLogger('sql');
const logs = log4js.getLogger('default');
logger.level = 'all'
logs.level = 'all'
exports.sqlLog = logger
exports.log = logs