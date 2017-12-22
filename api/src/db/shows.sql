CREATE TABLE `shows` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `show_title` varchar(255) DEFAULT NULL,
  `episode_title` varchar(255) DEFAULT NULL,
  `episode_number` int(11) DEFAULT NULL,
  `episode_release_year` int(6) DEFAULT NULL,
  `season_title` varchar(255) DEFAULT NULL,
  `season_number` int(6) DEFAULT NULL,
  `category` varchar(255) DEFAULT '',
  `release_year` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
