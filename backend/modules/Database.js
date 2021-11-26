const express = require('express')
const conf = require('../config/conf')
//const mysqldump = require('mysqldump')
const moment = require('moment')
var MysqlTools = require('mysql-rp-dump');
const fs = require('fs')
const path = require('path')
const fsExtra = require('fs-extra')
var tool = new MysqlTools();
const dir = __dirname + '/../' + conf.DISPATCH_PATH

_createPhotoDir: async (dirname) => {
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname);
    }
}
const database = {

    dump: async () => {
        console.log("Dumping...")
        fsExtra.emptyDir(dir)
        const photoDir = dir + "photos/"
        fsExtra.ensureDir(photoDir, err => {
            console.log("Creating photo DIR if not exists")
            console.log(err) // => null
            fsExtra.copy(__dirname + '/../' + conf.UPLOADS_PATH, photoDir, function (err) {
                console.log("copying photo folder...")
                if (err) {
                    console.log('An error occured while copying the folder.')
                    console.error(err)
                }
                console.log('Copy completed!')
            });
        })
        
        tool.dumpDatabase({
            host: conf.DB_HOST
            , user: conf.DB_USER
            , password: conf.DB_PWD
            , dumpPath: dir
            , database: conf.DB_NAME
        }, function (error, output, message, dumpFileName) {
            console.log("Dumping database...")
            if (error instanceof Error) {
                console.log("ERROR ", error);
                if (error.includes("Warning")) {
                    return { success: true, filename: dumpFileName }
                } else
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
            , sqlFilePath: dir + filename
            , database: conf.DB_NAME
        }, function (error, output, message) {
            if (error instanceof Error) {
                console.error("ERROR ", error);
                if (error.includes("Warning")) {
                    return { success: true }
                } else
                    return { success: false}
            } else {
                console.log("Output ", output)
                console.log("Message ", message)
                fs.unlinkSync(dir + filename)
                return { success: true}

            }
        });
    }
}
module.exports = database