

//ER Diagram
The diagram will show how the tables are related to each other and how they fulfill the requirements of my app.
The tables users, topics, posts, replies, and memberships are part of your existing forum structure.
The tables WorshipSongs, BibleBooks, and PrayerTypes are added to incorporate information about worship music, Bible study, and types of prayers.
Foreign keys have been used to establish relationships between tables.
Each post and reply is associated with a single user (UserID) and a single topic (TopicID).
Users must be members of topics before they can post (memberships table).
The WorshipSongs, BibleBooks, and PrayerTypes tables are associated with topics through foreign keys (TopicID).
+----------------------+      +----------------------+
|       users          |      |        topics        |
+----------------------+      +----------------------+
| UserID (PK)          |      | TopicID (PK)         |
| Username             |      | TopicName            |
| Email                |      | Description          |
| Password             |      +----------------------+
+----------------------+             |
        |                            |
        |                            |
        v                            v
+----------------------+      +----------------------+
|       posts          |      |       replies        |
+----------------------+      +----------------------+
| PostID (PK)          |      | ReplyID (PK)         |
| UserID (FK)          |      | PostID (FK)          |
| TopicID (FK)         |      | UserID (FK)          |
| PostContent          |      | ReplyContent         |
| PostDate             |      | ReplyDate            |
+----------------------+      +----------------------+
        |                            |
        |                            |
        v                            v
+----------------------+      +----------------------+
|    memberships       |      |     WorshipSongs     |
+----------------------+      +----------------------+
| MembershipID (PK)    |      | SongID (PK)          |
| UserID (FK)          |      | SongTitle            |
| TopicID (FK)         |      | Artist               |
+----------------------+      | TopicID (FK)         |
                               +----------------------+
                                       |
                                       |
                                       v
                               +----------------------+
                               |      BibleBooks      |
                               +----------------------+
                               | BookID (PK)          |
                               | BookName             |
                               | TopicID (FK)         |
                               +----------------------+
                                       |
                                       |
                                       v
                               +----------------------+
                               |     PrayerTypes      |
                               +----------------------+
                               | PrayerTypeID (PK)    |
                               | PrayerTypeName       |
                               | TopicID (FK)         |
                               +----------------------+
