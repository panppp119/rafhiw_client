-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 12, 2019 at 02:26 AM
-- Server version: 5.7.25
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `new_rafhiw`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(12) UNSIGNED NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL,
  `address` varchar(100) NOT NULL,
  `province` varchar(50) NOT NULL,
  `district` varchar(50) NOT NULL,
  `sub_district` varchar(50) NOT NULL,
  `zip_code` varchar(5) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` int(11) UNSIGNED NOT NULL,
  `bank_name` varchar(50) NOT NULL,
  `bank_branch` varchar(50) NOT NULL,
  `account_name` varchar(50) NOT NULL,
  `account_no` varchar(10) NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cards`
--

CREATE TABLE `cards` (
  `id` int(12) UNSIGNED NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `number` varchar(20) NOT NULL,
  `expired_month` varchar(20) NOT NULL,
  `expired_year` varchar(20) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(12) UNSIGNED NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL DEFAULT '1',
  `total_qt` int(5) NOT NULL DEFAULT '1',
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(12) UNSIGNED NOT NULL,
  `cart_id` int(12) UNSIGNED NOT NULL,
  `product_id` int(12) UNSIGNED NOT NULL,
  `product_option_id` int(12) UNSIGNED NOT NULL,
  `quantity` int(5) NOT NULL DEFAULT '1',
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `active`, `created_at`, `updated_at`) VALUES
(1, 'อุปกรณ์ อิเล็กทรอนิกส์', 'electronic_devices', 1, '2019-04-10 09:45:27', '2019-04-10 02:45:27'),
(2, 'อุปกรณ์เสริม อิเล็กทรอนิกส์', 'electronic_accessories', 1, '2019-04-10 09:46:22', '2019-04-10 02:46:22'),
(3, 'ทีวีและเครื่องใช้ ไฟฟ้าในบ้าน', 'tv_and_home_appliances', 1, '2019-04-10 09:46:51', '2019-04-10 02:46:51'),
(4, 'สุขภาพและความงาม', 'health_and_beauty', 1, '2019-04-10 09:47:32', '2019-04-10 02:47:32'),
(5, 'เด็กอ่อน และของเล่น', 'baby_and_toys', 1, '2019-04-10 09:49:04', '2019-04-10 02:49:04'),
(6, 'ซูเปอร์มาร์เก็ต และสัตว์เลี้ยง', 'supermarket_and_pets', 1, '2019-04-10 09:49:42', '2019-04-10 02:49:42'),
(7, 'บ้านและไลฟ์สไตล์', 'home_and_lifestyle', 1, '2019-04-10 09:52:34', '2019-04-10 02:52:34'),
(8, 'แฟชั่นผู้หญิง', 'women_fashion', 1, '2019-04-10 09:53:03', '2019-04-10 02:53:03'),
(9, 'แฟชั่นผู้ชาย', 'men\'s_fashion', 1, '2019-04-10 09:53:18', '2019-04-10 02:53:18'),
(10, 'เครื่องประดับชาย', 'accessories', 1, '2019-04-10 09:54:07', '2019-04-10 02:54:07'),
(11, 'กีฬาและ การเดินทาง', 'sports_and_travel', 1, '2019-04-10 09:54:36', '2019-04-10 02:54:36'),
(12, 'ยานยนต์ และอุปกรณ์', 'automotive_and_equipment', 1, '2019-04-10 09:55:06', '2019-04-10 02:55:06');

-- --------------------------------------------------------

--
-- Table structure for table `disabilities`
--

CREATE TABLE `disabilities` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `disabilities`
--

INSERT INTO `disabilities` (`id`, `name`, `active`, `created_at`, `updated_at`) VALUES
(1, 'ปกติ', 1, '2019-04-10 11:23:20', '2019-04-14 20:24:08'),
(2, 'สายตา', 1, '2019-04-17 13:49:31', '2019-04-16 23:50:46'),
(3, 'ร่างกาย', 1, '2019-04-17 13:49:31', '2019-04-16 23:50:46'),
(4, 'หุูหนวก', 1, '2019-04-17 13:49:53', '2019-04-16 23:50:46'),
(5, 'สมอง', 1, '2019-04-17 13:50:57', '2019-04-16 23:51:11');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `start_date` varchar(50) NOT NULL,
  `end_date` varchar(50) NOT NULL,
  `image` text NOT NULL,
  `owner_id` int(12) UNSIGNED NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `event_location`
--

CREATE TABLE `event_location` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `lat` varchar(20) NOT NULL,
  `lng` varchar(20) NOT NULL,
  `event_id` int(12) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `highlight`
--

CREATE TABLE `highlight` (
  `id` int(12) UNSIGNED NOT NULL,
  `image` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` int(12) UNSIGNED NOT NULL,
  `number` varchar(14) NOT NULL,
  `order_id` int(12) UNSIGNED NOT NULL,
  `receipt` varchar(100) DEFAULT NULL,
  `paid` int(1) NOT NULL DEFAULT '0',
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_attachments`
--

CREATE TABLE `invoice_attachments` (
  `id` int(12) UNSIGNED NOT NULL,
  `order_id` int(12) UNSIGNED NOT NULL,
  `image` varchar(100) NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(12) UNSIGNED NOT NULL,
  `number` varchar(14) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending_payment',
  `user_id` int(12) UNSIGNED NOT NULL,
  `total_amt` int(7) NOT NULL,
  `promo_code` int(12) UNSIGNED DEFAULT NULL,
  `total_qt` int(5) NOT NULL,
  `payment_date` varchar(50) DEFAULT NULL,
  `expired_date` varchar(50) NOT NULL,
  `address_id` int(11) UNSIGNED DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(12) UNSIGNED NOT NULL,
  `order_id` int(12) UNSIGNED NOT NULL,
  `product_id` int(12) UNSIGNED NOT NULL,
  `product_option_id` int(12) UNSIGNED NOT NULL,
  `quantity` int(5) NOT NULL DEFAULT '1',
  `tracking_code` varchar(50) DEFAULT NULL,
  `shipment_type` int(11) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending_payment',
  `paid` tinyint(1) NOT NULL DEFAULT '0',
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `start_date` varchar(50) NOT NULL,
  `end_date` varchar(50) NOT NULL,
  `long_time` int(1) NOT NULL DEFAULT '0',
  `event_id` int(12) UNSIGNED NOT NULL,
  `owner_id` int(12) UNSIGNED NOT NULL,
  `category_id` int(12) UNSIGNED NOT NULL,
  `sub_category_id` int(12) UNSIGNED NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_attachments`
--

CREATE TABLE `product_attachments` (
  `id` int(12) UNSIGNED NOT NULL,
  `image` varchar(100) NOT NULL,
  `product_id` int(12) UNSIGNED NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product_items`
--

CREATE TABLE `product_items` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `stock` int(5) NOT NULL,
  `price_amt` int(7) NOT NULL,
  `discount_amt` int(7) DEFAULT NULL,
  `hiw_amt` int(7) NOT NULL,
  `ship_amt` int(7) NOT NULL,
  `product_id` int(12) UNSIGNED NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes`
--

CREATE TABLE `promo_codes` (
  `id` int(12) UNSIGNED NOT NULL,
  `code` varchar(6) NOT NULL,
  `percent` int(3) NOT NULL DEFAULT '0',
  `amount` int(6) NOT NULL DEFAULT '0',
  `min_amt` int(6) NOT NULL DEFAULT '0',
  `max_amt` int(6) NOT NULL DEFAULT '0',
  `quantity` int(5) NOT NULL DEFAULT '10',
  `start_date` varchar(50) NOT NULL,
  `end_date` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(12) UNSIGNED NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL,
  `product_option_id` int(12) UNSIGNED NOT NULL,
  `seller_id` int(12) UNSIGNED NOT NULL,
  `comment` text,
  `rating` int(1) NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `active`, `created_at`, `updated_at`) VALUES
(1, 'user', 1, '2019-04-17 13:51:56', '2019-04-16 23:51:56'),
(2, 'admin', 1, '2019-04-17 13:51:56', '2019-04-16 23:51:56'),
(3, 'seller', 1, '2019-04-17 13:52:22', '2019-04-16 23:52:22');

-- --------------------------------------------------------

--
-- Table structure for table `seller_requested`
--

CREATE TABLE `seller_requested` (
  `id` int(12) UNSIGNED NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `title` int(1) NOT NULL DEFAULT '1',
  `id_card` varchar(50) NOT NULL,
  `id_address` varchar(100) NOT NULL,
  `now_address` varchar(100) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `approve` int(1) NOT NULL DEFAULT '0',
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `shippers`
--

CREATE TABLE `shippers` (
  `id` int(12) UNSIGNED NOT NULL,
  `order_id` int(12) UNSIGNED NOT NULL,
  `ship_method` int(12) UNSIGNED NOT NULL,
  `tracking_code` varchar(20) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ship_method`
--

CREATE TABLE `ship_method` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `name`, `slug`, `active`, `created_at`, `updated_at`) VALUES
(1, 'รอการชำระเงิน', 'pending_payment', 1, '2019-07-30 09:49:36.288', '2019-08-26 05:21:25'),
(2, 'อยู่ระหว่างตรวจเช็คการชำระเงิน', 'pending_check_payment', 1, '2019-07-30 11:05:52.181', '2019-08-26 05:21:25'),
(3, 'รอการจัดส่ง', 'pending_shipping', 1, '2019-07-30 09:49:36.288', '2019-08-26 05:23:34'),
(4, 'รอยืนยันการรับของ', 'pending_receive_goods', 1, '2019-07-30 11:05:52.181', '2019-08-26 05:23:34'),
(5, 'รอการรีวิว', 'pending_review', 1, '2019-07-30 09:49:36.288', '2019-08-26 05:25:30'),
(6, 'สำเร็จ', 'completed', 1, '2019-07-30 11:05:52.181', '2019-08-26 05:25:30'),
(7, 'ยกเลิก/หมดอายุ', 'cancelled', 1, '2019-07-30 09:49:36.288', '2019-08-26 05:27:38');

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(12) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `category_id` int(12) UNSIGNED NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `name`, `slug`, `category_id`, `active`, `created_at`, `updated_at`) VALUES
(1, 'โทรศัพท์มือถือ', 'mobile_phone', 1, 1, '2019-04-10 10:21:13', '2019-04-09 20:21:13'),
(2, 'แท็บเล็ต', 'tablet', 1, 1, '2019-04-10 10:22:43', '2019-04-09 20:22:43'),
(3, 'แล็ปท็อป', 'laptop', 1, 1, '2019-04-10 10:23:39', '2019-04-09 20:23:39'),
(4, 'คอมพิวเตอร์ตั้งโต๊ะ', 'desktop_computer', 1, 1, '2019-04-10 10:27:46', '2019-04-09 20:27:46'),
(5, 'เกมและเครื่องเล่น', 'games_and_players', 1, 1, '2019-04-10 10:29:21', '2019-04-09 20:29:21'),
(6, 'กล้องติดรถยนต์', 'car_camera', 1, 1, '2019-04-10 10:29:57', '2019-04-09 20:29:57'),
(7, 'กล้องแอ็คชั่นแคม', 'action_camera', 1, 1, '2019-04-10 10:30:25', '2019-04-09 20:30:25'),
(8, 'กล้องรักษาความปลอดภัย', 'security_camera', 1, 1, '2019-04-10 10:31:04', '2019-04-09 20:31:04'),
(9, 'กล้องดิจิตอล', 'digital_camera', 1, 1, '2019-04-10 10:31:30', '2019-04-09 20:31:30'),
(10, 'แก็ดเจ็ต', 'gadgets', 1, 1, '2019-04-10 10:32:07', '2019-04-09 20:32:07'),
(11, 'อุปกรณ์เสริมมือถือ', 'mobile_accessories', 2, 1, '2019-04-10 10:34:56', '2019-04-09 20:34:56'),
(12, 'ลำโพงแบบพกพา', 'portable_speaker', 2, 1, '2019-04-10 10:42:11', '2019-04-09 20:42:11'),
(13, 'อุปกรณ์ไอทีสวมใส่', 'wearable_it_equipment', 2, 1, '2019-04-10 10:42:37', '2019-04-09 20:42:37'),
(14, 'อุปกรณ์สำหรับเกม', 'equipment_for_games', 2, 1, '2019-04-10 10:43:13', '2019-04-09 20:43:13'),
(15, 'อุปกรณ์เสริมกล้อง', 'camera_accessories', 2, 1, '2019-04-10 10:43:40', '2019-04-09 20:43:40'),
(16, 'อุปกรณ์เสริมคอมพิวเตอร์', 'computer_accessories', 2, 1, '2019-04-10 10:44:01', '2019-04-09 20:44:01'),
(17, 'อุปกรณ์จัดเก็บข้อมูล', 'storage_device', 2, 1, '2019-04-10 10:45:13', '2019-04-09 20:45:13'),
(18, 'เครื่องพิมพ์', 'printer', 2, 1, '2019-04-10 10:46:04', '2019-04-09 20:46:04'),
(19, 'ฮาร์ดแวร์คอมพิวเตอร์', 'computer_hardware', 2, 1, '2019-04-10 11:10:13', '2019-04-09 21:10:13'),
(20, 'อุุปกรณ์เสริมแท็บเล็ต', 'tablet_accessories', 2, 1, '2019-04-10 11:18:48', '2019-04-09 21:18:48'),
(21, 'ทีวี และ อุปกรณ์วีดีโอ', 'tv_and_video_equipment', 3, 1, '2019-04-10 11:35:05', '2019-04-09 21:35:05'),
(22, 'อุปกรณ์เสริมทีวี', 'tv_accessories', 3, 1, '2019-04-10 11:53:56', '2019-04-09 21:53:56'),
(23, 'เครื่องเสียงภายในบ้าน', 'home_audio', 3, 1, '2019-04-10 11:54:23', '2019-04-09 21:54:23'),
(24, 'เครื่องใช้ไฟฟ้าขนาดใหญ่', 'large_electrical_appliances', 3, 1, '2019-04-10 11:54:49', '2019-04-09 21:54:49'),
(25, 'เครื่องใช้ไฟฟ้าขนาดเล็ก', 'small_electrical_appliances', 3, 1, '2019-04-10 11:55:22', '2019-04-09 21:55:22'),
(26, 'เครื่องทำความเย็น&ฟอกอากาศ', 'refrigeration_&_air_purification', 3, 1, '2019-04-10 11:55:57', '2019-04-09 21:55:57'),
(27, 'เครื่องดูดฝุ่น&ดูแลพื้น', 'vacuum_&_floor_care', 3, 1, '2019-04-10 11:56:39', '2019-04-09 21:56:39'),
(28, 'เตารีดและจักรเย็บผ้า', 'irons_and_sewing_machines', 3, 1, '2019-04-10 11:57:22', '2019-04-09 21:57:22'),
(29, 'เครื่องใช้ไฟฟ้าส่วนบุคคล', 'personal_electrical_appliances', 3, 1, '2019-04-10 11:57:56', '2019-04-09 21:57:56'),
(30, 'อะไหล่และอุปกรณ์เสริม', 'parts_and_accessories', 3, 1, '2019-04-10 11:58:48', '2019-04-09 21:58:48'),
(31, 'รถยนต์ และอุปกรณ์', 'car_and_equipment', 12, 1, '2019-04-10 12:06:47', '2019-04-09 22:10:12'),
(32, 'เครื่องสำอาง', 'cosmetics', 4, 1, '2019-04-10 12:17:02', '2019-04-09 22:17:02'),
(33, 'ผลิตภัณฑ์ดูแลผิวหน้า', 'facial_care_products', 4, 1, '2019-04-10 12:17:17', '2019-04-09 22:17:17'),
(34, 'อุปกรณ์เพื่อความงาม', 'beauty_equipment', 4, 1, '2019-04-10 12:17:31', '2019-04-09 22:17:31'),
(35, 'ผลิตภัณฑ์ดูแลผม', 'hair_care_products', 4, 1, '2019-04-10 12:17:45', '2019-04-09 22:17:45'),
(36, 'ผลิตภัณฑ์อาบน้ำและดูแลผิว', 'bath_and_skin_care_products', 4, 1, '2019-04-10 12:23:03', '2019-04-09 22:23:03'),
(37, 'น้ำหอม', 'perfume', 4, 1, '2019-04-10 12:23:19', '2019-04-09 22:23:19'),
(38, 'ของใช้ส่วนตัว', 'personal_belongings', 4, 1, '2019-04-10 12:24:05', '2019-04-09 22:24:05'),
(39, 'อาหารเสริม', 'supplementary_food', 4, 1, '2019-04-10 12:24:20', '2019-04-09 22:24:20'),
(40, 'อุปกรณ์เพื่อสุขภาพ', 'health_equipment', 4, 1, '2019-04-10 12:24:32', '2019-04-09 22:24:32'),
(41, 'ผลิตภัณฑ์สำหรับผู้ชาย', 'men\'s_products', 4, 1, '2019-04-10 12:24:44', '2019-04-09 22:24:44'),
(42, 'รถเข็นเด็กและอุปกรณ์', 'stroller_and_accessories', 5, 1, '2019-04-10 12:31:42', '2019-04-09 22:31:42'),
(43, 'นม อาหาร และอุปกรณ์', 'milk,_food_and_equipment', 5, 1, '2019-04-10 12:31:56', '2019-04-09 22:31:56'),
(44, 'เสื้อผ้าและเครื่องประดับ', 'clothes_and_jewelry', 5, 1, '2019-04-10 12:32:22', '2019-04-09 22:32:22'),
(45, 'ที่นอนและเฟอร์นิเจอร์เด็ก', 'mattresses_and_children\'s_furniture', 5, 1, '2019-04-10 12:32:34', '2019-04-09 22:32:34'),
(46, 'ผ้าอ้อมและโถนั่งเด็ก', 'diapers_and_baby_sitting', 5, 1, '2019-04-10 12:32:49', '2019-04-09 22:32:49'),
(49, 'กีฬาและการละเล่นกลางแจ้ง', 'sports_and_outdoor_play', 5, 1, '2019-04-10 12:39:57', '2019-04-09 22:39:57'),
(50, 'ของเล่นวิทยุบังคับ', 'forced_radio_toys', 5, 1, '2019-04-10 12:40:12', '2019-04-09 22:40:12'),
(51, 'ของเล่นเด็กเล็ก', 'baby_toys', 5, 1, '2019-04-10 12:40:24', '2019-04-09 22:40:24'),
(52, 'ของเล่นเพื่อการสะสม', 'collecting_toys', 5, 1, '2019-04-10 12:40:37', '2019-04-09 22:40:37'),
(53, 'วัตถุดิบทำอาหารและขนม', 'food_ingredients_and_snacks', 6, 1, '2019-04-10 12:43:37', '2019-04-09 22:43:37'),
(54, 'เครื่องดื่ม', 'beverage', 6, 1, '2019-04-10 12:43:51', '2019-04-09 22:43:51'),
(55, 'อาหารเช้า', 'breakfast', 6, 1, '2019-04-10 12:44:03', '2019-04-09 22:44:03'),
(56, 'อุปกรณ์ซักรีดและดูแลบ้าน', 'laundry_and_home_care', 6, 1, '2019-04-10 12:44:17', '2019-04-09 22:44:17'),
(57, 'ขนม ช็อกโกแลตและลูกอม', 'snack_chocolate_and_candy', 6, 1, '2019-04-10 12:44:47', '2019-04-09 22:44:47'),
(58, 'สุนัข', 'dog', 6, 1, '2019-04-10 12:45:03', '2019-04-09 22:45:03'),
(59, 'แมว', 'cat', 6, 1, '2019-04-10 12:45:13', '2019-04-09 22:45:13'),
(60, 'สัตว์น้ำ', 'aquatic_animal', 6, 1, '2019-04-10 12:45:23', '2019-04-09 22:45:23'),
(61, 'สัตว์เล็กและอื่นๆ', 'small_animals_and_others', 6, 1, '2019-04-10 12:45:34', '2019-04-09 22:45:34'),
(62, 'สินค้าพร้อมบริการติดตั้ง', 'products_with_installation_services', 12, 1, '2019-04-10 12:51:36', '2019-04-09 22:51:36'),
(63, 'ล้อและยางรถยนต์', 'wheels_and_tires', 12, 1, '2019-04-10 12:53:08', '2019-04-09 22:53:08'),
(64, 'น้ํามันเครื่องและของเหลว', 'machine_oil_and_liquid', 12, 1, '2019-04-10 12:53:33', '2019-04-09 22:53:33'),
(65, 'ชุดคาร์แคร์', 'car_care_set', 12, 1, '2019-04-10 12:53:58', '2019-04-09 22:53:58'),
(66, 'อุปกรณ์เสริมรถยนต์', 'car_accessories', 12, 1, '2019-04-10 12:54:23', '2019-04-09 22:54:23'),
(67, 'อุปกรณ์เสริมไฟฟ้าในรถยนต์', 'electric_car_accessories', 12, 1, '2019-04-10 12:54:44', '2019-04-09 22:54:44'),
(68, 'มอเตอร์ไซค์และอุปกรณ์', 'motorcycles_and_accessories', 12, 1, '2019-04-10 12:55:05', '2019-04-09 22:55:05'),
(69, 'ชุดแต่ง / อะไหล่มอเตอร์ไซค์', 'motorcycle_parts_/_parts', 12, 1, '2019-04-10 12:55:33', '2019-04-09 22:55:33'),
(70, 'ชุดขับขี่และหมวกกันน็อค', 'driving_suits_and_helmets', 12, 1, '2019-04-10 12:56:12', '2019-04-09 22:56:12'),
(71, 'เครื่องครัว', 'kitchen_equipment', 7, 1, '2019-04-10 12:56:42', '2019-04-09 22:56:42'),
(72, 'เฟอร์นิเจอร์', 'furniture', 7, 1, '2019-04-10 12:56:57', '2019-04-09 22:56:57'),
(73, 'ของแต่งบ้าน และโคมไฟ', 'home_decoration_and_lamps', 7, 1, '2019-04-10 12:57:18', '2019-04-09 22:57:18'),
(74, 'ห้องนอน', 'bedroom', 7, 1, '2019-04-10 12:59:45', '2019-04-09 22:59:45'),
(75, 'ห้องน้ำ', 'toilet', 7, 1, '2019-04-10 13:00:01', '2019-04-09 23:00:01'),
(76, 'ทำความสะอาดและซักรีด', 'cleaning_and_laundry', 7, 1, '2019-04-10 13:00:11', '2019-04-09 23:00:11'),
(77, 'ปรับปรุงบ้านและตกแต่งสวน', 'home_improvement_and_garden_decoration', 7, 1, '2019-04-10 13:00:24', '2019-04-09 23:00:24'),
(78, 'เครื่องเขียนและงานฝีมือ', 'stationery_and_crafts', 7, 1, '2019-04-10 13:00:37', '2019-04-09 23:00:37'),
(79, 'การเดินทาง', 'travel', 11, 1, '2019-04-10 13:00:39', '2019-04-09 23:00:39'),
(80, 'เครื่องดนตรี', 'musical_instrument', 7, 1, '2019-04-10 13:00:55', '2019-04-09 23:00:55'),
(81, 'ฟิตเนส และการออกกําลังกาย', 'fitness_and_exercise', 11, 1, '2019-04-10 13:01:06', '2019-04-09 23:01:06'),
(82, 'กีฬา และกิจกรรมกลางแจ้ง', 'sports_and_outdoor_activities', 11, 1, '2019-04-10 13:01:27', '2019-04-09 23:01:27'),
(83, 'หนังสือ', 'book', 7, 1, '2019-04-10 13:01:45', '2019-04-09 23:01:45'),
(84, 'เสื้อผ้ากีฬาผู้ชาย', 'men\'s_sports_clothing', 11, 1, '2019-04-10 13:01:50', '2019-04-09 23:01:50'),
(85, 'เสื้อผ้ากีฬาผู้หญิง', 'women\'s_sports_clothing', 11, 1, '2019-04-10 13:02:14', '2019-04-09 23:02:14'),
(86, 'กีฬาทางน้ํา', 'water_sports', 11, 1, '2019-04-10 13:02:34', '2019-04-09 23:02:34'),
(87, 'กีฬาประเภททีม', 'team_sports', 11, 1, '2019-04-10 13:02:58', '2019-04-09 23:02:58'),
(88, 'กีฬาที่ใช้ไม้แร็กเกต', 'racket-based_sport', 11, 1, '2019-04-10 13:03:22', '2019-04-09 23:03:22'),
(89, 'อุปกรณ์เสริมสําหรับกีฬา', 'sports_accessories', 11, 1, '2019-04-10 13:03:44', '2019-04-09 23:03:44'),
(90, 'กีฬาต่อยมวย', 'boxing', 11, 1, '2019-04-10 13:04:01', '2019-04-09 23:04:01'),
(91, 'แว่นตา', 'glasses', 10, 1, '2019-04-10 13:05:36', '2019-04-09 23:05:36'),
(92, 'เครื่องประดับ', 'accessories', 10, 1, '2019-04-10 13:05:59', '2019-04-09 23:05:59'),
(93, 'นาฬิกา', 'watch', 10, 1, '2019-04-10 13:06:13', '2019-04-09 23:06:13'),
(94, 'เสื้อผ้าสุภาพบุรุษ', 'gentleman_clothes', 9, 1, '2019-04-10 13:09:54', '2019-04-09 23:09:54'),
(95, 'รองเท้าสุภาพบุรุษ', 'gentleman_shoes', 9, 1, '2019-04-10 13:10:09', '2019-04-09 23:10:09'),
(96, 'กระเป๋าสุภาพบุรุษ', 'men\'s_bags', 9, 1, '2019-04-10 13:10:26', '2019-04-09 23:10:26'),
(97, 'แฟชั่นเด็กผู้ชาย', 'fashion_boy', 9, 1, '2019-04-10 13:10:41', '2019-04-09 23:10:41'),
(98, 'เสื้อผ้าสุภาพสตรี', 'ladies_clothes', 8, 1, '2019-04-10 13:12:25', '2019-04-09 23:12:25'),
(99, 'รองเท้าสุภาพสตรี', 'ladies_shoes', 8, 1, '2019-04-10 13:12:42', '2019-04-09 23:12:42'),
(100, 'กระเป๋าสุภาพสตรี', 'ladies_bag', 8, 1, '2019-04-10 13:12:59', '2019-04-09 23:12:59'),
(101, 'ชุดชั้นในและเสื้อนอน', 'underwear_and_sleepwear', 8, 1, '2019-04-10 13:13:14', '2019-04-09 23:13:14'),
(102, 'แฟชั่นเด็กผู้หญิง', 'fashion_girl', 8, 1, '2019-04-10 13:13:29', '2019-04-09 23:13:29');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(12) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `birthday` varchar(50) DEFAULT NULL,
  `phone_number` varchar(10) DEFAULT NULL,
  `gender` int(1) DEFAULT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_attachments`
--

CREATE TABLE `user_attachments` (
  `id` int(12) UNSIGNED NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL,
  `image` text NOT NULL,
  `type` varchar(20) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_disability`
--

CREATE TABLE `user_disability` (
  `id` int(12) UNSIGNED NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL,
  `disability_id` int(12) UNSIGNED NOT NULL DEFAULT '1',
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(12) UNSIGNED NOT NULL,
  `user_id` int(12) UNSIGNED NOT NULL,
  `role_id` int(12) UNSIGNED NOT NULL DEFAULT '1',
  `active` int(1) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_sessions`
--

CREATE TABLE `user_sessions` (
  `id` int(12) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `uid` text,
  `access_token` text NOT NULL,
  `provider` varchar(20) NOT NULL DEFAULT 'email',
  `count` int(5) NOT NULL DEFAULT '1',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_subscriptions`
--

CREATE TABLE `user_subscriptions` (
  `id` int(12) UNSIGNED NOT NULL,
  `email` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '0',
  `created_at` varchar(50) NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`) USING BTREE;

--
-- Indexes for table `cards`
--
ALTER TABLE `cards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `product_option_id` (`product_option_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `disabilities`
--
ALTER TABLE `disabilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `event_location`
--
ALTER TABLE `event_location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `highlight`
--
ALTER TABLE `highlight`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `invoice_attachments`
--
ALTER TABLE `invoice_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoice_id` (`order_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `promo_code` (`promo_code`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_option_id` (`product_option_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `enent_id` (`event_id`),
  ADD KEY `owner_id` (`owner_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `sub_category_id` (`sub_category_id`);

--
-- Indexes for table `product_attachments`
--
ALTER TABLE `product_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_items`
--
ALTER TABLE `product_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_option_id`),
  ADD KEY `seller_id` (`seller_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `seller_requested`
--
ALTER TABLE `seller_requested`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`) USING BTREE;

--
-- Indexes for table `shippers`
--
ALTER TABLE `shippers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `ship_method` (`ship_method`);

--
-- Indexes for table `ship_method`
--
ALTER TABLE `ship_method`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `slug` (`slug`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_attachments`
--
ALTER TABLE `user_attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_disability`
--
ALTER TABLE `user_disability`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `disability_id` (`disability_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- Indexes for table `user_subscriptions`
--
ALTER TABLE `user_subscriptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cards`
--
ALTER TABLE `cards`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `disabilities`
--
ALTER TABLE `disabilities`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event_location`
--
ALTER TABLE `event_location`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `highlight`
--
ALTER TABLE `highlight`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_attachments`
--
ALTER TABLE `invoice_attachments`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_attachments`
--
ALTER TABLE `product_attachments`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_items`
--
ALTER TABLE `product_items`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `seller_requested`
--
ALTER TABLE `seller_requested`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shippers`
--
ALTER TABLE `shippers`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ship_method`
--
ALTER TABLE `ship_method`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_attachments`
--
ALTER TABLE `user_attachments`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_disability`
--
ALTER TABLE `user_disability`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_subscriptions`
--
ALTER TABLE `user_subscriptions`
  MODIFY `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banks`
--
ALTER TABLE `banks`
  ADD CONSTRAINT `banks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cards`
--
ALTER TABLE `cards`
  ADD CONSTRAINT `cards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_option_id`) REFERENCES `product_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `event_location`
--
ALTER TABLE `event_location`
  ADD CONSTRAINT `event_location_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice_attachments`
--
ALTER TABLE `invoice_attachments`
  ADD CONSTRAINT `invoice_attachments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_option_id`) REFERENCES `product_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_3` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_attachments`
--
ALTER TABLE `product_attachments`
  ADD CONSTRAINT `product_attachments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_items`
--
ALTER TABLE `product_items`
  ADD CONSTRAINT `product_items_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `seller_requested`
--
ALTER TABLE `seller_requested`
  ADD CONSTRAINT `seller_requested_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_disability`
--
ALTER TABLE `user_disability`
  ADD CONSTRAINT `user_disability_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_disability_ibfk_2` FOREIGN KEY (`disability_id`) REFERENCES `disabilities` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_subscriptions`
--
ALTER TABLE `user_subscriptions`
  ADD CONSTRAINT `user_subscriptions_ibfk_1` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
