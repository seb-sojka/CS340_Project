-- Table creation queries should immedatley follow the drop table queries, this is to facilitate testing on my end

DROP TABLE IF EXISTS `masksChar_Adv`;
DROP TABLE IF EXISTS `masksPB_Adv`;
DROP TABLE IF EXISTS `masksChar_Con`;
DROP TABLE IF EXISTS `masksPlayer`;
DROP TABLE IF EXISTS `masksInfluence`;
DROP TABLE IF EXISTS `masksChar`;
DROP TABLE IF EXISTS `masksCon`;
DROP TABLE IF EXISTS `masksPlaybook`;
DROP TABLE IF EXISTS `masksAdv`;


-- Create a table for the player of a game of Masks
-- Adv_ID - an auto incrementing integer which is the primary key
-- advancement - a text type for the advancement do

CREATE TABLE `masksAdv` (
  `Adv_ID` int(11) NOT NULL AUTO_INCREMENT,
  `advancement` TEXT NOT NULL,
  PRIMARY KEY (`Adv_ID`)
) ENGINE=InnoDB;


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
  `campaign` varchar(255) NOT NULL,
  `PB_ID` int(11) NOT NULL,
  KEY `PB_ID` (`PB_ID`),
  PRIMARY KEY (`Char_ID`),
  CONSTRAINT `playbook` FOREIGN KEY (`PB_ID`) REFERENCES `masksPlaybook` (`PB_ID`)
) ENGINE=InnoDB;


-- Create a table for the player of a game of Masks
-- Player_ID - an auto incrementing integer which is the primary key
-- first_name - a varchar with a maximum length of 255 characters, not null
-- last_name - a varchar with a maximum length of 255 characters
-- Char_ID - an integer which is a foreign key reference to a character
-- the combination of the first_name and last_name must be unique in this table

CREATE TABLE `masksPlayer` (
  `Player_ID` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255),
  `Char_ID` int(11),
  KEY `Char_ID` (`Char_ID`),
  PRIMARY KEY (`Player_ID`),
  UNIQUE KEY `name`(`first_name`, `last_name`),
  CONSTRAINT `player_character` FOREIGN KEY (`Char_ID`) REFERENCES `masksChar` (`Char_ID`)
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
  CONSTRAINT `char_inf` FOREIGN KEY (`Char_id`) REFERENCES `masksChar` (`Char_id`),
  CONSTRAINT `influence_char` FOREIGN KEY (`Char_id`) REFERENCES `masksChar` (`Char_id`)
) ENGINE=InnoDB;

-- Create a table to work with character and conditions the character has
-- Char_id - an integer which is a foreign key reference to character who has a condition
-- Con_id - an integer which is a foreign key reference to the condition 

CREATE TABLE `masksChar_Con` (
  `Char_id` int(11) NOT NULL DEFAULT '0',
  `Con_id` int(11) NOT NULL DEFAULT '0',
  KEY `Con_id` (`Con_id`),
  PRIMARY KEY (`Char_id`,`Con_id`),
  CONSTRAINT `con_char` FOREIGN KEY (`Char_id`) REFERENCES `masksChar` (`Char_id`),
  CONSTRAINT `con_con` FOREIGN KEY (`Con_id`) REFERENCES `masksCon` (`Con_id`)
) ENGINE=InnoDB;

-- Create a table to work with character and advancements chosen
-- Char_id - an integer which is a foreign key reference to character 
-- Adv_id - an integer which is a foreign key reference to the advancement 

CREATE TABLE `masksChar_Adv` (
  `Char_id` int(11) NOT NULL DEFAULT '0',
  `Adv_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Char_id`,`Adv_id`),
  CONSTRAINT `adv_char` FOREIGN KEY (`Char_id`) REFERENCES `masksChar` (`Char_id`),
  CONSTRAINT `adv_adv` FOREIGN KEY (`Adv_id`) REFERENCES `masksAdv` (`Adv_id`)
) ENGINE=InnoDB;


-- Create a table to work with playbook and advancements available
-- PB_id - an integer which is a foreign key reference to playbook 
-- Adv_id - an integer which is a foreign key reference to the advancement 

CREATE TABLE `masksPB_Adv` (
  `PB_id` int(11) NOT NULL DEFAULT '0',
  `Adv_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`PB_id`,`Adv_id`),
  CONSTRAINT `adv_PB` FOREIGN KEY (`PB_id`) REFERENCES `masksPlaybook` (`PB_id`),
  CONSTRAINT `adv_adv2` FOREIGN KEY (`Adv_id`) REFERENCES `masksAdv` (`Adv_id`)
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

INSERT INTO `masksAdv` (`advancement`)
VALUES ('Take another move from your playbook');
INSERT INTO `masksAdv` (`advancement`)
VALUES ('Take a move from another playbook');
INSERT INTO `masksAdv` (`advancement`)
VALUES (' Someone permanently loses Influence over you. add +1 to a Label');
INSERT INTO `masksAdv` (`advancement`)
VALUES ('Rearrange your Labels as you choose. add +1 to a Label');
INSERT INTO `masksAdv` (`advancement`)
VALUES ('Unlock your Moment of Truth');

-- Test
INSERT INTO  `masksChar` (
`Char_ID` ,
`hero_name` ,
`real_name` ,
`Danger` ,
`Freak` ,
`Savior` ,
`Superior` ,
`Mundane` ,
`campaign` ,
`PB_ID`
)
VALUES (
NULL ,  'me2', NULL ,  '0',  '0',  '0',  '0',  '0',  'mine',  '4'
);
