const mysql = require('mysql2')
const connPool = mysql.createPool({
  connectionLimit: process.env.SQL_CONN_LIMIT,
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE
})

// function run (sql, values, resolve, reject) {
//   connPool.query(sql, values, (err, result) => {
//     if (!err) {
//       resolve(result.insertId)
//     } else {
//       reject(err)
//     }
//   })
// }

function insertShowQuery (records) {
  let values = []
  let sql = 'INSERT IGNORE INTO `shows` (show_title, category) VALUES '

  records.forEach(record => {
    if (record.show_title) {
      // console.log(record)

      sql += '(?,?),'

      values.push(record['show_title'])
      values.push(record['category']) // TODO deal with undefined values

      // Object.keys(record).forEach(key => {
      //   values.push(record[key])
      // })
    }
  })

  // remove ending comma
  sql = sql.slice(0, -1)

  return [sql, values]
}

module.exports = {
  createRecords: (table, records) => {
    if (!Array.isArray(records)) {
      throw new TypeError('Must be an Array of Movies/Shows')
    }

    return new Promise((resolve, reject) => {
      // let sql = ''

      if (table === 'shows') {
        var [sql, values] = insertShowQuery(records)
      } else if (table === 'movies') {
        console.log('TODO Build movie insert query')
      }

      console.log(sql)
      console.log(values)

      connPool.execute(sql, values, (err, result) => {
        if (!err) {
          resolve(result.insertId)
        } else {
          reject(err)
        }
      })
    })
  }

  // createMovies: (movies) => {
  //   if (!Array.isArray(movies)) {
  //     throw new TypeError("Movies must be an Array")
  //   }
  //   return new Promise((resolve, reject) => {
  //     let values = []
  //     let sql = "INSERT IGNORE INTO `movies` (title, category) VALUES "

  //     movies.forEach(movie => {
  //       if (movie.title) {
  //         sql += "(?,?),"
  //         Object.keys(movie).forEach(key => {
  //           values.push(movie[key])
  //         })
  //       }
  //     })

  //     // remove ending comma
  //     sql = sql.slice(0, -1)

  //     run(sql, values, resolve, reject)
  //   })
  // },
  // createShows: (shows) => {
  //   if (!Array.isArray(shows)) {
  //     throw new TypeError("shows must be an Array")
  //   }
  //   return new Promise((resolve, reject) => {
  //     let values = []
  //     let columns = Object.keys(shows[0].join(','))
  //     let sql = `INSERT IGNORE INTO \`shows\` (${columns}) VALUES `

  //     // For each show entry dynamically
  //     // add sql and values
  //     shows.forEach(show => {
  //       if (show.series && show.episode_title) {
  //         const cols = Object.keys(show)
  //         // sql += Array(cols.length).map(_ => '?').join(',').slice(0, -1)
  //         sql += `({?,?}),`

  //         Object.keys(show).forEach(key => {
  //           values.push(show[key])
  //         })
  //       }
  //     })

  //     // remove ending comma
  //     sql = sql.slice(0, -1)

  //     run(sql, values, resolve, reject)
  //   })
  // },
  // getMovie: (title) => {
  //   if (!title) {
  //     return Promise.resolve(null)
  //   }
  //   return new Promise((resolve, reject) => {
  //     const sql = "SELECT FROM `movies` WHERE `title` = ?"
  //     run(sql, [title], resolve, reject)
  //   })
  // }
}
