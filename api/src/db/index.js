const mysql = require('mysql2')
const connPool = mysql.createPool({
  connectionLimit: process.env.SQL_CONN_LIMIT,
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
})

function run(sql, values, resolve, reject) {
  connPool.query(sql, values, (err, result) => {
    if (!err) {
      // console.log('results', result.insertId)
      resolve(result.insertId)
    } else {
      reject(err)
    }
  })
}

module.exports = {
  createMovie: ({title, category}) => {
    if (!title) {
      return Promise.resolve(null)
    }

    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO `movies` (title, category) VALUES (?,?)"
      const values = [title, category]

      run(sql, values, resolve, reject)
    })
  },
  getMovie: (title) => {
    if (!title) {
      return Promise.resolve(null)
    }
    return new Promise((resolve, reject) => {
      const sql = "SELECT FROM `movies` WHERE `title` = ?"
      run(sql, [title], resolve, reject)
    })
  }
}
