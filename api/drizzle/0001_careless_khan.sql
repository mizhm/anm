CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`role` varchar(50) DEFAULT 'user',
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `employees` MODIFY COLUMN `date_of_birth` date;