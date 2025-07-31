create database cadastro;
use cadastro;

create table cliente(
    id int auto_increment primary key,
    nome varchar(50) not null,
    cpf varchar(11) not null unique
)