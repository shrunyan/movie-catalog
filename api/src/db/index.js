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
      resolve(result.insertId)
    } else {
      reject(err)
    }
  })
}

module.exports = {
  createMovies: (movies) => {
    if (!Array.isArray(movies)) {
      throw new TypeError("Movies must be an Array")
    }
    return new Promise((resolve, reject) => {
      let values = []
      let sql = "INSERT IGNORE INTO `movies` (title, category) VALUES "

      movies.forEach(movie => {
        if (movie.title) {
          sql += "(?,?),"
          Object.keys(movie).forEach(key => {
            values.push(movie[key])
          })
        }
      })

      // remove ending comma
      sql = sql.slice(0, -1)

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
