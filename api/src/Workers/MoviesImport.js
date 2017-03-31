require('dotenv').config({
  path: __dirname + '/../../.env'
})

const db = require('../db')
const fs = require('fs')
const MoviesJsonParser = require('../Parsers/MoviesJsonParser')

function MoviesImport(file) {
  let stream = fs.createReadStream(file, {
    encoding: 'utf8'
  })
  let parser = new MoviesJsonParser({
    objectMode: true
  })

  parser.on('data', (chunk) => {
    parser.pause()
    process.stdout.write('.')

    var movies = JSON.parse(chunk)
    var promise = db.createMovies(movies)

    promise
      .then(() => parser.resume())
      .catch(err => console.error(err))
  })

  parser.on('error', (err) => {
    console.log('stream error', err);
  })

  parser.on('end', () => {
    console.log('stream ended');
  })

  return stream.pipe(parser)
}

MoviesImport(__dirname + '/../../../data/movies.list')
// module.exports = MoviesImport
