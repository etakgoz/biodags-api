CREATE DATABASE IF NOT EXISTS biodags_db CHARACTER SET utf8;

GRANT ALL ON insider_db.* TO 'biodags_adm'@'localhost' IDENTIFIED BY '0acidrain6';

FLUSH PRIVILEGES;