require('dotenv').config({
  path: __dirname + '/../../.env'
})

const db = require('../db')
const fs = require('fs')
const ParseMovies = require('../Parsers/ParseMovies')

function ImportMovies(file) {
  let stream = fs.createReadStream(file, {
    encoding: 'utf8'
  })
  let parser = new ParseMovies({
    objectMode: true
  })

  parser.on('data', (chunk) => {
    parser.pause()
    process.stdout.write('.')

    var parsed = JSON.parse(chunk)
    var promise = db.createRecords(parsed)

    promise
      .then(() => parser.resume())
      .catch(err => console.error(err))


    // var [movies, shows] = JSON.parse(chunk)
    // var writingMovies = db.createMovies(movies)
    // var writingShows = db.createMovies(shows)

    // Promise.all(writingMovies, writingShows)
    //   .then(() => parser.resume())
    //   .catch(err => console.error(err))
  })

  parser.on('error', (err) => {
    console.log('stream error', err);
  })

  parser.on('end', () => {
    console.log('stream ended');
  })

  return stream.pipe(parser)
}

ImportMovies(__dirname + '/../../../data/movies.list')
// module.exports = MoviesImport
