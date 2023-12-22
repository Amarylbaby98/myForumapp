# Insert data into the tables

USE myForumapp;

INSERT INTO users (UserID, Username, Email, Password) VALUES 
(1, 'Jan3 Eyre1', 'Jan31@example.com', 'password1'),
(2, '2Bre3 Dere', 'Debre2@example.com', 'password2'),
(3, 'John Doe3', 'Dojo3@example.com', 'password3'),
(4, '6Col8 Hosky1', '6Col8@example.com', 'password4');

INSERT INTO topics (TopicID, TopicName, Description) VALUES 
(1, 'Worship Music', 'Discuss your favorite worship songs'),
(2, 'Types of Prayers', 'Share and learn about different types of prayers'),
(3, 'Bible Study', 'Discuss your insights from the book of Isaiah');

INSERT INTO WorshipSongs (SongID, SongTitle, Artist, TopicID) VALUES
(1, 'How Great Is Our God', 'Chris Tomlin', 1),
(2, 'Amazing Grace', 'Traditional', 1),
(3,'Holy', 'Chandler Moore', 1);

INSERT INTO BibleBooks (BookID, BookName, TopicID) VALUES
(1, 'Genesis', 2),
(2, 'Exodus', 2),
(3, 'Isaiah', 2),
(4, 'Revelation', 2);

INSERT INTO PrayerTypes (PrayerTypeID, PrayerTypeName, TopicID) VALUES
(1, 'Salvation Prayer', 3),
(2, 'Sinner\'s Prayer', 3),
(3, 'The Lord\'s Prayer', 3);

INSERT INTO posts (UserID, TopicID, PostContent, PostDate) VALUES
(1, 1, 'This is a worship song recommendation.', NOW()),
(2, 3, 'I love studying the book of Isaiah.', NOW()),
(4, 2, 'Let''s discuss different types of prayers.', NOW()),
(3, 3, 'Just finished reading the book of Genesis. Amazing!', NOW());

INSERT INTO replies (PostID, UserID, ReplyContent, ReplyDate) VALUES
(1, 2, 'I also love that worship song!', NOW()),
(2, 1, 'The book of Isaiah is full of wisdom.', NOW()),
(3, 3, 'I prefer silent meditation as a type of prayer.', NOW());

INSERT INTO memberships (UserID, TopicID) VALUES
(1, 1),
(2, 3),
(3, 2),
(4, 1);

