require('dotenv').load()

const db = require('../db')
const fs = require('fs')
const MovieParser = require('../Parsers/MovieParser')

const FILE = process.cwd() + '/../data/movies.list'
const stream = fs.createReadStream(FILE, {encoding: 'utf8'})
const parser = new MovieParser()

parser.on('data', (chunk) => {
  var str = chunk.toString()
  var rows = JSON.parse(str)
  var promises = rows.map(row => db.createMovie(row))

  Promise.all(promises)
    .catch(err => console.error(err))
})

stream.pipe(parser)
