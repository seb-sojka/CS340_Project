var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_sojkas',
  password        : '3468',
  database        : 'cs340_sojkas'
});
module.exports.pool = pool;
