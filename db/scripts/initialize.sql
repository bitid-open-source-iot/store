CREATE DATABASE `bitid`;

use bitid;

CREATE TABLE `tblTransactions` (
  `_id` varchar(25) NOT NULL,
  `type` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `debit` varchar(45) NOT NULL,
  `credit` varchar(45) NOT NULL,
  `storeId` varchar(25) NOT NULL,
  `serverDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` varchar(45) NOT NULL,
  `transactionId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`transactionId`));

create index IX_tblTransactions_email_storeId on tblTransactions (email, storeId);

-- CREATE TABLE `tblVouchers` (
--   `code` VARCHAR(100) NOT NULL,
--   `email` VARCHAR(100) NOT NULL,
--   `amount` DECIMAL NOT NULL,
--   `storeId` VARCHAR(100) NOT NULL,
--   `redeemed` boolean NOT NULL DEFAULT false,
--   `voucherId` INT NOT NULL AUTO_INCREMENT,
--   `serverDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
--   `description` VARCHAR(45) NOT NULL,
--   `dateRedeemed` timestamp NULL,
--   PRIMARY KEY (`voucherId`));

-- create index IX_tblVouchers_email_storeId on tblVouchers (email, storeId);