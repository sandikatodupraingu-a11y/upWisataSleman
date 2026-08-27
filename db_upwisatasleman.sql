-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 30, 2024 at 11:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_upwisatasleman`
--

-- --------------------------------------------------------

--
-- Table structure for table `alternatif`
--

CREATE TABLE `alternatif` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `klasifikasi` enum('Rintisan','Berkembang','Maju','Mandiri') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alternatif`
--

INSERT INTO `alternatif` (`id`, `nama`, `klasifikasi`) VALUES
(1, 'Flory Plaosan', 'Berkembang'),
(2, 'Turgo-Merapi', 'Berkembang'),
(3, 'Mina Wisata Bokesan', 'Berkembang'),
(4, 'Bulak Sawah', 'Berkembang'),
(5, 'Pengklik', 'Berkembang'),
(6, 'Kerajinan Bambu Brajan', 'Berkembang'),
(7, 'Kebon Ndeso Wonorejo', 'Berkembang'),
(8, 'Tegal Loegood', 'Maju'),
(9, 'Sedjarah Kelor', 'Maju'),
(10, 'Bromonilan', 'Maju'),
(11, 'Karang Tanjung', 'Maju'),
(12, 'Lingkungan Sukunen', 'Maju'),
(13, 'Brayut', 'Mandiri'),
(14, 'Gabugan', 'Mandiri'),
(15, 'Plosokuning', 'Mandiri');

-- --------------------------------------------------------

--
-- Table structure for table `kriteria`
--

CREATE TABLE `kriteria` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `bobot` float NOT NULL,
  `tipe` enum('Benefit','Cost') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kriteria`
--

INSERT INTO `kriteria` (`id`, `nama`, `bobot`, `tipe`) VALUES
(1, 'Kelembagaan & SDM', 0.3, 'Benefit'),
(2, 'Amenitas', 0.25, 'Benefit'),
(3, 'Digital', 0.2, 'Benefit'),
(4, 'Daya Tarik', 0.15, 'Benefit'),
(5, 'Resiliensi', 0.1, 'Benefit');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id` int(11) NOT NULL,
  `id_alternatif` int(11) NOT NULL,
  `id_kriteria` int(11) NOT NULL,
  `value` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id`, `id_alternatif`, `id_kriteria`, `value`) VALUES
(1, 1, 1, 22),
(2, 1, 2, 6),
(3, 1, 3, 7),
(4, 1, 4, 30),
(5, 1, 5, 15),
(6, 2, 1, 21),
(7, 2, 2, 9),
(8, 2, 3, 4),
(9, 2, 4, 29),
(10, 2, 5, 7),
(11, 3, 1, 20),
(12, 3, 2, 5),
(13, 3, 3, 5),
(14, 3, 4, 25),
(15, 3, 5, 14),
(16, 4, 1, 20),
(17, 4, 2, 5),
(18, 4, 3, 6),
(19, 4, 4, 29),
(20, 4, 5, 13),
(21, 5, 1, 19),
(22, 5, 2, 5),
(23, 5, 3, 4),
(24, 5, 4, 26),
(25, 5, 5, 12),
(26, 6, 1, 18),
(27, 6, 2, 7),
(28, 6, 3, 4),
(29, 6, 4, 23),
(30, 6, 5, 11),
(31, 7, 1, 18),
(32, 7, 2, 7),
(33, 7, 3, 6),
(34, 7, 4, 31),
(35, 7, 5, 15),
(36, 8, 1, 27),
(37, 8, 2, 11),
(38, 8, 3, 7),
(39, 8, 4, 32),
(40, 8, 5, 15),
(41, 9, 1, 21),
(42, 9, 2, 8),
(43, 9, 3, 8),
(44, 9, 4, 31),
(45, 9, 5, 15),
(46, 10, 1, 23),
(47, 10, 2, 5),
(48, 10, 3, 8),
(49, 10, 4, 30),
(50, 10, 5, 14),
(51, 11, 1, 21),
(52, 11, 2, 10),
(53, 11, 3, 5),
(54, 11, 4, 29),
(55, 11, 5, 15),
(56, 12, 1, 24),
(57, 12, 2, 10),
(58, 12, 3, 6),
(59, 12, 4, 30),
(60, 12, 5, 11),
(61, 13, 1, 24),
(62, 13, 2, 12),
(63, 13, 3, 7),
(64, 13, 4, 32),
(65, 13, 5, 16),
(66, 14, 1, 23),
(67, 14, 2, 9),
(68, 14, 3, 9),
(69, 14, 4, 33),
(70, 14, 5, 17),
(71, 15, 1, 24),
(72, 15, 2, 12),
(73, 15, 3, 11),
(74, 15, 4, 33),
(75, 15, 5, 17);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(9, 'dwi', 'scrypt:32768:8:1$Fep1Azu0I1t2I9Dp$05041c79c382b5bb6d44069ce3abb7aad2374f1206ab7b8fb33c8491c81236def8b4912ad021a3c93fe6bde2409dfaad6914e187fa420300f0ff6f823f87be86'),
(10, 'andika', 'scrypt:32768:8:1$LyD04z79TjSVnoCH$66e0f4c0a438c7c2e20eb81c0410542622eae8a274f2fc3b37aa03f23dd3586c87d739d9f390b3affe980fd38dfdc3ebdf64fb31372947ae2fe82aada3217ef5'),
(11, 'el', 'scrypt:32768:8:1$NEAJUy8hYb5b6cfq$174f01d74502648707e85a1e10741d995ad347ba34e268192549be40c647178fd1000e67c95629d4e11c5e8b6d2148b4a8ba38a3088126d369a817d7ea15f730'),
(12, 'erika', 'scrypt:32768:8:1$qt4TfWfKEiYAqTfv$9e819371985adbf2a6a8e660538f0e47ffae908463a34543342407f34aa9dc2a72da293ce3ec9fe6882f679771ff6c5fda63597c3ffdb4acc0149507b29a1476'),
(13, 'putri', 'scrypt:32768:8:1$mThCZi4LvwMOv3JR$7c690d16ddf5fb3379aaa2587bc2846bcc447a05d462f82e2e103f5ce8e4c173ed9335908d820c9a825db31eac6c84b8ab4421b134d1928584ec3c33e7f40516'),
(14, 'amal', 'scrypt:32768:8:1$5FxAull96IPiw3It$1a645df08ab2adb576ab518e22194dd98b603b0722a41581ae2db1e9303eaf5bc49d4cbcdd527fd665da908825ce2800b132b123a19693d719b0a8cb6e9fff40'),
(15, 'Repi', 'scrypt:32768:8:1$e5euKpL2k8dImDE0$c582fee61b7b0dcadca2a3a8fc9e8c7b38e54dc48e5e85e7d41e06f265ce187d7ac07dd2386474f0595a03fa14455a3ec2e814d874230ad26fbc0b03b4a5cb56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alternatif`
--
ALTER TABLE `alternatif`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kriteria`
--
ALTER TABLE `kriteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_alternatif` (`id_alternatif`),
  ADD KEY `id_kriteria` (`id_kriteria`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alternatif`
--
ALTER TABLE `alternatif`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `kriteria`
--
ALTER TABLE `kriteria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=274;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_1` FOREIGN KEY (`id_alternatif`) REFERENCES `alternatif` (`id`),
  ADD CONSTRAINT `penilaian_ibfk_2` FOREIGN KEY (`id_kriteria`) REFERENCES `kriteria` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
