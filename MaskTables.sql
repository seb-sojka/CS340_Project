-- Table creation queries should immedatley follow the drop table queries, this is to facilitate testing on my end

DROP TABLE IF EXISTS `masksChar_Con`;
DROP TABLE IF EXISTS `masksInfluence`;
DROP TABLE IF EXISTS `masksChar`;
DROP TABLE IF EXISTS `masksCon`;
DROP TABLE IF EXISTS `masksPlaybook`;
DROP TABLE IF EXISTS `masksCamp`;


-- Create a table for the playbook used by characters
-- PB_id - an integer which is a foreign key reference to the playbook
-- name - a varchar with a maximum length of 255 characters, cannot be null, name of the plabook
-- Starting Labels - single int Character can have 5 labels to can range from -2 to +3 that effects the roll of the character. The labels are as following
--          -Danger
--          -Freak
--          -Savior
--          -Superior
--          -Mundane

CREATE TABLE `masksPlaybook` (
  `PB_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `Danger` int(1) NOT NULL DEFAULT '0',
  `Freak` int(1) NOT NULL DEFAULT '0',
  `Savior` int(1) NOT NULL DEFAULT '0',
  `Superior` int(1) NOT NULL DEFAULT '0',
  `Mundane` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`PB_ID`)
) ENGINE=InnoDB;

-- Create a table for the campaigns
-- PB_id - an integer which is a foreign key reference to the campaign
-- name - a varchar with a maximum length of 255 characters, cannot be null, name of the campaign

CREATE TABLE `masksCamp` (
  `Camp_ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`Camp_ID`)
) ENGINE=InnoDB;

-- Create a table for the characters of a game of Masks
-- Char_ID - an auto incrementing integer which is the primary key
-- hero_name - a varchar with a maximum length of 255 characters, cannot be null, the hero name of characte like Flash or Iron Man 
-- real_name - a varchar with a maximum length of 255 characters, the real name of the character link Barry Allen or Tony Stark
-- Labels - single int Character can have 5 labels to can range from -2 to +3 that effects the roll of the character. The labels are as following
--          -Danger
--          -Freak
--          -Savior
--          -Superior
--          -Mundane
-- campaign - a varchar with a maximum length of 255 characters, cannot be null, The name of the campaign the character is in.
-- PBid - an integer which is a foreign key reference to the playbook table

CREATE TABLE `masksChar` (
  `Char_ID` int(11) NOT NULL AUTO_INCREMENT,
  `hero_name` varchar(255) NOT NULL,
  `real_name` varchar(255),
  `Danger` int(1) NOT NULL DEFAULT '0',
  `Freak` int(1) NOT NULL DEFAULT '0',
  `Savior` int(1) NOT NULL DEFAULT '0',
  `Superior` int(1) NOT NULL DEFAULT '0',
  `Mundane` int(1) NOT NULL DEFAULT '0',
  `potential` int(1) NOT NULL DEFAULT '0',
  `PB_ID` int(11) NOT NULL,
  `Camp_ID` int(11) NOT NULL ,
  KEY `PB_ID` (`PB_ID`),
  PRIMARY KEY (`Char_ID`),
  CONSTRAINT `playbook` FOREIGN KEY (`PB_ID`) REFERENCES `masksPlaybook` (`PB_ID`), 
  CONSTRAINT `camps` FOREIGN KEY (`Camp_ID`) REFERENCES `masksCamp` (`Camp_ID`) ON DELETE CASCADE
) ENGINE=InnoDB;


-- Create a table to work with conditions and what roll the effect
-- Con_id - an auto incrementing integer which is the primary key
-- name - a varchar with a maximum length of 255 characters, not null, name of the condition
-- Rolls - a varchar with a maximum length of 255 characters, cannot be null, the rolls that are effect by the condition

CREATE TABLE `masksCon` (
  `Con_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rolls` TEXT NOT NULL,
  PRIMARY KEY (`Con_id`)
) ENGINE=InnoDB;

-- Create a table to show how has influence over who
-- Char_id - an integer which is a foreign key reference to character who has influence
-- Influence_id - an integer which is a foreign key reference to character is influenced by a character

CREATE TABLE `masksInfluence` (
  `Char_id` int(11) NOT NULL DEFAULT '0',
  `Influence_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Char_id`,`Influence_id`),
  KEY `Influence_id` (`Influence_id`),
  CONSTRAINT `char_inf` FOREIGN KEY (`Char_id`) REFERENCES `masksChar` (`Char_id`) ON DELETE CASCADE,
  CONSTRAINT `influence_char` FOREIGN KEY (`Char_id`) REFERENCES `masksChar` (`Char_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Create a table to work with character and conditions the character has
-- Char_id - an integer which is a foreign key reference to character who has a condition
-- Con_id - an integer which is a foreign key reference to the condition 

CREATE TABLE `masksChar_Con` (
  `Char_id` int(11) NOT NULL DEFAULT '0',
  `Con_id` int(11) NOT NULL DEFAULT '0',
  KEY `Con_id` (`Con_id`),
  PRIMARY KEY (`Char_id`,`Con_id`),
  CONSTRAINT `con_char` FOREIGN KEY (`Char_id`) REFERENCES `masksChar` (`Char_id`) ON DELETE CASCADE,
  CONSTRAINT `con_con` FOREIGN KEY (`Con_id`) REFERENCES `masksCon` (`Con_id`)
) ENGINE=InnoDB;


INSERT INTO `masksCon` (`name`, `rolls`)
VALUES ('Afraid', 'directly engage a threat');
INSERT INTO `masksCon` (`name`, `rolls`)
VALUES ('Angry', 'comfort or support or pierce the mask');
INSERT INTO `masksCon` (`name`, `rolls`)
VALUES ('Guilty', 'provoke someone or assess the situation');
INSERT INTO `masksCon` (`name`, `rolls`)
VALUES ('Hopeless', 'unleash your powers');
INSERT INTO `masksCon` (`name`, `rolls`)
VALUES ('Insecure', 'defend someone or reject others’ influence');

INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Beacon', '-1', '-1', '2', '0', '2');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Bull', '2', '1', '-1', '1', '-1');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Delinquent', '0', '0', '-1', '2', '1');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Doomed', '1', '1', '1', '-1', '0');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Janus', '0', '-1', '0', '0', '3');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Legacy', '-1', '0', '2', '0', '1');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Nova', '1', '2', '0', '0', '-1');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Outsider', '-1', '1', '0', '2', '0');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Protege', '-1', '0', '1', '2', '0');
INSERT INTO `masksPlaybook` (`name`, `Danger`, `Freak`, `Savior`, `Superior`, `Mundane`)
VALUES ('The Transformed', '1', '3', '0', '-1', '-1');


-- Test
Insert INTO `masksCamp` (`name`)
values('MCU');

Insert INTO `masksCamp` (`name`)
values('DC');

INSERT INTO  `masksChar` (`hero_name` ,`real_name` ,`Danger` ,`Freak` ,`Savior` ,`Superior` ,
`Mundane` ,`PB_ID` ,`Camp_ID`)
VALUES ('Iron Man', 'Tony Stark' ,  '0',  '0',  '0',  '0',  '0',  '2', '1');

INSERT INTO  `masksChar` (`hero_name` ,`Danger` ,`Freak` ,`Savior` ,`Superior` ,
`Mundane` ,`PB_ID` ,`Camp_ID`)
VALUES ('Thor',  '0',  '0',  '0',  '0',  '0', '5', '1');

INSERT INTO  `masksChar` (`hero_name` ,`real_name` ,`Danger` ,`Freak` ,`Savior` ,`Superior` ,
`Mundane` ,`PB_ID` ,`Camp_ID`)
VALUES ('Arrow', 'Oliver Queen' ,  '0',  '0',  '0',  '0',  '0', '3', '2');

INSERT INTO  `masksChar` (`hero_name` ,`real_name` ,`Danger` ,`Freak` ,`Savior` ,`Superior` ,
`Mundane` ,`PB_ID` ,`Camp_ID`)
VALUES ('Starfire', '	Koriandr' ,  '0',  '0',  '0',  '0',  '0', '6', '2');

INSERT INTO  `masksInfluence` (`Char_ID`, `Influence_id`)
VALUES ('1', '2');
INSERT INTO  `masksChar_Con` (`Char_ID`, `Con_id`)
VALUES ('1', '2');
