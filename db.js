// const mysql = require('mysql2/promise');
// const config = {
//     db: {
//       /* don't expose password or any sensitive info, done only for demo */
//       host: "103.227.176.29",
//       user: "kgworlda_nodejstest",
//       password: "P@ssw0rd",
//       database: "kgworlda_nodejstest",
//     }
//   };
  
//   async function query(sql, params) {
//     const connection = await mysql.createConnection(config.db);
//     const [results] = await connection.execute(sql, params);

//   return results;
// }

// console.log('connect ok!!')
// module.exports = {
//   query
// }




const util = require('util')
const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "103.227.176.29",
  user: "kgworlda_nodejstest",
  password: "P@ssw0rd",
  database: "kgworlda_nodejstest",
})

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection) connection.release()

  return
})

pool.query = util.promisify(pool.query)

module.exports = pool