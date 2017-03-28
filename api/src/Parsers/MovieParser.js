var Transform = require('stream').Transform
var fs = require('fs')

class MovieParser {
  constructor(file) {
    this.file = file
  }

  run() {
    const transform = new Transform()
    const stream = fs.ReadStream(this.file)
    // stream.on('close', this.close)
    // stream.on('data', this.data)
    // stream.on('end', this.end)
    // stream.on('error', this.error)

    this.readStream = readStream
    return readStream
  }

  data(chunk) {
    // example line
    // "#15SecondScare" (2015) {Bubbles of Blood (#1.17)} 2016
    // |   category   | |year| |       Title            | |year|

    const data = chunk.toString('utf8')
    const lines = data.split("\n")
    const rows = lines.map(line => {
      const category = /("(.*?)")/.exec(line)
      const title = /{(.*?)}/.exec(line)

      return {
        title: title ? title[0] : null,
        category: category ? category[0] : null
      }
    })

    console.log(rows)

    // TODO parse starting position
    // TODO on row trigger event to info stream
  }

  error(err) {
    console.log('stream error', err)
    throw err
  }

  close() {
    console.log('stream closed')
  }

  end() {
    console.log('stream ended')
  }
}

module.exports = function MovieParserFactory(file, cb) {
  if (!file) {
    throw new Error('Missing required file path')
    return
  }
  const parser = new MovieParser(file)
  return parser.run()
}
