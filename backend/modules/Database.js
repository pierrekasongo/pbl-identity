const express = require('express')
const conf = require('../config/conf')
//const mysqldump = require('mysqldump')
const moment = require('moment')
var MysqlTools = require('mysql-rp-dump');
const fs = require('fs')
var tool = new MysqlTools();
const dir = __dirname+'/../'+conf.DISPATCH_PATH

const database = {
    dump: () => {
        console.log("Dumping...")
        
        tool.dumpDatabase({
            host: conf.DB_HOST
            , user: conf.DB_USER
            , password: conf.DB_PWD
            , dumpPath: dir
            , database: conf.DB_NAME
        }, function (error, output, message, dumpFileName) {
            if (error instanceof Error) {
                console.log("ERROR ",error);
                if(error. includes("Warning")){
                    return { success: true, filename: dumpFileName }
                }else
                    return false
            } else {
                console.log("Output ", output);
                console.log("message ", message);
                console.log("File ", dumpFileName);
                return { success: true, filename: dumpFileName }
            }
        });
    },
    restore: (filename) => {
        tool.restoreDatabase({
            host: conf.DB_HOST
            , user: conf.DB_USER
            , password: conf.DB_PWD
            , sqlFilePath: dir+filename
            , database: conf.DB_NAME
        }, function (error, output, message) {
            if (error instanceof Error) {
                console.log("ERROR ",error);
                if(error. includes("Warning")){
                    return { success: true, filename: dumpFileName }
                }else
                    return false
            } else {
                console.log("Output ",output)
                console.log("Message ",message)
                fs.unlinkSync(dir+filename)
                return { success: true, filename: filename }
            }
        });
    }
}
module.exports = database