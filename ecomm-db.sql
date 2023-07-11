-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2023 at 12:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecomm`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `productId` varchar(30) NOT NULL,
  `productCategory` varchar(30) NOT NULL,
  `productPrice` int(11) NOT NULL,
  `sId` varchar(50) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `cId` varchar(30) NOT NULL,
  `cartId` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderitem`
--

CREATE TABLE `orderitem` (
  `productName` varchar(30) NOT NULL,
  `productCategory` varchar(30) NOT NULL,
  `productPrice` int(11) NOT NULL,
  `productId` varchar(30) NOT NULL,
  `sId` varchar(30) NOT NULL,
  `cId` varchar(30) NOT NULL,
  `orderId` varchar(30) NOT NULL,
  `orderDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitem`
--

INSERT INTO `orderitem` (`productName`, `productCategory`, `productPrice`, `productId`, `sId`, `cId`, `orderId`, `orderDate`) VALUES
('laptop', 'electronics', 67000, '3b5c90e5-987b-4234-8e3f-5a80dd', 'ankits31689050442282', 'ankit31688901815734', '093fd544-e9d9-46d6-93a7-419dc8', '2023-07-11 14:57:40'),
('laptop', 'electronics', 67000, '3b5c90e5-987b-4234-8e3f-5a80dd', 'ankits31689050442282', 'ankit31688901815734', '2441d0fa-948d-4850-88b7-2fe7d9', '2023-07-11 14:55:20'),
('laptop', 'electronics', 67000, '3b5c90e5-987b-4234-8e3f-5a80dd', 'ankits31689050442282', 'ankit31688901815734', '3edee99b-0cbf-4099-a05c-bab7f4', '2023-07-11 15:00:04'),
('laptop', 'electronics', 67000, '3b5c90e5-987b-4234-8e3f-5a80dd', 'ankits31689050442282', 'ankit31688901815734', '3f36b91e-a370-4041-807c-c973b3', '2023-07-11 15:00:59'),
('laptop', 'electronics', 67000, '3b5c90e5-987b-4234-8e3f-5a80dd', 'ankits31689050442282', 'ankit31688901815734', '4901f798-680a-40fa-bbc2-ccee7e', '2023-07-11 13:59:15'),
('laptop', 'electronics', 67000, '3b5c90e5-987b-4234-8e3f-5a80dd', 'ankits31689050442282', 'ankit31688901815734', 'd1fcabb6-3849-4b9a-aa70-55729f', '2023-07-11 13:56:23');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderId` varchar(30) NOT NULL,
  `sId` varchar(30) NOT NULL,
  `cId` varchar(30) NOT NULL,
  `productId` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderId`, `sId`, `cId`, `productId`) VALUES
('3f36b91e-a370-4041-807c-c973b3', 'ankits31689050442282', 'ankit31688901815734', '3b5c90e5-987b-4234-8e3f-5a80dd');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productId` varchar(30) NOT NULL,
  `productCategory` varchar(30) NOT NULL,
  `productPrice` int(11) NOT NULL,
  `sId` varchar(50) DEFAULT NULL,
  `productName` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productId`, `productCategory`, `productPrice`, `sId`, `productName`) VALUES
('1e5d50d6-6cc8-4f39-b31e-3484ed', 'electronics', 67000, 'ankit31688901815734', 'laptop'),
('3b5c90e5-987b-4234-8e3f-5a80dd', 'electronics', 67000, 'ankits31689050442282', 'laptop'),
('83eca2f0-69a3-496f-8335-1880a2', 'electronics', 67000, 'ankit31688901815734', 'laptop'),
('96ebacba-cd5c-471e-8832-7ab4fe', 'electronics', 67000, 'ankit31688901815734', 'laptop'),
('abf93e8a-9578-4f66-8c77-bd9052', 'electronics', 67000, 'ankit21688901810346', 'laptop'),
('d61a7916-c1dc-4857-95e0-08b18d', 'electronics', 20000, 'ankit21688901810346', 'mobile');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uId` varchar(30) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `lname` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(64) NOT NULL,
  `type` varchar(20) NOT NULL,
  `createdAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uId`, `fname`, `lname`, `email`, `password`, `type`, `createdAt`) VALUES
('ankit11688901805164', 'ankit', 'kumar', 'ankit1@gmail.com', '$2a$10$qHVksHxZ.zEpbqdYizx8VuKUJ3D.uO95jzQiPWTRADh7vXbNmGtr2', 'buyer', '2023-07-09 16:53:25'),
('ankit21688901810346', 'ankit', 'kumar', 'ankit2@gmail.com', '$2a$10$7Sl.go11EqM0rzIehTHeqOAK9.QY2U0ywepvU/pzDWRGvQSI0Vh9W', 'buyer', '2023-07-09 16:53:30'),
('ankit31688901815734', 'ankit', 'kumar', 'ankit3@gmail.com', '$2a$10$jKLpSVrLGEP60AlKIV84COFP.fELlz1Pfu/RPwJ2rN.lEzchuhIIW', 'buyer', '2023-07-09 16:53:35'),
('ankit41688910232809', 'ankit', 'kumar', 'ankit4@gmail.com', '$2a$10$ao3/6ltEBRtlZzY0b7Vt7uGj6Xp3mI70QbN2T24FPpnfrAIyH649u', 'buyer', '2023-07-09 19:13:53'),
('ankits31689050442282', 'ankit', 'kumar', 'ankits3@gmail.com', '$2a$10$THiSf30pnOunDIY7dSfPR.9vzKgizv119f2ngJE6gQ3xzN72NfbMS', 'seller', '2023-07-11 10:10:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cartId`);

--
-- Indexes for table `orderitem`
--
ALTER TABLE `orderitem`
  ADD PRIMARY KEY (`orderId`),
  ADD UNIQUE KEY `orderId` (`orderId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `uId` (`sId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uId`),
  ADD UNIQUE KEY `uId` (`uId`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`sId`) REFERENCES `user` (`uId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
