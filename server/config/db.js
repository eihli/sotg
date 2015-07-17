// If env variable RDS_HOSTNAME is set, we are on AWS and
// if we have MYSQL_DATABASE, we are on CircleCI and
// don't need to use db/config.js
var config = (process.env.RDS_HOSTNAME || process.env.MYSQL_DATABASE) ? {} : require('../db/config.js');
var knex = require('knex')({
  client: 'mysql',
  //TODO find the proper address for the 
  // Here we first check to see if we are on AWS,
  // then we check to see if we are on Docker (MYSQL_DATABASE_...)
  // then we just use the file on our local machine
  connection: process.env.CLEARDB_DATABASE_URL || {
    host: process.env.RDS_HOSTNAME || process.env.MYSQL_DATABASE_SERVER || config.host, // TODO: Set hardcoded host as env variable.
    user: process.env.RDS_USERNAME || process.env.MYSQL_DATABASE_USER || config.user,
    password: process.env.RDS_PASSWORD || process.env.MYSQL_DATABASE_PASSWORD || config.password,
    database: process.env.RDS_DB_NAME || process.env.MYSQL_DATABASE || config.database,
    port: process.env.RDS_PORT || '3306',
    charset: 'utf8mb4'
  }
});

var bookshelf = require('bookshelf')(knex);



module.exports = bookshelf;
var bookshelf = module.exports = require('bookshelf')(knex);
