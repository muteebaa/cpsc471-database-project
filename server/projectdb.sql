-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rentmyridedb
-- ------------------------------------------------------
-- Server version	8.0.31

--
-- Table structure for table `cars`
--

USE rentmyridedb;

DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars` (
  `username` varchar(45) NOT NULL,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `regNumber` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `features` varchar(1000) NOT NULL,
  `colour` varchar(45) NOT NULL,
  `photo` varchar(45) NOT NULL,
  PRIMARY KEY (`regNumber`)
);

--
-- Table structure for table `loaners`
--

DROP TABLE IF EXISTS `loaners`;
CREATE TABLE `loaners` (
  `idusers` int NOT NULL DEFAULT '0',
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL
); 
--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` int NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `PhoneNumber` varchar(45) NOT NULL,
  `EmailAddress` varchar(45) NOT NULL,
  PRIMARY KEY (`idusers`)
) 
