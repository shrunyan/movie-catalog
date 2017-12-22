require('dotenv').config({
  path: __dirname + '/../../.env'
})

const db = require('../db')
const fs = require('fs')
const Parser = require('../Parser')

/**
 * This importer must handle parsing Movie and Tv Show titles
 * from the same file. This how IMDB exports them.
 * @param {[type]} file [description]
 */
function Importer (file) {
  let stream = fs.createReadStream(file, {
    encoding: 'utf8'
  })
  let parser = new Parser({
    objectMode: true
  })

  parser.on('data', (chunk) => {
    parser.pause()
    process.stdout.write('.')

    var parsed = JSON.parse(chunk)
    var shows = db.createRecords('shows', parsed.shows)
    // var movies = db.createRecords('movies', parsed.movies)

    Promise.all([shows])
      .then(() => parser.resume())
      .catch(err => console.error(err))
  })

  parser.on('error', (err) => {
    console.log('stream error', err)
  })

  parser.on('end', () => {
    console.log('stream ended')
  })

  return stream.pipe(parser)
}

Importer(__dirname + '/../../../data/movies.sample.list')
// module.exports = MoviesImport
