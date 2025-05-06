const express=require("express");
const { createPost, getAllPosts,getUserPosts,deletePost, getPopularTags } = require("../controllers/posts");
const {getUserDetails}=require("../controllers/user");
const {authenticateToken}=require("../middlewares/authenticate");
const { postValidator } = require("../middlewares/post/userInputValidator");
const router=express.Router();

//POST /posts/create-post
router.post('/create-post',authenticateToken("token"),postValidator,createPost);

//GET /posts/delete-post
router.delete('/delete-post',authenticateToken("token"),deletePost);

//GET /posts/get-allposts
router.get('/posts/get-allposts',getAllPosts);

module.exports=router;