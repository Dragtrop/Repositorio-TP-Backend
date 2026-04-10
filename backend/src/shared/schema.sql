-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: cocheras
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `alquileres`
--

DROP TABLE IF EXISTS `alquileres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alquileres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `garageId` int NOT NULL,
  `usuarioId` int NOT NULL,
  `duracionHoras` decimal(10,0) NOT NULL,
  `servicios` int NOT NULL,
  `vehiculoId` int NOT NULL,
  `fechaAlquiler` timestamp NOT NULL,
  `total` int NOT NULL,
  `estadoPago` enum('pendiente','aprobado','rechazado','en_proceso') DEFAULT 'pendiente',
  `mpPaymentId` varchar(100) DEFAULT NULL,
  `mpPreferenceId` varchar(100) DEFAULT NULL,
  `fechaPago` datetime DEFAULT NULL,
  `liberado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `garageId_idx` (`garageId`),
  KEY `usuarioId_idx` (`usuarioId`),
  KEY `vehiculoId_idx` (`vehiculoId`),
  CONSTRAINT `garageId` FOREIGN KEY (`garageId`) REFERENCES `garages` (`nroGarage`) ON UPDATE CASCADE,
  CONSTRAINT `usuarioId` FOREIGN KEY (`usuarioId`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `vehiculoId` FOREIGN KEY (`vehiculoId`) REFERENCES `vehicles` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `garages`
--

DROP TABLE IF EXISTS `garages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `garages` (
  `nroGarage` int NOT NULL AUTO_INCREMENT,
  `direccion` varchar(45) NOT NULL,
  `cantLugares` int NOT NULL,
  `valorCocheraxH` int NOT NULL,
  `id` int DEFAULT NULL,
  `idservicios` int DEFAULT NULL,
  `idDueno` int DEFAULT NULL,
  `activo` int DEFAULT '1',
  PRIMARY KEY (`nroGarage`),
  KEY `idServicio_idx` (`idservicios`),
  KEY `idDueño_idx` (`idDueno`),
  CONSTRAINT `idDueno` FOREIGN KEY (`idDueno`) REFERENCES `users` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `idServicio` FOREIGN KEY (`idservicios`) REFERENCES `services` (`nroServicio`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

--
-- Table structure for table `precio_garage`
--

DROP TABLE IF EXISTS `precio_garage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `precio_garage` (
  `garage_id` int NOT NULL,
  `precio_desde` datetime NOT NULL,
  `valor` int NOT NULL,
  PRIMARY KEY (`garage_id`,`precio_desde`),
  CONSTRAINT `precio_garage_ibfk_1` FOREIGN KEY (`garage_id`) REFERENCES `garages` (`nroGarage`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `nroServicio` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `valorServicio` int NOT NULL,
  `id` int DEFAULT NULL,
  PRIMARY KEY (`nroServicio`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `telefono` int NOT NULL,
  `mail` varchar(45) NOT NULL,
  `Rol` varchar(45) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `idve` int DEFAULT NULL,
  `nroCliente` int DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_UNIQUE` (`usuario`),
  KEY `id_idx` (`idve`),
  CONSTRAINT `id` FOREIGN KEY (`idve`) REFERENCES `vehicles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicles` (
  `patente` varchar(45) NOT NULL,
  `marca` varchar(45) NOT NULL,
  `codtipv` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `tippoVehiculo_idx` (`codtipv`),
  CONSTRAINT `idTipoVehiculo` FOREIGN KEY (`codtipv`) REFERENCES `vehicletypes` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vehicletypes`
--

DROP TABLE IF EXISTS `vehicletypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehicletypes` (
  `nombre` varchar(45) NOT NULL,
  `codigo` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-01  9:39:03
