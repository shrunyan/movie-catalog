require('dotenv').config({
  path: __dirname + '/../../.env'
})

const db = require('../db')
const fs = require('fs')
const MoviesJsonParser = require('../Parsers/MoviesJsonParser')

const file = __dirname + '/../../../data/movies.list'
let stream = fs.createReadStream(file, {
  encoding: 'utf8'
})
let parser = new MoviesJsonParser({
  objectMode: true
})

parser.on('data', (chunk) => {
  var rows = JSON.parse(chunk)
  var promises = rows.map(row => db.createMovie(row))

  Promise.all(promises)
    .then(results => console.log(results.length))
    .catch(err => console.error(err))
})

parser.on('error', () => {
  console.log('stream error');
})

parser.on('end', () => {
  console.log('stream ended');
})

stream.pipe(parser)
