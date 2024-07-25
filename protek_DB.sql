use modbus;
select * from access;

CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);



CREATE TABLE access (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  operator ENUM('admin', 'operator') NOT NULL
);

CREATE TABLE access (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'operator') NOT NULL
);

ALTER TABLE access CHANGE operator role ENUM('admin', 'operator') NOT NULL;

drop table access;

INSERT INTO access (username, password, operator) VALUES ('operator', '123', 'operator');

use modbus;

select * from access;

select * from data_logs;

CREATE TABLE device_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  com_port VARCHAR(50) ,
  baud_rate INT,
  parity ENUM('none', 'odd', 'even') NOT NULL,
  stop_bit INT 
);

drop table device_settings;

CREATE TABLE device_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  com_port VARCHAR(255) ,
  baud_rate INT ,
  parity VARCHAR(255),
  stop_bit INT 
);


CREATE TABLE device_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  com_port VARCHAR(255) NOT NULL,
  baud_rate INT NOT NULL,
  parity VARCHAR(255) NOT NULL,
  stop_bit INT NOT NULL
);

insert into device_settings(com_port, baud_rate, parity, stop_bit) VALUES ('COM8', 9600, 'Even', 1);
use modbus;

select * from device_settings;

drop table communication_settings;

select * from access;

CREATE TABLE communication_settings (
id INT AUTO_INCREMENT PRIMARY KEY,
  comPort VARCHAR(50),
  baudRate INT,
  parity VARCHAR(10),
  dataBits INT,
  stopBits INT
);


CREATE TABLE communication_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  comPort VARCHAR(255) NOT NULL,
  baudRate INT NOT NULL,
  parity VARCHAR(255) NOT NULL,
  stopBits INT NOT NULL,
  dataBits INT NOT NULL
);



use modbus;

insert into communication_settings(comPort, baudRate, parity, stopBits, dataBits) VALUES ('COM4', 9600, 'Even', 1, 8);

drop table communication_settings;
select * from communication_settings;		

select * from data_logs;


UPDATE communication_settings
SET comPort = 'COM4'
WHERE id = 1;
use modbus;
select * from data_logs;