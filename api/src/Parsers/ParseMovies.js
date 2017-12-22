/**
 * Parse IMDB `movies.list` file into JSON.
 *
 * Movies and shows are listed diferently but do not
 * contain a flag so we have to determine which they are
 * based on the structure of the listing.
 *
 * NOTE: movies are listed by original title(non-english)
 * ex: "Howl's Moving Castle" is listed as "Hauru no ugoku shiro"
 *
 * Example TV Show Listing:
 * "#15SecondScare" (2015) {Bubbles of Blood (#1.17)}  2016
 * |show/movie| |show year| |Episode title (season.episode)| |episode year|
 *
 * Example Movie Listing:
 * Chair of Gold (1956)         1956
 * Hauringu (2014)            2014
 * Hauru no ugoku shiro (2004)       2004
 * Haus (1988)           1988
 * Haus (2016)           2016
 * Haus am Meer (1973) (TV)        1973
 * Haus der Frauen (1978) (TV)       1978
 *
 * Emits a stream of Tuples being [movies, shows]
 */

const Transform = require('stream').Transform
const TAB = "\t";

module.exports = class ParseMovies extends Transform {
  constructor(options) {
    super(options)
  }

  _transform(chunk, encoding, callback) {
    const str = chunk.toString()
    const lines = str.split("\n")

    let parsed = []

    lines.forEach(line => {
      const isTvShow = (line[0] === '"');
      if (isTvShow) {
        let show = {}

        const showTitle = /"(.*)"/.exec(line)
        if (showTitle) {
          show['showTitle'] = showTitle[1]
        }

        const showReleaseYear = /\((\d*)\)/.exec(line)
        if (showReleaseYear) {
          show['showReleaseYear'] = showReleaseYear[1]
        }

        const episode = /\{(.*)\}/.exec(line)
        if (episode) {
          const episodeTitle = /([\w\d ]*)/.exec(episode[1])
          if (episodeTitle) {
            show['episodeTitle'] = episodeTitle[1].trim()
          }

          const episodeMeta = /\((.*)\)/.exec(episode[1])
          if (episodeMeta) {
            const [seasonNumber, episodeNumber] = episodeMeta[1].slice(1).split('.')

            show['seasonNumber'] = seasonNumber
            show['episodeNumber'] = episodeNumber
          }
        }

        show['episodeReleaseYear'] = line.slice(-4)
        show['type'] = 'show'

        parsed.push(show)

      } else {

      }




      // const title = /("(.*?)")/.exec(line)
      // // const showYear = /\((.*?)\)/g.exec(line)
      // // const episodeMeta = /\(#(.*?)\)/g.exec(line)

      // console.log(title);

      // if (title) {
      //   // Movies do not have episode information
      //   // so if this exists we know it's a show
      //   const episodeMeta = /{(.*?)}/.exec(line)
      //   if (episodeMeta) {
      //     const episodeTitle = /{(.*?)\(/.exec(episodeMeta[1])

      //     const meta = /\(#(.*?)\)/.exec(episodeMeta[1])
      //     const [season, episodeNumber] = meta[1].split('.')

      //     const episodeYear = '0000'

      //     console.log(episodeTitle);

      //     shows.push({
      //       series: title[1],
      //       season: season,
      //       episode_number: episodeNumber,
      //       episode_title: episodeTitle,
      //       episode_year: episodeYear
      //     })

      //   } else {
      //     const releaseYear = '1970'

      //     movies.push({
      //       title: title[1],
      //       release_year: releaseYear
      //     })
      //   }
      // }
    })

    // console.log(parsed[0])

    this.push(JSON.stringify(parsed))
    callback()
  }
}
