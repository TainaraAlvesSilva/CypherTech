create database cypher;

use cypher;

CREATE TABLE `user` (
  `id` int NOT NULL auto_increment,
  `usuario` varchar(80) NOT NULL,
  `email` int(60) NOT NULL,
  `senha` varchar(50) NOT NULL,
  PRIMARY KEY  (`id`)
);

CREATE TABLE `produtos` (
  `id_produto` int NOT NULL auto_increment,
  `nome` varchar(80) NOT NULL,
  `preco` double NOT NULL,
  `descricao` varchar(250) NOT NULL,
  PRIMARY KEY  (`id_produto`)
);