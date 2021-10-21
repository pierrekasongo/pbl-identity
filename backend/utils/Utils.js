const crypto = require('crypto')
const conf = require('../config/conf.json')
const Utils = {

    hash:(word,salt) => {
        let _salt = salt || conf.SALT
        let hash = crypto.pbkdf2Sync( word, _salt, 1000, 64, 'sha512' ).toString('hex')
        return hash
    }
}

module.exports = Utils