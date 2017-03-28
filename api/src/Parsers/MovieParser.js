var Transform = require('stream').Transform

module.exports = class MovieParser extends Transform{
  constructor(options) {
    super(options)
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString()
    const lines = str.split("\n")
    const rows = lines.map(line => {
      const category = /("(.*?)")/.exec(line)
      const title = /{(.*?)}/.exec(line)

      return {
        title: title ? title[0] : null,
        category: category ? category[0] : null
      }
    })

    console.log('rows length', rows.length)

    this.push(JSON.stringify(rows))
  }
}
