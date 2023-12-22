const checkMembership = require('../middleware/checkMembership');
module.exports = function(app, shopData) {

    // route === endpoint

    // Handle our routes
    app.get('/', function(req,res){
        res.render('home.ejs', shopData)
    });
    app.get('/about',function(req,res){
        res.render('about.ejs', shopData);
    });

    // List existing posts
    app.get('/posts', function(req, res) {
        // Fetch all posts from the database
        // Modify the SQL query accordingly
        let sqlQuery = "SELECT * FROM posts";
        db.query(sqlQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            let newData = Object.assign({}, shopData, { posts: result });
            res.render('posts.ejs', newData);
        });
    });
    
    // Page to list existing users
    app.get('/users', function(req, res) {
        // Fetch all users from the database
        let sqlQuery = "SELECT * FROM users";
        db.query(sqlQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            let data = { users: result, shopName: shopData.shopName };
            res.render('users.ejs', data);
        });
    });

    // Add a new Post
    app.get('/new-post', checkMembership,(req, res) => {
        // Check if the user is a member of the specified topic
        // if (!req.isUserMember) {
        //     // Redirect or show an error message
        //     res.redirect('/error'); // Adjust the route accordingly
        //     //return;
        // }
        const topicId = req.query.topicId;
        // Render the form to add a new post
        res.render('new-post.ejs', {...shopData, topicId});
    });
    
    app.post('/new-post', function(req, res) {
        // Process the form submission and save the new post to the database
        let sqlQuery = "INSERT INTO posts (PostContent, UserID, TopicID, PostDate) VALUES (?, ?, ?, NOW())";
        let newRecord = [req.body.content, req.body.userId, req.body.topicId];
        db.query(sqlQuery, newRecord, (err, result) => {
            if (err) {
                return console.error(err.message);
            } else {
                // Redirect to the posts page
                res.redirect('/posts');
            }
        });
    });
    
    //Search the page.
    app.get('/search',function(req,res){
        res.render("search.ejs", shopData);
       
    });

    //Search for posts.
    app.get('/search-post', function(req, res) {
        console.log({req})
    

        // searching in the database
        let sqlQuery = "SELECT * FROM posts WHERE PostContent LIKE ?";
        let searchKeyword = '%' + req.query.keyword + '%';

        db.query(sqlQuery, [searchKeyword], (err, result) => {
            if (err) {
               console.log({err, sqlQuery, searchKeyword});
               res.redirect('/');
            }
            console.log('Data from the database:', result);
            //Pass the data directly as an object
            let data = ('search-posts.ejs', { ...shopData, basicSearchPosts: result,   });
            console.log('Data to be rendered:', data);

            res.render('search-posts.ejs', data);
        });
    });
    
    //list to existing Topics
    app.get('/topics', function(req, res) {
        // Fetch all topics from the database
        let sqlQuery = "SELECT * FROM topics";
        db.query(sqlQuery, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            let data = { topics: result };
            res.render('topics.ejs', data);
        });
    });
    
    // Topic Details Page.
    app.get('/topic-details', function(req, res) {
        // Fetch topic details from the database based on a specific logic
        // You may need to modify this part based on your requirements
        let sqlQuery = "SELECT * FROM topics LIMIT 1"; // Fetching the first topic for illustration
        db.query(sqlQuery, (err, result) => {
            if (err || result.length === 0) {
                res.redirect('/');
            } else {
                let topicData = { topic: result[0], shopName: shopData.shopName };

                // Fetch posts related to the topic
                let postsQuery = "SELECT * FROM posts WHERE TopicID = ?";
                db.query(postsQuery, [result[0].TopicID], (err, postsResult) => {
                    if (err) {
                        res.redirect('/');
                    } else {
                        topicData.posts = postsResult;
                        res.render('topic-details.ejs', topicData);
                    }
                });
            }
        });
    })
    
    // Delete Post
    app.post('/delete-post', function (req, res) {
        const postId = req.params.postId;
        const deleteQuery = "DELETE FROM posts WHERE PostID = ?";
        
        db.query(deleteQuery, [postId], (err, result) => {
            if (err) {
                console.error(err.message);
                return res.redirect('/'); // Redirect to posts page on error
            } else {
               res.redirect('/posts'); // Redirect to posts page after successful deletion
            }
        });
    });
     


    // Replies to Posts
    app.post('/reply-to-post/:postId', function (req, res) {
         const postId = req.params.postID;
         const replyContent = req.body.replyContent;
         const UserID = req.body.UserID; // Assuming you have user authentication in place

         // Insert reply into database
         const insertReplyQuery = "INSERT INTO replies (PostID, UserID, ReplyContent, ReplyDate) VALUES (?, ?, ?, NOW())";
         db.query(insertReplyQuery, [postId, UserId, replyContent], (err, result) => {
                 if (err) {
                console.error(err.message);
                res.redirect(`/view-post/${postId}`); // Redirect to post details page on error
            } else {
            res.redirect(`/view-post/${postId}`); // Redirect to post details page after a successful reply
            }
        });
    });

    
}
