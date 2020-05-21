-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: main
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `USER_ID` int NOT NULL,
  `POST_ID` int NOT NULL,
  PRIMARY KEY (`USER_ID`,`POST_ID`),
  KEY `LINK_POST_ID_idx` (`POST_ID`) /*!80000 INVISIBLE */,
  CONSTRAINT `LINK_POST_ID` FOREIGN KEY (`POST_ID`) REFERENCES `posts` (`POST_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `LINK_USER_ID` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (1,1),(1,4),(1,10),(1,17),(2,10),(2,18),(3,7),(3,9),(3,10),(3,15),(3,19),(4,9),(4,15),(5,13),(6,1),(6,2),(6,15),(6,17),(6,18),(6,19),(7,5),(9,1),(9,2),(9,12),(10,5),(10,8),(10,16),(10,20);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `POST_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int DEFAULT NULL,
  `POST_TEXT` varchar(2056) DEFAULT NULL,
  `POST_DATE` datetime DEFAULT NULL,
  `POST_HASHTAGS` varchar(2056) DEFAULT NULL,
  PRIMARY KEY (`POST_ID`),
  UNIQUE KEY `POST_ID_UNIQUE` (`POST_ID`),
  KEY `POST_CREATOR_idx` (`USER_ID`),
  CONSTRAINT `POST_AUTHOR` FOREIGN KEY (`USER_ID`) REFERENCES `users` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,8,'Post #1','2020-03-17 23:00:00','hash-1-1 hash-1-2'),(2,1,'Post #2','2020-02-24 19:58:16','hash-2-1 hash-2-2 hash-2-3'),(3,4,'Post #3','2018-03-01 05:40:50','hash-3-1'),(4,6,'Post #4','2020-02-18 16:08:17','hash-4-1 hash-4-2 hash-4-3 hash-4-4'),(5,2,'Post #5','2020-01-25 17:15:04','hash-5-1 hash-5-2'),(6,9,'Post #6','2018-12-01 08:53:35',NULL),(7,10,'Post #7','2020-10-27 16:10:18','hash-7-1'),(8,2,'Post #8','2018-04-20 08:53:35','hash-8-1 hash-8-2 hash-8-3'),(9,4,'Post #9','2019-04-11 16:42:42','hash-9-1 hash-9-2 hash-9-3'),(10,4,'Post #10 (First Post With hello)','2020-05-14 08:53:35','hash-10-1 hash-10-2'),(11,8,'Post #11','2019-11-11 09:40:36',NULL),(12,7,'Post #12','2015-05-18 15:10:20','hash-12-1'),(13,3,'Post #13','2020-08-24 14:01:51',NULL),(14,2,'Post #14 (Second Post With hello)','2019-10-28 23:05:40','hash-14-1 hash-14-2 hash-14-3'),(15,6,'Post #15','2020-11-01 20:15:14','hash-15-1 hash-15-2'),(16,9,'Post #16','2019-01-01 04:43:42','hash-16-1'),(17,1,'Post #17','2019-03-01 06:18:54','hash-17-1'),(18,10,'Post #18','2020-02-27 16:00:14','hash-18-1 hash-18-2 hash-18-3'),(19,5,'Post #19','2018-06-02 18:59:32','hash-19-1 hash-19-2 hash-19-3 hash-19-4'),(20,6,'Post #20','2018-11-14 22:05:23','hash-20-1');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(256) DEFAULT 'Anonym',
  `USER_PHOTO` varchar(256) DEFAULT 'none',
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USER_ID_UNIQUE` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'User #1','https://human-online.s3.eu-west-2.amazonaws.com/banner-portrait-v1-4.png'),(2,'User #2','https://cdn.britannica.com/s:800x450,c:crop/00/193400-138-6C287BFA/What-is-it-to-be-human.jpg'),(3,'User #3','https://www.coe.int/documents/365513/10877703/statement-covid19-2020-870x489.jpg/4e71c0ff-c295-8ae5-1467-6ce3ad01a68f'),(4,'User #4','https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/08/Hair_Female_Studio_Smile-1296x728-header-1296x728.jpg?w=1155&h=1528'),(5,'User #5','https://specials-images.forbesimg.com/imageserve/5d49f8bd37f1f90008ec7e1a/960x0.jpg?fit=scale'),(6,'User #6','https://pm1.narvii.com/6906/0e83318fa64c21a8d405a8f5277319cc2c19b1c8r1-640-640v2_00.jpg'),(7,'User #7','https://img.huffingtonpost.com/asset/5da3ed552000006905500760.jpeg?ops=scalefit_630_noupscale'),(8,'User #8','https://swilliamsjd.files.wordpress.com/2015/09/human-11.jpg'),(9,'User #9','https://www.bureaucollective.ch/img/projects/32/elements/82/Bureau-Collective-Diversity-of-the-Human-Face-04.jpg'),(10,'User #10','https://www.bureaucollective.ch/img/projects/32/elements/92/Bureau-Collective-Diversity-of-the-Human-Face-Thumbnail-2.jpg');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-20  1:07:11
