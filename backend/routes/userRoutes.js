const express=require("express");
const {getUserPosts} = require("../controllers/posts");
const {getUserDetails , handleDeleteUser}=require("../controllers/user");
const {authenticateToken}=require("../middlewares/authenticate");
const router=express.Router();

//GET /user/get-userposts - gets logged in user posts
router.get('/get-userposts', authenticateToken("token"), getUserPosts);

//GET /user/get-userdetails
router.get('/get-userdetails',authenticateToken("token") ,getUserDetails);

//DELETE /user/delete-user
router.put('/delete-user',authenticateToken("token"),handleDeleteUser);

module.exports=router;