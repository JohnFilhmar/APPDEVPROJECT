-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 19, 2023 at 11:26 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jms`
--

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` bigint UNSIGNED NOT NULL,
  `version` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `group` varchar(255) NOT NULL,
  `namespace` varchar(255) NOT NULL,
  `time` int NOT NULL,
  `batch` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `version`, `class`, `group`, `namespace`, `time`, `batch`) VALUES
(1, '2023-11-12-123311', 'App\\Database\\Migrations\\Products', 'default', 'App', 1699792633, 1),
(2, '2023-11-12-151714', 'App\\Database\\Migrations\\Users', 'default', 'App', 1699802425, 2);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int UNSIGNED NOT NULL,
  `itemname` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `partnumber` varchar(50) NOT NULL,
  `compatibility` varchar(255) NOT NULL,
  `marketprice` decimal(10,2) NOT NULL,
  `boughtprice` decimal(10,2) NOT NULL,
  `sellingprice` decimal(10,2) NOT NULL,
  `initialquantity` int NOT NULL,
  `currentquantity` int NOT NULL,
  `branch` varchar(255) NOT NULL,
  `lastdateupdated` date NOT NULL,
  `supplier` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `itemname`, `image`, `category`, `partnumber`, `compatibility`, `marketprice`, `boughtprice`, `sellingprice`, `initialquantity`, `currentquantity`, `branch`, `lastdateupdated`, `supplier`) VALUES
(11, 'Clutch Kit', 'ampel.jpg', 'Clutch', '5244', 'Honda CV110', '50.00', '30.00', '60.00', 50, 35, 'Canubing I', '2021-01-15', 'AM Merchandise'),
(12, 'Brake Pads', 'ampel.jpg', 'Brakes', '6544', 'Raider150', '25.00', '15.00', '35.00', 40, 28, 'Canubing I.2', '2022-03-22', 'Edward Merchandise'),
(13, 'Oil Filter', 'ampel.jpg', 'Engine', '6987', 'Barako', '10.00', '5.00', '15.00', 30, 22, 'Bayanan II', '2021-06-10', 'Kristal Merchandise'),
(14, 'Chain Set', 'ampel.jpg', 'Drive', '5305', 'Sniper', '40.00', '25.00', '50.00', 25, 18, 'Malinao', '2023-01-05', 'Soriano Merchandise'),
(15, 'Spark Plug', 'ampel.jpg', 'Electrical', '5565', 'Raider150', '5.00', '2.50', '8.00', 60, 45, 'Canubing I', '2022-12-18', 'AM Merchandise'),
(16, 'Air Filter', 'ampel.jpg', 'Air Intake', '1911', 'Honda CV110', '15.00', '8.00', '20.00', 35, 30, 'Canubing I.2', '2022-02-07', 'Edward Merchandise'),
(17, 'Tire Tube', 'ampel.jpg', 'Tires', '2861', 'Barako', '20.00', '12.00', '30.00', 50, 40, 'Bayanan II', '2021-09-14', 'Kristal Merchandise'),
(18, 'Battery', 'pogi.jpg', 'Electrical', '8571', 'Sniper', '30.00', '18.00', '40.00', 20, 15, 'Malinao', '2023-03-30', 'Soriano Merchandise'),
(19, 'Brake Disk', 'pogi.jpg', 'Brakes', '4275', 'Honda CV110', '35.00', '20.00', '45.00', 45, 38, 'Canubing I', '2022-11-03', 'AM Merchandise'),
(20, 'Handle Grip', 'pogi.jpg', 'Handlebars', '5660', 'Raider150', '8.00', '4.50', '12.00', 55, 48, 'Canubing I.2', '2021-04-25', 'Edward Merchandise'),
(21, 'Brake Pad', 'pogi.jpg', 'Brakes', '0923', 'Yamaha MT-09', '20.00', '12.00', '25.00', 30, 28, 'Canubing I.2', '2023-06-10', 'AM Merchandise'),
(22, 'Air Filter', 'pogi.jpg', 'Air Filters', '0679', 'Kawasaki Ninja 650', '10.00', '5.00', '15.00', 40, 38, 'Bayanan II', '2022-11-28', 'Edward Merchandise'),
(23, 'Handlebar Grips', 'pogi.jpg', 'Handlebars', '0625', 'Suzuki GSX-R750', '7.00', '3.50', '10.00', 50, 48, 'Canubing I', '2021-09-15', 'Kristal Merchandise'),
(24, 'Spark Plug', 'pogi.jpg', 'Ignition', '1091', 'Ducati Panigale V4', '5.00', '2.00', '8.00', 60, 58, 'Malinao', '2023-04-22', 'Soriano Merchandise'),
(25, 'Brake Fluid', 'pogi.jpg', 'Brakes', '3578', 'Honda CBR1000RR', '15.00', '8.00', '20.00', 35, 32, 'Bayanan II', '2022-02-03', 'AM Merchandise'),
(26, 'Clutch Cable', 'pogi.jpg', 'Clutch', '4618', 'KTM Duke 390', '8.00', '4.00', '12.00', 25, 22, 'Canubing I.2', '2021-07-19', 'Edward Merchandise'),
(27, 'Turn Signal Lights', 'pogi.jpg', 'Lights', '2359', 'Triumph Street Triple', '12.00', '6.00', '15.00', 20, 18, 'Canubing I', '2023-02-15', 'Kristal Merchandise'),
(28, 'Chain Kit', 'pogi.jpg', 'Drive', '7939', 'Harley-Davidson Iron 883', '30.00', '20.00', '35.00', 45, 42, 'Malinao', '2022-05-12', 'Soriano Merchandise'),
(29, 'Battery', 'pogi.jpg', 'Electrical', '2618', 'Yamaha YZF-R1', '25.00', '15.00', '30.00', 30, 28, 'Canubing I', '2021-10-08', 'AM Merchandise'),
(30, 'Wheel Bearings', 'pogi.jpg', 'Wheels', '9275', 'BMW S1000RR', '10.00', '5.00', '15.00', 40, 38, 'Bayanan II', '2022-12-18', 'Edward Merchandise'),
(31, 'Brake Disc', 'pogi.jpg', 'Brakes', '0238', 'Kawasaki ZX-10R', '25.00', '18.00', '30.00', 35, 33, 'Canubing I.2', '2023-04-05', 'AM Merchandise'),
(32, 'Exhaust System', 'pogi.jpg', 'Exhaust', '5267', 'Ducati Diavel 1260', '150.00', '120.00', '180.00', 10, 8, 'Bayanan II', '2022-10-15', 'Edward Merchandise'),
(33, 'Fork Seals', 'pogi.jpg', 'Suspension', '5624', 'Suzuki Hayabusa', '15.00', '9.00', '18.00', 30, 28, 'Canubing I', '2021-08-21', 'Kristal Merchandise'),
(34, 'Rear View Mirrors', 'pogi.jpg', 'Mirrors', '2317', 'Triumph Tiger 800', '10.00', '5.00', '15.00', 40, 38, 'Malinao', '2023-02-28', 'Soriano Merchandise'),
(35, 'Fuel Pump', 'pogi.jpg', 'Fuel System', '4716', 'Yamaha VMAX', '30.00', '22.00', '35.00', 25, 23, 'Bayanan II', '2022-01-10', 'AM Merchandise'),
(36, 'Clutch Lever', 'pogi.jpg', 'Clutch', '6629', 'KTM RC 390', '8.00', '4.50', '12.00', 35, 33, 'Canubing I.2', '2021-06-22', 'Edward Merchandise'),
(37, 'Speedometer Cable', 'pogi.jpg', 'Electrical', '8999', 'Harley-Davidson Street Glide', '12.00', '6.00', '15.00', 20, 18, 'Canubing I', '2023-03-14', 'Kristal Merchandise'),
(38, 'Seat Cover', 'pogi.jpg', 'Seats', '5107', 'Honda Goldwing', '40.00', '30.00', '50.00', 15, 12, 'Malinao', '2022-04-01', 'Soriano Merchandise'),
(39, 'Headlight Bulbs', 'pogi.jpg', 'Lights', '8538', 'BMW R1250GS', '5.00', '2.50', '8.00', 60, 58, 'Canubing I', '2021-11-12', 'AM Merchandise'),
(40, 'Brake Caliper', 'pogi.jpg', 'Brakes', '7372', 'Kawasaki Vulcan S', '30.00', '20.00', '35.00', 45, 42, 'Bayanan II', '2022-07-26', 'Edward Merchandise'),
(62, 'fasdasdf', 'WIN_20220218_07_54_24_Pro.jpg', 'afsdfasd', '32132', 'adsdfsa', '99999.00', '23132.00', '321.00', 321, 321, '32132', '2023-11-19', '132132');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int UNSIGNED NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userRole` varchar(50) NOT NULL,
  `userAccess` varchar(255) NOT NULL,
  `datecreated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userPassword`, `userRole`, `userAccess`, `datecreated`) VALUES
(1, 'ADMIN', '$2y$10$8fVeBYOUpwZ5FME/4BzITe7c38jM6aO33KtrVOu9biISs0Tgdm.9y', 'Manager', 'FULL', '2023-11-15'),
(7, 'filhmarola', '$2y$10$2g6ENjQSj.4ha98JXMtlp.rSwZGOObzllDkcadUYaKJ4RAnM8Ht8e', 'Employee', 'LIMITED', '2023-11-18'),
(8, 'dfasfads', '$2y$10$KAGrTP18Zancl7585VYmXuRTWt6.8K6F14xJ7AJIV33JX5ly0rKB2', 'Manager', 'FULL', '2023-11-18'),
(9, 'albeur', '$2y$10$.BlEyMEeDcqEGjor4LPWb.Ap1SI12MtKIbRzoqclmfcva0mA1xTYK', 'Manager', 'LIMITED', '2023-11-18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
