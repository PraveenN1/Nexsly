const express=require("express");
const router=express.Router();

const { getAllTags} = require("../controllers/tags");
const {getPopularTags}=require("../controllers/posts");

router.get("/get-all-tags",getAllTags);
router.get('/posts/get-popular-tags',getPopularTags);

module.exports=router;