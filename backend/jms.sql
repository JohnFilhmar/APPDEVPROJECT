-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 13, 2023 at 12:21 AM
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
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `message_id` int UNSIGNED NOT NULL,
  `sender_id` int UNSIGNED NOT NULL,
  `receiver_id` int UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `datetime_sent` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `checkout`
--

CREATE TABLE `checkout` (
  `receiptnumber` int UNSIGNED NOT NULL,
  `customer` int UNSIGNED NOT NULL,
  `items` json NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `datetime_added` datetime DEFAULT CURRENT_TIMESTAMP,
  `datetime_processed` datetime DEFAULT NULL,
  `is_processed` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `financial_transactions`
--

CREATE TABLE `financial_transactions` (
  `transaction_id` int UNSIGNED NOT NULL,
  `user_id` int UNSIGNED DEFAULT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `transaction_type` enum('income','expense','refund') NOT NULL,
  `datetime_added` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(2, '2023-11-12-151714', 'App\\Database\\Migrations\\Users', 'default', 'App', 1699802425, 2),
(9, '2023-11-27-225309', 'App\\Database\\Migrations\\Checkout', 'default', 'App', 1701169017, 6),
(10, '2023-11-25-021037', 'App\\Database\\Migrations\\ChatBox', 'default', 'App', 1701169482, 7);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int UNSIGNED NOT NULL,
  `itemname` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
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

INSERT INTO `products` (`id`, `itemname`, `image`, `category`, `compatibility`, `marketprice`, `boughtprice`, `sellingprice`, `initialquantity`, `currentquantity`, `branch`, `lastdateupdated`, `supplier`) VALUES
(11, 'Clutch Kit', 'ampel.jpg', 'Clutch', 'Honda CV110', '50.00', '30.00', '60.00', 50, 13, 'Canubing I', '2021-01-15', 'AM Merchandise'),
(12, 'Brake Pads', 'ampel.jpg', 'Brakes', 'Raider150', '25.00', '15.00', '35.00', 40, 0, 'Canubing I.2', '2022-03-22', 'Edward Merchandise'),
(13, 'Oil Filter', 'ampel.jpg', 'Engine', 'Barako', '10.00', '5.00', '15.00', 30, 14, 'Bayanan II', '2021-06-10', 'Kristal Merchandise'),
(14, 'Chain Set', 'ampel.jpg', 'Drive', 'Sniper', '40.00', '25.00', '50.00', 25, 0, 'Malinao', '2023-01-05', 'Soriano Merchandise'),
(15, 'Spark Plug', 'ampel.jpg', 'Electrical', 'Raider150', '5.00', '2.50', '8.00', 60, 27, 'Canubing I', '2022-12-18', 'AM Merchandise'),
(16, 'Air Filter', 'ampel.jpg', 'Air Intake', 'Honda CV110', '15.00', '8.00', '20.00', 35, 6, 'Canubing I.2', '2022-02-07', 'Edward Merchandise'),
(17, 'Tire Tube', 'ampel.jpg', 'Tires', 'Barako', '20.00', '12.00', '30.00', 50, 34, 'Bayanan II', '2021-09-14', 'Kristal Merchandise'),
(18, 'Battery', 'pogi.jpg', 'Electrical', 'Sniper', '30.00', '18.00', '40.00', 20, 14, 'Malinao', '2023-03-30', 'Soriano Merchandise'),
(19, 'Brake Disk', 'pogi.jpg', 'Brakes', 'Honda CV110', '35.00', '20.00', '45.00', 45, 27, 'Canubing I', '2022-11-03', 'AM Merchandise'),
(20, 'Handle Grip', 'pogi.jpg', 'Handlebars', 'Raider150', '8.00', '4.50', '12.00', 55, 44, 'Canubing I.2', '2021-04-25', 'Edward Merchandise'),
(21, 'Brake Pad', 'pogi.jpg', 'Brakes', 'Yamaha MT-09', '20.00', '12.00', '25.00', 30, 23, 'Canubing I.2', '2023-06-10', 'AM Merchandise'),
(22, 'Air Filter', 'pogi.jpg', 'Air Filters', 'Kawasaki Ninja 650', '10.00', '5.00', '15.00', 40, 36, 'Bayanan II', '2022-11-28', 'Edward Merchandise'),
(23, 'Handlebar Grips', 'pogi.jpg', 'Handlebars', 'Suzuki GSX-R750', '7.00', '3.50', '10.00', 50, 48, 'Canubing I', '2021-09-15', 'Kristal Merchandise'),
(24, 'Spark Plug', 'pogi.jpg', 'Ignition', 'Ducati Panigale V4', '5.00', '2.00', '8.00', 60, 58, 'Malinao', '2023-04-22', 'Soriano Merchandise'),
(25, 'Brake Fluid', 'pogi.jpg', 'Brakes', 'Honda CBR1000RR', '15.00', '8.00', '20.00', 35, 32, 'Bayanan II', '2022-02-03', 'AM Merchandise'),
(26, 'Clutch Cable', 'pogi.jpg', 'Clutch', 'KTM Duke 390', '8.00', '4.00', '12.00', 25, 22, 'Canubing I.2', '2021-07-19', 'Edward Merchandise'),
(27, 'Turn Signal Lights', 'pogi.jpg', 'Lights', 'Triumph Street Triple', '12.00', '6.00', '15.00', 20, 18, 'Canubing I', '2023-02-15', 'Kristal Merchandise'),
(28, 'Chain Kit', 'pogi.jpg', 'Drive', 'Harley-Davidson Iron 883', '30.00', '20.00', '35.00', 45, 42, 'Malinao', '2022-05-12', 'Soriano Merchandise'),
(29, 'Battery', 'pogi.jpg', 'Electrical', 'Yamaha YZF-R1', '25.00', '15.00', '30.00', 30, 28, 'Canubing I', '2021-10-08', 'AM Merchandise'),
(30, 'Wheel Bearings', 'pogi.jpg', 'Wheels', 'BMW S1000RR', '10.00', '5.00', '15.00', 40, 38, 'Bayanan II', '2022-12-18', 'Edward Merchandise'),
(31, 'Brake Disc', 'pogi.jpg', 'Brakes', 'Kawasaki ZX-10R', '25.00', '18.00', '30.00', 35, 33, 'Canubing I.2', '2023-04-05', 'AM Merchandise'),
(32, 'Exhaust System', 'pogi.jpg', 'Exhaust', 'Ducati Diavel 1260', '150.00', '120.00', '180.00', 10, 8, 'Bayanan II', '2022-10-15', 'Edward Merchandise'),
(33, 'Fork Seals', 'pogi.jpg', 'Suspension', 'Suzuki Hayabusa', '15.00', '9.00', '18.00', 30, 28, 'Canubing I', '2021-08-21', 'Kristal Merchandise'),
(34, 'Rear View Mirrors', 'pogi.jpg', 'Mirrors', 'Triumph Tiger 800', '10.00', '5.00', '15.00', 40, 38, 'Malinao', '2023-02-28', 'Soriano Merchandise'),
(35, 'Fuel Pump', 'pogi.jpg', 'Fuel System', 'Yamaha VMAX', '30.00', '22.00', '35.00', 25, 23, 'Bayanan II', '2022-01-10', 'AM Merchandise'),
(36, 'Clutch Lever', 'pogi.jpg', 'Clutch', 'KTM RC 390', '8.00', '4.50', '12.00', 35, 33, 'Canubing I.2', '2021-06-22', 'Edward Merchandise'),
(37, 'Speedometer Cable', 'pogi.jpg', 'Electrical', 'Harley-Davidson Street Glide', '12.00', '6.00', '15.00', 20, 18, 'Canubing I', '2023-03-14', 'Kristal Merchandise'),
(38, 'Seat Cover', 'pogi.jpg', 'Seats', 'Honda Goldwing', '40.00', '30.00', '50.00', 15, 12, 'Malinao', '2022-04-01', 'Soriano Merchandise'),
(39, 'Headlight Bulbs', 'pogi.jpg', 'Lights', 'BMW R1250GS', '5.00', '2.50', '8.00', 60, 58, 'Canubing I', '2021-11-12', 'AM Merchandise'),
(40, 'Brake Caliper', 'pogi.jpg', 'Brakes', 'Kawasaki Vulcan S', '30.00', '20.00', '35.00', 45, 42, 'Bayanan II', '2022-07-26', 'Edward Merchandise'),
(62, 'fasdasdf', 'WIN_20220218_07_54_24_Pro.jpg', 'afsdfasd', 'adsdfsa', '99999.00', '23132.00', '321.00', 321, 321, '32132', '2023-11-19', '132132'),
(63, 'TRY', '393156695_1428338707713134_3132963233536261848_n.jpg', 'TRY', 'TRY', '86.86', '424.20', '12.44', 12, 12, 'TRY', '2023-11-28', 'TRY'),
(64, 'asdf', '393156695_1428338707713134_3132963233536261848_n.jpg', '321', 'asdf', '231.00', '321.00', '321.00', 321, 321, '321', '2023-11-28', '321'),
(65, 'asdfasdf', 'WIN_20231128_15_30_20_Pro.jpg', '321', 'asdf', '321.00', '123.00', '213.00', 321, 321, '231', '2023-11-29', '123'),
(66, 'asdf', 'WIN_20231128_15_30_20_Pro.jpg', '312', '123', '3213.00', '321.00', '321.00', 321, 321, '321', '2023-11-29', '321'),
(67, 'cvvcvc', 'WIN_20230421_21_09_32_Pro.jpg', 'cvvc', 'cvvcvc', '66.00', '66.00', '66.00', 66, 66, 'bnbnvvb', '2023-12-12', '66'),
(68, 'aAAAAAA', 'WIN_20231117_16_14_08_Pro.jpg', 'AAAAAAA', 'AAAAAAAA', '51.23', '55.23', '51.55', 44, 44, 'ASDFASFD', '2023-12-13', 'AAAAA');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int UNSIGNED NOT NULL,
  `userName` varchar(255) NOT NULL,
  `userPassword` varchar(255) NOT NULL,
  `userImage` varchar(255) DEFAULT NULL,
  `userAddress` varchar(255) DEFAULT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `userRole` varchar(50) NOT NULL,
  `datetime_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime DEFAULT NULL,
  `state` tinyint(1) NOT NULL,
  `last_activity` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `userName`, `userPassword`, `userImage`, `userAddress`, `userEmail`, `userRole`, `datetime_added`, `date_updated`, `state`, `last_activity`) VALUES
(21, 'user2', '$2y$10$6i/sxHGZt3nKyXlCxO/JK.SR8jNORcRcC0UPC2TCILu0L9gzGieaq', 'WIN_20231024_16_59_26_Pro.jpg', 'Canubing 1', 'olajohnfilhmar@gmail.com', 'ADMIN', '2023-12-12 19:54:46', NULL, 1, '2023-12-13 02:39:43'),
(25, 'ADMINISTRATOR', '$2y$10$shy2MhS/FZqH7vY8TxUV5OrptHwnSLpeA.iBibLo1lKffQWZZue9e', NULL, NULL, NULL, 'ADMIN', '2023-12-12 22:21:30', NULL, 1, '2023-12-13 07:50:23'),
(28, 'asdf', '$2y$10$2Mv20hy//rrC5RA9O7VtYeeRR9250/tth3e3r74Eu8Y6jdNGer9oC', NULL, NULL, NULL, 'USER', '2023-12-13 07:43:46', NULL, 0, NULL),
(29, 'ADMINISTRATOR4', '$2y$10$b3KSyCCKRGjizTmnDSU82eJgrxIv6jreirD4t.WXein.VoW2u9zlm', NULL, NULL, NULL, 'USER', '2023-12-13 07:48:27', NULL, 0, NULL),
(30, 'adsfasdfa', '$2y$10$DhvA6o5nk0ZyWsMV9901puwdBIbnfSslZSWJuYCoMGuM2MHHHG/qu', NULL, NULL, NULL, 'USER', '2023-12-13 07:50:14', NULL, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `chat_messages_sender_id_foreign` (`sender_id`),
  ADD KEY `chat_messages_receiver_id_foreign` (`receiver_id`);

--
-- Indexes for table `checkout`
--
ALTER TABLE `checkout`
  ADD PRIMARY KEY (`receiptnumber`),
  ADD KEY `checkout_customer_foreign` (`customer`);

--
-- Indexes for table `financial_transactions`
--
ALTER TABLE `financial_transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `user_id` (`user_id`);

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
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `message_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `checkout`
--
ALTER TABLE `checkout`
  MODIFY `receiptnumber` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `financial_transactions`
--
ALTER TABLE `financial_transactions`
  MODIFY `transaction_id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chat_messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `checkout`
--
ALTER TABLE `checkout`
  ADD CONSTRAINT `checkout_customer_foreign` FOREIGN KEY (`customer`) REFERENCES `users` (`userId`);

--
-- Constraints for table `financial_transactions`
--
ALTER TABLE `financial_transactions`
  ADD CONSTRAINT `financial_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
