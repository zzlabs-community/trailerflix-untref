USE trailerflix;
CREATE TABLE IF NOT EXISTS `categorias` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(50) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `generos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `contenido` (
	`id` int NOT NULL,
	`titulo` varchar(255) NOT NULL,
	`resumen` text,
	`poster` text,
	`trailer` text,
	`busqueda` text,
	`duracion` varchar(30),
	`temporadas` varchar(20),
	`categoria_id` int NOT NULL,
	`genero_id` int NOT NULL,
	PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `actores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre_completo` varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nombre` varchar(100) NOT NULL UNIQUE,
	PRIMARY KEY (`id`)
);
CREATE TABLE IF NOT EXISTS `contenido_actores` (
	`contenido_id` int NOT NULL,
	`actor_id` int NOT NULL,
	PRIMARY KEY (`contenido_id`, `actor_id`)
);
CREATE TABLE IF NOT EXISTS `contenido_tags` (
	`contenido_id` int NOT NULL,
	`tag_id` int NOT NULL,
	PRIMARY KEY (`contenido_id`, `tag_id`)
);
ALTER TABLE `contenido` ADD CONSTRAINT `contenido_fk8` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`);
ALTER TABLE `contenido` ADD CONSTRAINT `contenido_fk9` FOREIGN KEY (`genero_id`) REFERENCES `generos`(`id`);
ALTER TABLE `contenido_actores` ADD CONSTRAINT `contenido_actores_fk0` FOREIGN KEY (`contenido_id`) REFERENCES `contenido`(`id`);
ALTER TABLE `contenido_actores` ADD CONSTRAINT `contenido_actores_fk1` FOREIGN KEY (`actor_id`) REFERENCES `actores`(`id`);
ALTER TABLE `contenido_tags` ADD CONSTRAINT `contenido_tags_fk0` FOREIGN KEY (`contenido_id`) REFERENCES `contenido`(`id`);
ALTER TABLE `contenido_tags` ADD CONSTRAINT `contenido_tags_fk1` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`);