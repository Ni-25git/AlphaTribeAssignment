

# AlphaTribeAssignment

# AlphaTribeAssignment is a backend project built using Node.js, Express.js, and MongoDB. The application enables users to manage stock-related posts, comment on posts, like/unlike posts, and filter or sort posts based on stock symbols or likes. It also includes JWT-based user authentication.

# Tech Stack
# •Node.js
# •Express.js
# •MongoDB
# •JWT (JSON Web Token)
# •ThunderClient (API Documentation)

# Features
# User Authentication (JWT-based)
# Register, Login, and Update Profile.

# Stock Post Management
# Create, Read, Update, and Delete stock-related posts.
# Comment and Like System on posts.
# Filtering & Sorting
# Filter by stockSymbol.

# API Documentation
# I can use ThunderClient for API documentation.

# Setup & Installation
# Prerequisites
# Node.js installed
# Use mongoDb for storing database .
# Make a .env file for PORT number , mongoURL , JWT_SECRET.

# in config folder
# db.js:- used for connecting the databse to the server.

# In models folder there are 4 models.

# 1.UserModel :- Represents users in the application, storing their credentials, profile information, and authentication details.
# 2.PostModel :- Manages stock-related posts created by users, including stock symbol, title, description, and associated metadata like tags, likes, and creation date.
# 3.CommentModel :-  Handles user comments on posts, storing the comment content, associated post, and user information.
# 4.LikeModel :- Tracks likes on posts, linking each like to the corresponding user and post, and managing the total number of likes for each post.

# In Route folder different routes used

# 1.userRoutes:-  Handles user-related routes for registration, login, profile updates, and fetching user information.
# •POST /api/user/register (for register the user information)
# •POST /api/user/login (for post login infromation)
# •GET /api/user/:userId (for fetch only single user information by userID)
# •PUT /api/user/profile/:userId (for update the specific user with userID)


# 2.postRoutes:- Manages routes for creating, retrieving, updating, and deleting stock-related posts, with support for filters and sorting.
# •POST /api/posts (for post the post information)
# •GET /api/posts/:postId (for fetching single post information)
# •GET /api/posts/ (for sorting and filtering by query by stockSymbol)
# •DELETE /api/posts/:postId (for delete the specific post with postID)


# 3.commentRoutes:- Defines routes for adding, retrieving, and deleting comments on specific stock posts.
# • POST /api/comments/:postId (for post the comment to the post with postId)
# • DELETE /api/comments/:postID/comments/:commentId (for delete the comment eith specific post with postId and commentId)


# 4.likeRoutes:-  Provides routes for liking and unliking posts, and tracks the number of likes on each post.
# •POST /api/like/:postId (for post the like with postId)
# •DELETE /api/like/:postId (for delete the post with postId)

# We can use middleware for authenticate

# authMiddleware:- Verifies and authenticates the user's JWT token to protect routes and ensure that only authorized users can access specific resources.


