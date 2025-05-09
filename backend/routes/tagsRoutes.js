const express=require("express");
const router=express.Router();

const { getAllTags} = require("../controllers/tags");
const {getPopularTags}=require("../controllers/posts");

//GET /tags/get-all-tags
router.get("/get-all-tags",getAllTags);
//GET /tags/get-popular-tags
router.get('/get-popular-tags',getPopularTags);

module.exports=router;