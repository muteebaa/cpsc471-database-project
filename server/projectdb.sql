-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: rentmyridedb
-- ------------------------------------------------------
-- Server version	8.0.31
DROP DATABASE if exists rentmyridedb;
CREATE DATABASE rentmyridedb;
USE rentmyridedb;
--
-- Table structure for table `cars`
--

CREATE TABLE `cars` (
  `username` varchar(45) NOT NULL,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `year` varchar(45) NOT NULL,
  `regNumber` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `features` varchar(1000) NOT NULL,
  `type` varchar(45) NOT NULL,
  `colour` varchar(45) NOT NULL,
  `startDate` varchar(45) NOT NULL,
  `endDate` varchar(45) NOT NULL,
  `pickupAddress` varchar(200) NOT NULL,
  `description` varchar(3000) NOT NULL,
  `photo` varchar(450) NOT NULL,
  `recalls` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `damage` varchar(3000),
  PRIMARY KEY (`regNumber`)
);


--
-- Table structure for table `users`
--


CREATE TABLE `users` (
  
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` int NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `LastName` varchar(45) NOT NULL,
  `PhoneNumber` varchar(45) NOT NULL,
  `EmailAddress` varchar(45) NOT NULL,
  
  PRIMARY KEY (`username`)
);

--
-- Table structure for table `reservation`
--
CREATE TABLE `reservation` (
  `reservationNumber` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reg_number` varchar(45) NOT NULL,
  `user` varchar(45) NOT NULL,
  `insurance` varchar(45) NOT NULL,
  `year` varchar(45) NOT NULL,
  `make` varchar(45) NOT NULL,
  `model` varchar(45) NOT NULL,
  `pickUp` varchar(45) NOT NULL,
  PRIMARY KEY (`reservationNumber`),
  FOREIGN KEY (`reg_number`) REFERENCES cars(`regNumber`)
  );


--
-- Table structure for table `premium_plan`
--
CREATE TABLE `premium_plan` (
  `username` varchar(45) NOT NULL,
  `detailing` varchar(45) NOT NULL,
  `car_wash` varchar(45) NOT NULL,
  FOREIGN KEY (`username`) REFERENCES users(`username`)
);


--
-- Table structure for table `review`
--
CREATE TABLE `review` (
  `username` varchar(45) NOT NULL,
  `location_rating` int NOT NULL,
  `consdition_rating` int NOT NULL,
  `writting_comments`  varchar(3000) NOT NULL,
  `car_reg` varchar(45) NOT NULL,
  FOREIGN KEY (`car_reg`) REFERENCES cars(`regNumber`),
  CONSTRAINT PK_review PRIMARY KEY (`username`, `car_reg`)
);