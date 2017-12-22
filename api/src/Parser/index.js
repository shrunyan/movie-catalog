/**
 * Parse IMDB `movies.list` file into JSON.
 *
 * Movies and shows are listed diferently but do not
 * contain a flag so we have to determine which they are
 * based on the structure of the listing.
 *
 * Emits a stream of Hashes being {movies: Array, shows: Array}
 */

const ParseShow = require('./ParseShow')
const Transform = require('stream').Transform

module.exports = class Parser extends Transform {
  _transform (chunk, encoding, callback) {
    const str = chunk.toString()
    const lines = str.split('\n')

    let parsed = {
      movies: [],
      shows: []
    }

    lines.forEach(line => {
      const isShow = (line[0] === '"')
      if (isShow) {
        parsed.shows.push(ParseShow(line))
      } else {
        // console.log('TODO// Parse Movies')
      }
    })

    this.push(JSON.stringify(parsed))

    callback()
  }
}
