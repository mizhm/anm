CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(20),
	`position` varchar(100),
	`department` varchar(100),
	`salary_encrypted` text,
	`id_number_encrypted` text,
	`address` text,
	`date_of_birth` timestamp,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`),
	CONSTRAINT `employees_email_unique` UNIQUE(`email`)
);
