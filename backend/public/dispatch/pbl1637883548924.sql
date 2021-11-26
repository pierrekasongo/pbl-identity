-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: pbl
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
REPLACE INTO `client` VALUES ('pierre','kasongo','tshiaba','M','1988-01-13','e2273c00243d5dc0ce98.jpg','Lubumbashi','1111',NULL,2,0,'Agent',1),('laure','mundja','lupaka','F','1991-07-03','a64a86934d9e13db8b71.png','Lubumbashi',NULL,NULL,NULL,1,'Epouse',2),('eric','kande','tshiaba','M','1990-04-12','','Kolwezi','2222',NULL,3,0,'Agent',3),('daren','dipanda','kasongo','M','2015-07-02','4330f2f79b26636e0271.jpg','Lubumbashi','2222',NULL,3,1,'Enfant',4),('OLIVIER','MWAMBA','KABONGO','M','1987-10-20','','FUNGURUME','2222',NULL,3,0,'Agent',5),('OLIVIER','MWAMBA','KABONGO','M','1988-10-01','','FUNGURUME','2222',NULL,3,0,'Agent',6),('olivier','mwamba','kabongo','M','1988-10-12','','fungurume','2222',NULL,3,0,'Agent',7),('olivier','mwamba','kabongo','M','1988-10-12','','fungurume','2222',NULL,3,0,'Agent',8),('olivier','mwamba','kabongo','M','1988-10-12','','fungurume','2222',NULL,3,0,'Agent',9),('olivier','mwamba','kabongo','M','1987-10-20',NULL,'fungurume','2222',NULL,3,0,'Agent',10),('olivier','mwamba','kabongo','M','1987-10-12',NULL,'fungurume','2222',NULL,3,0,'Agent',11);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `entreprise`
--

LOCK TABLES `entreprise` WRITE;
/*!40000 ALTER TABLE `entreprise` DISABLE KEYS */;
REPLACE INTO `entreprise` VALUES (1,'TFM'),(2,'KAMOA'),(3,'CREC7'),(4,'MUMI');
/*!40000 ALTER TABLE `entreprise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
REPLACE INTO `utilisateur` VALUES (1,'pkasongo','pierre','e04ca6d34d63452a67b1e0f96603481746f5700f62046dbad5298849c3a6ee157b6f9912e50ee6041d371ab8be22770af75075fb7304f95058a9b072ee9d5902','Encodeur',2,'Actif'),(2,'laure','laure','c5a29b41cb1d1242006cd5559bc2cf453d7e5c12533a9bdabe6cb3b77a1c480ee977225145029d8774db38190aa20b8d429106160cd9292e8a65df2f691e67ba','Admin',NULL,'Actif');
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `visite`
--

LOCK TABLES `visite` WRITE;
/*!40000 ALTER TABLE `visite` DISABLE KEYS */;
REPLACE INTO `visite` VALUES (1,'2021-09-10','Consultation générale',1,1),(2,'2021-10-01','Consultation ophtalmologue',1,1),(3,'2021-10-04','Consultation générale',1,2),(5,'2021-10-17','test',2,1),(6,'2021-10-17','testing',2,1),(7,'2021-10-17','Encore',2,1);
/*!40000 ALTER TABLE `visite` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-26  1:39:11
