const express=require("express");
const router=express.Router();
const {authenticateToken}=require("../middlewares/authenticate");
const { postValidator } = require("../middlewares/post/userInputValidator");
const { 
    createPost, 
    getAllPosts,
    deletePost, 
    upvotePost, 
    viewPost
} = require("../controllers/posts");

//POST /posts/create-post
router.post('/create-post',authenticateToken("token"),postValidator,createPost);

//GET /posts/delete-post
router.delete('/delete-post',authenticateToken("token"),deletePost);

//GET /posts/get-allposts
router.get('/get-allposts',getAllPosts);

//POST /posts/upvote/:postId
router.post('/upvote/:postId',authenticateToken("token"),upvotePost);

//GET /posts/view-post/:postId
router.get('/:postId',authenticateToken("token"),viewPost);

module.exports=router;