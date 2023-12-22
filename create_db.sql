# Create database script for Selah Hub

# Create the database
CREATE DATABASE myForumapp;
USE myForumapp;

# Create the tables
CREATE TABLE users (UserID INT AUTO_INCREMENT PRIMARY KEY,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL);

# Create the tables
CREATE TABLE topics (TopicID INT AUTO_INCREMENT PRIMARY KEY,
  TopicName VARCHAR(255) NOT NULL,
  Description TEXT);
  
CREATE TABLE WorshipSongs (
    SongID INT AUTO_INCREMENT PRIMARY KEY,
    SongTitle VARCHAR(255),
    Artist VARCHAR(255),
    TopicID INT,
    FOREIGN KEY (TopicID) REFERENCES topics(TopicID)
);
CREATE TABLE BibleBooks (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    BookName VARCHAR(255),
    TopicID INT,
    FOREIGN KEY (TopicID) REFERENCES topics(TopicID)
);
CREATE TABLE PrayerTypes (
    PrayerTypeID INT AUTO_INCREMENT PRIMARY KEY,
    PrayerTypeName VARCHAR(255),
    TopicID INT,
    FOREIGN KEY (TopicID) REFERENCES topics(TopicID)
);

CREATE TABLE  posts (
  PostID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT,
  TopicID INT,
  PostContent TEXT,
  PostDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (UserID) REFERENCES users(UserID),
  FOREIGN KEY (TopicID) REFERENCES topics(TopicID)
);
CREATE TABLE replies (
  ReplyID INT AUTO_INCREMENT PRIMARY KEY,
  PostID INT,
  UserID INT,
  ReplyContent TEXT,
  ReplyDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (PostID) REFERENCES posts(PostID),
  FOREIGN KEY (UserID) REFERENCES users(UserID)
);
CREATE TABLE memberships (
  MembershipID INT AUTO_INCREMENT PRIMARY KEY,
  UserID INT,
  TopicID INT,
  FOREIGN KEY (UserID) REFERENCES users(UserID),
  FOREIGN KEY (TopicID) REFERENCES topics(TopicID)
);


# Create the app user and give it access to the database
CREATE USER 'appuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'app2027';
GRANT ALL PRIVILEGES ON myForumapp.* TO 'appuser'@'localhost';
