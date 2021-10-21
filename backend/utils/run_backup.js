const conf = require('../config/conf')
const execFile = require('child_process').execFile;
const date = new Date();

const dbtools = {

  backup: () => {
    const current_date = `${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}`;
    const backup_file = `export_${current_date}`;
    const backup_file_ext = `export_${current_date}.sql`;

    let backup_script = `pg_dump --username=${conf.DB_USER} ${conf.DB_NAME}`;

    var script = execFile(
      `./backup.sh`,
      [backup_script, backup_file_ext, conf.DB_PWD],
      (error, stdout, stderr) => {
        if (error !== null) {
          console.log(`Error: ${error}`);
          return false
        }
        console.log("Backup effectué avec succès")
        return true
      }
    );
  },
  restore:() => {

  }
}

module.exports = dbtools