const mysql = require('mysql2')
const connPool = mysql.createPool({
  connectionLimit: Number(process.env.SQL_CONN_LIMIT),
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
})

// console.log(connPool)

module.exports = {
  createMovie: ({title, category}) => {
    if (!title) {
      return Promise.resolve()
    }

    return new Promise((resolve, reject) => {
      // console.log('createMovie', title)

      const sql = "INSERT INTO `movies` ('title', 'category') VALUES(?,?)"
      const values = [title, category]

      connPool.query(sql, values, (err, result) => {
        console.error(err, result)
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  }
}
