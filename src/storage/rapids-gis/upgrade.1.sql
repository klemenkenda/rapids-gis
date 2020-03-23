-- use correct database
use rapidgis;

-- create table users for storing users
create table users (
    ts timestamp not null default current_timestamp,
    id int auto_increment,
    user_id int,
    username varchar(50),
    password varchar(255),
    name varchar(50),
    type int,
    constraint users_pk primary key (id)
) collate=utf8_slovenian_ci;