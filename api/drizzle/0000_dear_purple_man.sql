CREATE TABLE `employees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`position` text NOT NULL,
	`department` text NOT NULL,
	`gender` text NOT NULL,
	`experience_years` text NOT NULL,
	`join_year` text NOT NULL,
	`salary` text NOT NULL,
	`id_number` text NOT NULL,
	`address` text NOT NULL,
	`date_of_birth` text NOT NULL,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `employees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`full_name` varchar(255) NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` varchar(50) DEFAULT 'user',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
