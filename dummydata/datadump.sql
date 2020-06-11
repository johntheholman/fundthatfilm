-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 27, 2019 at 12:32 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_funder`
--

-- --------------------------------------------------------

--
-- Table structure for table `comparables`
--

CREATE TABLE `comparables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `us_theatrical_release` date NOT NULL,
  `us_gross_bo` bigint(20) UNSIGNED NOT NULL,
  `intl_gross_bo` bigint(20) UNSIGNED NOT NULL,
  `budget` bigint(20) UNSIGNED NOT NULL,
  `mpaa_rating` varchar(5) NOT NULL,
  `audience_satisfaction` float NOT NULL,
  `us_theatrical_end` date NOT NULL,
  `genre` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comparables`
--

INSERT INTO `comparables` (`id`, `title`, `us_theatrical_release`, `us_gross_bo`, `intl_gross_bo`, `budget`, `mpaa_rating`, `audience_satisfaction`, `us_theatrical_end`, `genre`) VALUES
(3, 'The Lake House', '2006-06-19', 52330111, 62500000, 40000000, 'PG', 0.73, '2006-09-18', 'Drama'),
(4, 'The Amazing Spider-Man', '2012-07-03', 262030663, 495859604, 220000000, 'PG-13', 0.77, '2012-10-12', 'Adventure'),
(5, 'Justice League', '2017-11-17', 229024295, 426920914, 300000000, 'PG-13', 0.73, '2018-03-09', 'Action');

-- --------------------------------------------------------

--
-- Table structure for table `comparables_distribution`
--

CREATE TABLE `comparables_distribution` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comparables_id` bigint(20) UNSIGNED NOT NULL,
  `distribution_companies_id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comparables_distribution`
--

INSERT INTO `comparables_distribution` (`id`, `comparables_id`, `distribution_companies_id`) VALUES
(1, 3, 1),
(2, 4, 2),
(3, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `comparables_funding`
--

CREATE TABLE `comparables_funding` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comparables_id` bigint(20) UNSIGNED NOT NULL,
  `funding_partners_id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comparables_funding`
--

INSERT INTO `comparables_funding` (`id`, `comparables_id`, `funding_partners_id`) VALUES
(1, 3, 1),
(2, 4, 2),
(3, 4, 3),
(4, 5, 4),
(5, 5, 5),
(6, 5, 6),
(7, 5, 7);

-- --------------------------------------------------------

--
-- Table structure for table `comparables_images`
--

CREATE TABLE `comparables_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comparables_id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comparables_images`
--

INSERT INTO `comparables_images` (`id`, `comparables_id`, `image_url`) VALUES
(1, 4, 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/eA2D86Y6VPWuUzZyatiLBwpTilQ.jpg'),
(2, 3, 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/tHpc1118dYWLnHZleGhwZxRbpae.jpg'),
(3, 5, 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/eifGNCSDuxJeS1loAXil5bIGgvC.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `current_connections`
--

CREATE TABLE `current_connections` (
  `id` int(10) UNSIGNED NOT NULL,
  `users_id` bigint(20) UNSIGNED NOT NULL,
  `connected` datetime NOT NULL,
  `last_action` datetime NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `distribution_companies`
--

CREATE TABLE `distribution_companies` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `distribution_companies`
--

INSERT INTO `distribution_companies` (`id`, `name`) VALUES
(1, 'Warner Bros. Pictures'),
(2, 'Sony Pictures');

-- --------------------------------------------------------

--
-- Table structure for table `funding_partners`
--

CREATE TABLE `funding_partners` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `funding_partners`
--

INSERT INTO `funding_partners` (`id`, `name`) VALUES
(1, 'Touchstone'),
(2, 'Columbia Pictures'),
(3, 'Marvel Studios'),
(4, 'DC Films'),
(5, 'RatPac Entertainment'),
(6, 'Atlas Entertainment'),
(7, 'Cruel and Unusual Films');

-- --------------------------------------------------------

--
-- Table structure for table `inflation`
--

CREATE TABLE `inflation` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `year` smallint(5) UNSIGNED NOT NULL,
  `annual_avg_rate` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `percentages`
--

CREATE TABLE `percentages` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `rate` float UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `percentages`
--

INSERT INTO `percentages` (`id`, `name`, `rate`) VALUES
(1, 'theatrical_film_rental', 0.5),
(2, 'theatrical_studio_dist_fee', 0.25),
(3, 'home_ent_dist_fee', 0.25),
(4, 'theatrical_home_sales_agent_fee', 0.05),
(5, 'ppv_sales_agent_fee', 0.15),
(6, 'premium_cable_sales_agent_fee', 0.15),
(7, 'free_tv_sales_agent_fee', 0.15),
(8, 'cable_syndicated_sales_agent_fee', 0.05),
(9, 'intl_sales_agent_fee', 0.2),
(10, 'consumer_product_sales_agent_fee', 0.15),
(11, 'production_financing_expense', 0.06),
(12, 'talent_participation', 0.07);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(100) NOT NULL,
  `year` smallint(5) UNSIGNED NOT NULL,
  `logline` text NOT NULL,
  `synopsis` text NOT NULL,
  `production_stage` varchar(20) NOT NULL,
  `genre` varchar(30) NOT NULL,
  `runtime` tinyint(3) UNSIGNED NOT NULL,
  `mpaa_rating` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `year`, `logline`, `synopsis`, `production_stage`, `genre`, `runtime`, `mpaa_rating`) VALUES
(1, 'The Greatest Movie', 2019, 'In class no one can hear you scream', 'Student try to finalize a student project as well as juggling the demands of a portfolio and trying to find a job.', 'Development', 'Horror', 130, 'PG-13'),
(2, 'The Worst Movie', 2019, 'Too Fast, Too Many Typos', 'Slowing your brain and fingers leads to less grammatical and spelling errors in the future.', 'Distribution', 'Psychological Thriller', 90, 'R');

-- --------------------------------------------------------

--
-- Table structure for table `projects_comparables`
--

CREATE TABLE `projects_comparables` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `projects_id` bigint(20) UNSIGNED NOT NULL,
  `comparables_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects_comparables`
--

INSERT INTO `projects_comparables` (`id`, `projects_id`, `comparables_id`) VALUES
(1, 1, 3),
(2, 1, 4),
(105, 2, 4),
(106, 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `projects_images`
--

CREATE TABLE `projects_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `projects_id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sharable`
--

CREATE TABLE `sharable` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comparables_id` bigint(20) UNSIGNED NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sharable`
--

INSERT INTO `sharable` (`id`, `comparables_id`, `token`) VALUES
(1, 3, 'f1f3aabffb332762c3c9c0cd87f9e280380d0a8b'),
(2, 4, 'f1f3aabffb332762c3c9c0cd87f9e280380d0a8b');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `last_login` datetime NOT NULL,
  `email` text NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `last_login`, `email`, `password`) VALUES
(1, 'Bill S. Preston, Esq.', '2016-02-14 18:18:18', 'bill@wyldstallyns.com', '2beb0192eb1ca5a8756bc89a09b93036e1854049'),
(2, 'Ted Theodore Logan', '2018-06-07 08:32:12', 'ted@wyldstallyns.com', 'a9b94b97c6027d050c13d3f5912920f593ae7004');

-- --------------------------------------------------------

--
-- Table structure for table `users_projects`
--

CREATE TABLE `users_projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `users_id` bigint(20) UNSIGNED NOT NULL,
  `projects_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_projects`
--

INSERT INTO `users_projects` (`id`, `users_id`, `projects_id`) VALUES
(1, 1, 1),
(5, 1, 2),
(6, 2, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comparables`
--
ALTER TABLE `comparables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `comparables_distribution`
--
ALTER TABLE `comparables_distribution`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `comparables_id` (`comparables_id`,`distribution_companies_id`);

--
-- Indexes for table `comparables_funding`
--
ALTER TABLE `comparables_funding`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `comparables_id` (`comparables_id`,`funding_partners_id`);

--
-- Indexes for table `comparables_images`
--
ALTER TABLE `comparables_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `current_connections`
--
ALTER TABLE `current_connections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `distribution_companies`
--
ALTER TABLE `distribution_companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `funding_partners`
--
ALTER TABLE `funding_partners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inflation`
--
ALTER TABLE `inflation`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `percentages`
--
ALTER TABLE `percentages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects_comparables`
--
ALTER TABLE `projects_comparables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `projects_id` (`projects_id`,`comparables_id`);

--
-- Indexes for table `projects_images`
--
ALTER TABLE `projects_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sharable`
--
ALTER TABLE `sharable`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_projects`
--
ALTER TABLE `users_projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_id` (`users_id`,`projects_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comparables`
--
ALTER TABLE `comparables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comparables_distribution`
--
ALTER TABLE `comparables_distribution`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `comparables_funding`
--
ALTER TABLE `comparables_funding`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `comparables_images`
--
ALTER TABLE `comparables_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `current_connections`
--
ALTER TABLE `current_connections`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `distribution_companies`
--
ALTER TABLE `distribution_companies`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `funding_partners`
--
ALTER TABLE `funding_partners`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `inflation`
--
ALTER TABLE `inflation`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `percentages`
--
ALTER TABLE `percentages`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `projects_comparables`
--
ALTER TABLE `projects_comparables`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `projects_images`
--
ALTER TABLE `projects_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sharable`
--
ALTER TABLE `sharable`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_projects`
--
ALTER TABLE `users_projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
