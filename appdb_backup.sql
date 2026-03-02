-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: localhost    Database: appdb
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Bhopal','India','Ff 16 Rai Pink City Phase 1 ','Kolar Road Bhopal','462042','Madhya Pradesh');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` bigint NOT NULL AUTO_INCREMENT,
  `appointment_date` date DEFAULT NULL,
  `payment_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slot` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `vehicle_id` int DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  UNIQUE KEY `UK_povan4yi9tv7v01uk6of6wlnl` (`address_id`),
  UNIQUE KEY `UK_6qaed3we6g07rqbrmr5qiaatd` (`vehicle_id`),
  KEY `FKtba9o6e2mftwnuyw5w7hxywjx` (`service_id`),
  KEY `FKa8m1smlfsc8kkjn2t6wpdmysk` (`user_id`),
  CONSTRAINT `FKa8m1smlfsc8kkjn2t6wpdmysk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKg1wxs73dly8d8avhpuha1bod4` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `FKqx6mcwqh2njoj5b7tl29g15qg` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`vehicle_id`),
  CONSTRAINT `FKtba9o6e2mftwnuyw5w7hxywjx` FOREIGN KEY (`service_id`) REFERENCES `vehicle_maintenance` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,'2026-03-01','payOnline','10 - 11AM','Scheduled',1,19,12,67);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback_id` bigint NOT NULL AUTO_INCREMENT,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int NOT NULL,
  `service_service_id` bigint DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `FKc0ax8b4eys85qagnil4aqymyl` (`service_service_id`),
  KEY `FK7k33yw505d347mw3avr93akao` (`user_id`),
  CONSTRAINT `FK7k33yw505d347mw3avr93akao` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKc0ax8b4eys85qagnil4aqymyl` FOREIGN KEY (`service_service_id`) REFERENCES `vehicle_maintenance` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `razorpay_payment`
--

DROP TABLE IF EXISTS `razorpay_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `razorpay_payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `currency` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `signature` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `appointment_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_d237lgm28p20xeh0t3waln7uj` (`appointment_id`),
  CONSTRAINT `FK3ob531s1hyl7p8p1ncy0avxmc` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `razorpay_payment`
--

LOCK TABLES `razorpay_payment` WRITE;
/*!40000 ALTER TABLE `razorpay_payment` DISABLE KEYS */;
INSERT INTO `razorpay_payment` VALUES (1,1200,'2026-02-28 21:39:50.594551','INR','order_SLiX0rYiHvuTfh',NULL,NULL,'Paid','2026-02-28 21:39:50.594551',1);
/*!40000 ALTER TABLE `razorpay_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `approved` bit(1) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,_binary '','demoadmin@gmail.com','9876543210','$2a$10$PXZjmgslRjCoF1rzQMMSlekxfqujs17I11Bkv87.Jel8.kw8.IhuG','ADMIN','admin123'),(2,_binary '\0','demouser@gmail.com','1122334455','$2a$10$PXZjmgslRjCoF1rzQMMSlekxfqujs17I11Bkv87.Jel8.kw8.IhuG','USER','user123'),(3,_binary '','Abhishekupadhyay1933@gmail.com','9617694243','$2a$10$PXZjmgslRjCoF1rzQMMSlekxfqujs17I11Bkv87.Jel8.kw8.IhuG','ADMIN','Abhishek'),(5,_binary '','user1@fixmyride.com','9876543211','$2a$10$PXZjmgslRjCoF1rzQMMSlekxfqujs17I11Bkv87.Jel8.kw8.IhuG','USER','John Doe'),(6,_binary '','user2@fixmyride.com','9876543212','$2a$10$PXZjmgslRjCoF1rzQMMSlekxfqujs17I11Bkv87.Jel8.kw8.IhuG','USER','Jane Smith'),(10,_binary '','superadmin@fixmyride.com','9876543001','$2a$10$PXZjmgslRjCoF1rzQMMSlekxfqujs17I11Bkv87.Jel8.kw8.IhuG','SUPER_ADMIN','superadmin'),(11,_binary '','admin@fixmyride.com','9876543002','$2a$10$$2a$10$PXZjmgslRjCoF1rzQMMSlekxfqujs17I11Bkv87.Jel8.kw8.IhuG','ADMIN','admin'),(12,_binary '','testuser@fixmyride.com','9876543003','$2a$10$PXZjmgslRjCoF1rzQMMSlekxfqujs17I11Bkv87.Jel8.kw8.IhuG','USER','testuser');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle` (
  `vehicle_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fuel_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vehicle_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle`
--

LOCK TABLES `vehicle` WRITE;
/*!40000 ALTER TABLE `vehicle` DISABLE KEYS */;
INSERT INTO `vehicle` VALUES (1,'Maruti','Petrol','Swift','Car'),(2,'Hyundai','Diesel','i20','Car'),(3,'Honda','Petrol','Activa','Bike'),(4,'Tata','Electric','Nexon','Car'),(5,'Royal Enfield','Petrol','Bullet 350','Bike'),(6,'Toyota','Diesel','Innova','Car'),(7,'Maruti Suzuki','Petrol','Swift','Car'),(8,'Maruti Suzuki','Petrol','Baleno','Car'),(9,'Maruti Suzuki','CNG','Wagon R','Car'),(10,'Maruti Suzuki','Petrol','Dzire','Car'),(11,'Maruti Suzuki','Petrol','Brezza','Car'),(12,'Hyundai','Petrol','Creta','Car'),(13,'Hyundai','Diesel','Venue','Car'),(14,'Hyundai','Petrol','i20','Car'),(15,'Hyundai','Petrol','Verna','Car'),(16,'Tata','Electric','Nexon','Car'),(17,'Tata','Petrol','Punch','Car'),(18,'Tata','Diesel','Harrier','Car'),(19,'Tata','Petrol','Tiago','Car'),(20,'Mahindra','Diesel','Scorpio-N','Car'),(21,'Mahindra','Petrol','Thar','Car'),(22,'Mahindra','Diesel','XUV700','Car'),(23,'Toyota','Diesel','Innova Crysta','Car'),(24,'Toyota','Hybrid','Innova Hycross','Car'),(25,'Toyota','Diesel','Fortuner','Car'),(26,'Honda','Petrol','City','Car'),(27,'Honda','Petrol','Elevate','Car'),(28,'Kia','Petrol','Seltos','Car'),(29,'Kia','Diesel','Carens','Car'),(30,'Skoda','Petrol','Kushaq','Car'),(31,'Volkswagen','Petrol','Taigun','Car'),(32,'Renault','Petrol','Kwid','Car'),(33,'Nissan','Petrol','Magnite','Car'),(34,'MG','Electric','ZS EV','Car'),(35,'BMW','Petrol','3 Series','Car'),(36,'Audi','Petrol','Q5','Car'),(37,'Mercedes-Benz','Petrol','C-Class','Car'),(38,'BYD','Electric','Atto 3','Car'),(39,'Royal Enfield','Petrol','Classic 350','Bike'),(40,'Royal Enfield','Petrol','Bullet 350','Bike'),(41,'Royal Enfield','Petrol','Hunter 350','Bike'),(42,'Royal Enfield','Petrol','Meteor 350','Bike'),(43,'Honda','Petrol','Activa 6G','Bike'),(44,'Honda','Petrol','Shine','Bike'),(45,'Honda','Petrol','Hornet 2.0','Bike'),(46,'Bajaj','Petrol','Pulsar 150','Bike'),(47,'Bajaj','Petrol','Pulsar NS200','Bike'),(48,'Bajaj','Petrol','Dominar 400','Bike'),(49,'Hero','Petrol','Splendor Plus','Bike'),(50,'Hero','Petrol','HF Deluxe','Bike'),(51,'Hero','Petrol','Xpulse 200','Bike'),(52,'TVS','Petrol','Apache RTR 200','Bike'),(53,'TVS','Petrol','NTorq 125','Bike'),(54,'TVS','Petrol','Jupiter','Bike'),(55,'Yamaha','Petrol','R15 V4','Bike'),(56,'Yamaha','Petrol','MT-15','Bike'),(57,'Yamaha','Petrol','FZ-S V3','Bike'),(58,'KTM','Petrol','Duke 390','Bike'),(59,'KTM','Petrol','Duke 200','Bike'),(60,'KTM','Petrol','RC 390','Bike'),(61,'Suzuki','Petrol','Gixxer 155','Bike'),(62,'Ather','Electric','450X','Bike'),(63,'Ola Electric','Electric','S1 Pro','Bike'),(64,'Triumph','Petrol','Speed 400','Bike'),(65,'Jawa','Petrol','Classic','Bike'),(66,'Vespa','Petrol','SXL 125','Bike'),(67,'Husqvarna','Petrol','Svartpilen 250','Bike');
/*!40000 ALTER TABLE `vehicle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_maintenance`
--

DROP TABLE IF EXISTS `vehicle_maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicle_maintenance` (
  `service_id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `long_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service_price` int NOT NULL,
  `short_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type_of_vehicle` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_maintenance`
--

LOCK TABLES `vehicle_maintenance` WRITE;
/*!40000 ALTER TABLE `vehicle_maintenance` DISABLE KEYS */;
INSERT INTO `vehicle_maintenance` VALUES (1,'Car Premium Service','45 mins','Includes high-pressure exterior wash, foam cleaning, tire cleaning, and microfiber drying. Suitable for regular maintenance and light dirt removal.','Basic Car Wash',250,'Exterior foam wash and dry.','ACTIVE','Car'),(2,'Car Services','2 hours','Complete car servicing including oil change, filter replacement and full vehicle checkup.','Basic Car Service',999,'Standard car service package','ACTIVE','Car'),(3,'Car Services','4 hours','Full car service with engine tuning, fluid top-up and brake inspection.','Full Car Service',2999,'Comprehensive car service','ACTIVE','Car'),(4,'Car AC Service','2 hours','Complete AC system check, cleaning of filters and gas recharge for optimal cooling.','AC Gas Recharge',1500,'AC gas refill and check','ACTIVE','Car'),(5,'Car AC Service','1 hour','Deep cleaning of AC vents, filters and evaporator for fresh cool air.','AC Deep Clean',800,'AC cleaning service','ACTIVE','Car'),(6,'Car Tyre','1 hour','Complete wheel alignment and balancing for better driving control and tyre life.','Wheel Alignment',600,'Wheel alignment and balancing','ACTIVE','Car'),(7,'Car Tyre','30 mins','Quick puncture repair with quality sealant and pressure check.','Tyre Puncture Repair',200,'Tyre puncture fix','ACTIVE','Car'),(8,'Car Premium Service','6 hours','Premium full service with engine flush, injector cleaning and all fluid replacements.','Premium Full Service',5999,'Top tier car service','ACTIVE','Car'),(9,'Car Premium Service','4 hours','Advanced engine diagnostics and tuning for peak performance.','Engine Tune Up',3500,'Engine performance tuning','ACTIVE','Car'),(10,'Car Painting','2 days','Full body paint job with premium quality paint and finishing.','Full Body Paint',25000,'Complete car painting','ACTIVE','Car'),(11,'Car Painting','1 day','Scratch and dent removal with color matched touch up painting.','Scratch Removal',3000,'Scratch and dent fix','ACTIVE','Car'),(12,'Car Detailing','3 hours','Complete interior and exterior detailing with wax polish and ceramic coat.','Full Car Detailing',4000,'Interior and exterior detailing','ACTIVE','Car'),(13,'Car Detailing','1 hour','Deep interior cleaning including seats, dashboard and carpet shampooing.','Interior Cleaning',1500,'Deep interior clean','ACTIVE','Car'),(14,'Bike Services','1 hour','Complete bike service with oil change, chain lubrication and brake check.','Basic Bike Service',499,'Standard bike service','ACTIVE','Bike'),(15,'Bike Services','2 hours','Full bike service with engine tuning, carburetor cleaning and all fluid check.','Full Bike Service',1299,'Comprehensive bike service','ACTIVE','Bike'),(16,'Bike Engine Service','3 hours','Complete engine overhaul with piston ring replacement and valve adjustment.','Engine Overhaul',3500,'Full engine rebuild','ACTIVE','Bike'),(17,'Bike Engine Service','1 hour','Carburetor cleaning and tuning for better fuel efficiency and performance.','Carburetor Cleaning',800,'Carb clean and tune','ACTIVE','Bike'),(18,'Bike Tyre','30 mins','Quick tyre puncture repair with quality sealant.','Bike Tyre Puncture',150,'Tyre puncture fix','ACTIVE','Bike'),(19,'Bike Tyre','45 mins','Tyre replacement with balancing and pressure check.','Tyre Replacement',1200,'New tyre fitting','ACTIVE','Bike'),(20,'Bike Premium Service','4 hours','Premium bike service with engine flush, fork oil change and full inspection.','Premium Bike Service',2999,'Top tier bike service','ACTIVE','Bike'),(21,'Bike Painting','1 day','Full bike body paint job with premium quality paint and finishing.','Full Bike Paint',8000,'Complete bike painting','ACTIVE','Bike'),(22,'Bike Painting','4 hours','Scratch removal and touch up painting with color matching.','Bike Scratch Removal',1500,'Scratch and dent fix','ACTIVE','Bike'),(23,'Bike Detailing','2 hours','Complete bike detailing with polish, wax and chrome cleaning.','Full Bike Detailing',1500,'Complete bike detailing','ACTIVE','Bike'),(24,'Bike Detailing','1 hour','Deep cleaning of bike body, engine bay and chrome parts.','Bike Deep Clean',800,'Deep bike cleaning','ACTIVE','Bike');
/*!40000 ALTER TABLE `vehicle_maintenance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-01 17:49:32
