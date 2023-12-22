// checkMembership.js

module.exports = function(req, res, next) {
    // if (!req.isAuthenticated()) {
    //   // Redirect or show an error message for unauthenticated users
    //   return res.redirect('/login'); // Adjust the route accordingly
    // }
    // Check if req.user and req.user.id exist
        if (!req.user || !req.user.id) {
        // Redirect or handle unauthorized access
        res.redirect('/'); // Adjust the route accordingly
         //return;
  }

    // has the topic ID in req.body.topicId
    const topicId = req.params.topicId;
    const userId = req.user.id; 
  
    // Query your database to check if the user is a member of the specified topic
    const membershipCheckQuery = "SELECT * FROM memberships WHERE UserID = ? AND TopicID = ?";
    
    // Use a Promise to handle the asynchronous database query
   //// Check if req.user and req.user.id exist
   new Promise((resolve, reject) => {
    db.query(membershipCheckQuery, [userId, topicId], (err, result) => {
                if (err) {
                    console.error(err.message);
                    return reject(err);
                }
                    resolve(result);
        });
   })
     .then(result => {
         // Check if the user is a member based on the query result
         if (result.length > 0) {
            // User is a member
            req.isUserMember = true;
            next();
     } else {
        // User is not a member, handle accordingly
        return res.redirect('/error'); // Adjust the route accordingly
     }
     })
     .catch(err => {
            // Handle the error appropriately, e.g., redirect or show an error message
            console.error(err.message);
            return res.redirect('/error'); // Adjust the route accordingly
        });
};
      
    
