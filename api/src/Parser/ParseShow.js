/**
 * Example TV Show Listing:
 * "#15SecondScare" (2015) {Bubbles of Blood (#1.17)}  2016
 * |show/movie| |show year| |Episode title (season.episode)| |episode year|
 *
 */
module.exports = function ParseShow (line) {
  let show = {}

  const showTitle = /"(.*)"/.exec(line)
  if (showTitle) {
    show['show_title'] = showTitle[1]
  }

  const showReleaseYear = /\((\d*)\)/.exec(line)
  if (showReleaseYear) {
    show['release_year'] = showReleaseYear[1]
  }

  const episode = /\{(.*)\}/.exec(line)
  if (episode) {
    const episodeTitle = /([\w\d ]*)/.exec(episode[1])
    if (episodeTitle) {
      show['episode_title'] = episodeTitle[1].trim()
    }

    const episodeMeta = /\((.*)\)/.exec(episode[1])
    if (episodeMeta) {
      const [seasonNumber, episodeNumber] = episodeMeta[1].slice(1).split('.')

      show['season_number'] = seasonNumber
      show['episode_number'] = episodeNumber
    }
  }

  show['episode_release_year'] = line.slice(-4)
  show['type'] = 'show'

  return show
}
