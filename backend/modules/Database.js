const express = require('express')
const conf = require('../config/conf')
//const mysqldump = require('mysqldump')
const moment = require('moment')
var MysqlTools = require('mysql-rp-dump');

var tool = new MysqlTools();
const database = {
    /*dump: () => {
        moment.locale()
        let d = moment(new Date()).format('D-M-Y')
        const filename = `dispatch_${d}.sql.gz`
        console.log("Filename ",filename)
        mysqldump({
            connection: {
                host: conf.DB_HOST,
                user: conf.DB_USER,
                password: conf.DB_PWD,
                database: conf.DB_NAME
            },
            dump: { schema: { table: { dropIfExist: true } } },
            dumpToFile: `../dispatch/${filename}`,
            compressFile: true,
        }).then(data =>{
            console.log("Data ", data)
            return true
        }).catch(err =>{
            return false
        })
    },*/

    dump: () => {
        console.log("Dumping...")
        
        tool.dumpDatabase({
            host: conf.DB_HOST
            , user: conf.DB_USER
            , password: conf.DB_PWD
            , dumpPath: conf.DISPATCH_PATH
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
            , sqlFilePath: conf.DISPATCH_PATH+filename
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
                return { success: true, filename: filename }
            }
        });
    }
}
module.exports = database